import { Router } from "express";
import {
  deleteUser,
  getCurrentUser,
  getUser,
  getUsers,
  updateUser,
  updateCurrentUser,
  deleteCurrentUser,
} from "../controllers/user.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeAdmin from "../middlewares/authAdmin.middleware.js";

const userRouter = Router();

// api/users

// Self: Get current user
userRouter.get("/me", authenticateUser, getCurrentUser);

// Self: Update current user
userRouter.patch("/me", authenticateUser, updateCurrentUser);

// Self: Delete current user
userRouter.delete("/me", authenticateUser, deleteCurrentUser);

// Admin Only: Get list of all users
userRouter.get("/", authenticateUser, authorizeAdmin, getUsers);

// Admin Only: View user details
userRouter.get("/:id", authenticateUser, authorizeAdmin, getUser);

// Admin Only: Update user
userRouter.patch("/:id", authenticateUser, authorizeAdmin, updateUser);

// Admin Only: Delete user
userRouter.delete("/:id", authenticateUser, authorizeAdmin, deleteUser);

// ===================

export default userRouter;
