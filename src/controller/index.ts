import express from "express";
import schoolController from "./school.controller";
import TodoController from "./Todo.controller";
const router = express.Router();

// 이 스쿨 이라는 거에 포함된 내용을 저 스쿨 컨트롤러로 처리해라 라는 뜻.
router.use("/schools", schoolController);
router.use("/todos", TodoController);

export default router;
