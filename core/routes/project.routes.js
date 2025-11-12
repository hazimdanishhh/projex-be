// core/routes/project.routes.js

import { Router } from "express";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const projectRouter = Router();

// api/projects

// Create new project (self)
projectRouter.post("/", authenticateUser, createProject);

// Get all projects (own only unless admin)
projectRouter.get("/", authenticateUser, getProjects);

// Get single project (own only)
projectRouter.get("/:id", authenticateUser, getProject);

// Update project (own only)
projectRouter.patch("/:id", authenticateUser, updateProject);

// Delete project (own only)
projectRouter.delete("/:id", authenticateUser, deleteProject);

export default projectRouter;
