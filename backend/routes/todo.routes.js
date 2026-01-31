import express from "express"
import { addTodo, deleteTodo, getAllTodo, updateStatus } from "../controllers/todo.controller.js";
import { middleware } from "../middleware/auth.middleware.js";
const todoRouter = express.Router();

todoRouter.use(middleware);
todoRouter.get("/",getAllTodo)
todoRouter.post("/addTodo",addTodo)
todoRouter.post("/deleteTodo/:todoId",deleteTodo)
todoRouter.patch("/updateTodo/:todoId",updateStatus)

export default todoRouter