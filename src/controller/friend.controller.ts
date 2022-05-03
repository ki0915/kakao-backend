import express from "express";
import Friend from "../model/friend.model";
import User from "../model/user.model";

const router = express.Router();

type FriendSearchType = {
  phone: string;
};

router.post("/", async (req, res) => {
  const { userId, phone } = req.body;

  if (!userId || !phone) {
    return res.status(400).json({
      message: "올바른 요청이 아닙니다.",
    });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({
      message: "잘못된 사용자의 요청입니다.",
    });
  }
  const friendUser = await User.findOne({
    where: {
      phone,
    },
  });

  if (!friendUser) {
    return res.status(404).json({
      message: "존재하지 않는 사용자입니다.",
    });
  }

  const existFriend = await Friend.findOne({
    where: {
      userId: user.id,
      friendId: friendUser.id,
    },
  });

  if (existFriend) {
    return res.status(400).json({
      message: "이미 친구입니다.",
    });
  }
  await Friend.create({
    userId: user.id,
    friendId: friendUser.id,
  });
  return res.status(201).json();
});

router.get("/search", async (req, res) => {
  const { phone } = req.query as FriendSearchType;

  if (!phone) {
    return res.status(400).json();
  }

  const user = User.findOne({
    where: {
      phone,
    },
  });

  if (!user) {
    return res.status(404).json();
  }
  return res.status(200).json(user);
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json();
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(400).json();
  }

  const friends = await user.$get("myFriends", {
    include: [
      {
        model: User,
      },
    ],
  });

  const friendList = friends.map((frienduser) => {
    return frienduser.getDataValue("friend");
  });

  return res.status(200).json(friendList);
});

router.get("/", async (req, res) => {
  const friends: Friend[] = await Friend.findAll();
  return res.status(200).json(friends);
});

export default router;
