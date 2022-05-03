import express from "express";
import Chat from "../model/chat.model";

type NewChatType = {
  userId: number;
  friendId: number;
};

const router = express.Router();

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
