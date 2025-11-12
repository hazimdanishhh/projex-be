// core/controllers/task.controller.js
import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

// =============================
// CREATE NEW TASK (OWN PROJECT ONLY)
// [POST] /api/tasks
// =============================
export const createTask = async (req, res, next) => {
  try {
    const {
      projectId,
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo,
    } = req.body;

    if (!projectId || !title) {
      return res.status(400).json({
        success: false,
        message: "Project ID and title are required",
      });
    }

    // Ensure project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // Ensure only project owner or admin can add tasks
    if (project.createdBy !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const newTask = await Task.create({
      projectId,
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo: assignedTo || null,
    });

    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    next(error);
  }
};

// =============================
// GET ALL TASKS (ONLY TASKS FROM USER'S PROJECTS)
// [GET] /api/tasks
// =============================
export const getTasks = async (req, res, next) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.findAll({
        include: { model: Project, as: "project" },
      });
    } else {
      tasks = await Task.findAll({
        include: {
          model: Project,
          as: "project",
          where: { createdBy: req.user.id },
        },
      });
    }

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// =============================
// GET SINGLE TASK (ONLY IF BELONGS TO USER'S PROJECT)
// [GET] /api/tasks/:id
// =============================
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: { model: Project, as: "project" },
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Ensure only project owner or admin can view
    if (task.project.createdBy !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// =============================
// UPDATE TASK (ONLY IF BELONGS TO USER'S PROJECT)
// [PATCH] /api/tasks/:id
// =============================
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: { model: Project, as: "project" },
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Ensure only project owner or admin can edit
    if (task.project.createdBy !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { title, description, priority, status, dueDate, assignedTo } =
      req.body;

    await task.update({
      title: title ?? task.title,
      description: description ?? task.description,
      priority: priority ?? task.priority,
      status: status ?? task.status,
      dueDate: dueDate ?? task.dueDate,
      assignedTo: assignedTo ?? task.assignedTo,
    });

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// =============================
// DELETE TASK (ONLY IF BELONGS TO USER'S PROJECT)
// [DELETE] /api/tasks/:id
// =============================
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: { model: Project, as: "project" },
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Ensure only project owner or admin can delete
    if (task.project.createdBy !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await task.destroy();

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
