// core/controllers/project.controller.js
import Project from "../models/project.model.js";
import { Op } from "sequelize";

// =============================
// CREATE NEW PROJECT
// [POST] /api/projects
// =============================
export const createProject = async (req, res, next) => {
  try {
    const { name, description, status, dueDate } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Project name is required" });
    }

    const newProject = await Project.create({
      name,
      description,
      status,
      dueDate,
      createdBy: req.user.id, // Assign to logged-in user
    });

    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    next(error);
  }
};

// =============================
// GET ALL PROJECTS (OWN PROJECTS ONLY)
// [GET] /api/projects
// =============================
export const getProjects = async (req, res, next) => {
  try {
    // If admin, return all projects
    if (req.user.role === "admin") {
      const projects = await Project.findAll();
      return res.status(200).json({ success: true, data: projects });
    }

    // Otherwise, return only user's own projects
    const projects = await Project.findAll({
      where: { createdBy: req.user.id },
    });

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

// =============================
// GET A SINGLE PROJECT (OWN ONLY)
// [GET] /api/projects/:id
// =============================
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // Allow only owner or admin
    if (project.createdBy !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// =============================
// UPDATE A PROJECT (OWN ONLY)
// [PATCH] /api/projects/:id
// =============================
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // Allow only owner or admin
    if (project.createdBy !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { name, description, status, dueDate } = req.body;

    await project.update({
      name: name ?? project.name,
      description: description ?? project.description,
      status: status ?? project.status,
      dueDate: dueDate ?? project.dueDate,
    });

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// =============================
// DELETE A PROJECT (OWN ONLY)
// [DELETE] /api/projects/:id
// =============================
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // Allow only owner or admin
    if (project.createdBy !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await project.destroy();

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};
