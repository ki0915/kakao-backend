import express from "express";
import User from "../model/user.model";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, phone, statusMessage } = req.body;
  if (!name || !phone) {
    return res.status(400).json();
  }

  const newUser = await User.create({
    name,
    phone,
    statusMessage,
  });
  return res.status(201).json({
    userId: newUser.id,
  });
});

router.get("/", async (req, res) => {
  const users: User[] = await User.findAll();
  return res.status(200).json(users);
});

export default router;
