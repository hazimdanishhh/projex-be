// core/routes/task.routes.js

import { Router } from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const taskRouter = Router();

// api/tasks

// Create new task (under user's own project)
taskRouter.post("/", authenticateUser, createTask);

// Get all tasks (only from user's projects, unless admin)
taskRouter.get("/", authenticateUser, getTasks);

// Get single task (only if belongs to user's project)
taskRouter.get("/:id", authenticateUser, getTask);

// Update task (only if belongs to user's project)
taskRouter.patch("/:id", authenticateUser, updateTask);

// Delete task (only if belongs to user's project)
taskRouter.delete("/:id", authenticateUser, deleteTask);

export default taskRouter;
