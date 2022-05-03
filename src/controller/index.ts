import express from "express";
import schoolController from "./school.controller";
import TodoController from "./Todo.controller";
import userController from "./user.controller";
import friendController from "./friend.controller";

const router = express.Router();

router.use("/schools", schoolController);
router.use("/todos", TodoController);
router.use("/users", userController);
router.use("/friends", friendController);

export default router;
