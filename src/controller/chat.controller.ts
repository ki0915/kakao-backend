import express from "express";
import { Op } from "sequelize";
import Chat from "../model/chat.model";
import Message from "../model/message.model";
import User from "../model/user.model";

type NewChatType = {
  userId: number;
  friendId: number;
};

type ChatUserType = {
  userId: string;
};


const router = express.Router();

router.get("/", async (req, res) => {
  const {userId} = req.query as ChatUserType;

  if(!userId) {
    return res.status(400).json();
  }

  const chats = await Chat.findAll({
    where: {
      [Op.or]: [
        {
        userId,
      },
      {
        friendId: userId,
      },
    ],
    },

    include: [
      {
        model: User,
        required: true,
      },
      {
        model: Message,
        order: [["createAt", "desc"]],
        required: false,
        limit: 1,
      },
    ],
  });

  const chatList = chats.map(async(chat) => {
    const friend = chat.getDataValue("friend") as User;
    const message = chat.getDataValue("message") as Message[];
    const unreadMesage = await Message.count({
      where: {
        chatId: chat.id,
        senderId: {
          [Op.not]: userId,
        },
        isRead: false,
      },
    });

    return {
      id: chat.id,
      name: friend.name,
      message: message.length > 0 ? message: "",
      date: message.length > 0 ? message[0].createdAt : null,
      count: unreadMesage > 0 ? unreadMesage : null
    };
  });

  const chatRooms = await Promise.all(chatList);
  return res.status(200).json(chatRooms);
}) 

router.post("/", async (req, res) => {
  const { userId, friendId } = req.body as NewChatType;
  if (!userId || !friendId) {
    return res.status(400).json();
  }

  const existChat = await Chat.findOne({
    where: {
      userId,
      friendId,
    },
  });

  if (existChat) {
    return res.status(201).json({
      chatId: existChat.id,
    });
  }

  const chat = await Chat.create({
    userId,
    friendId,
  });

  return res.status(201).json({
    chatId: chat.id,
  });
});

router.get("/:chatId/messages", async(req, res) => {
    const { chatId } = req.params;
    const { userId } = req.query as ChatUserType;

    if(!chatId || !userId) 
    {
      return res.status(400).json();
    }

    const messages = await Message.findAll({
        where: {
            chatId,
        }
    });

    const messageList = messages.map((message) => {
        return {
          id: message.id,
          time: message.createdAt,
          message: message.message,
          isMe: BigInt(userId) == message.senderId,
        };
    });

    return res.status(200).json(messageList);
})
