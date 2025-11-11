import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// =============================
// SELF
// GET CURRENT AUTHENTICATED USER
// [GET] /api/users/me
// =============================
export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["passwordHash"] },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// =============================
// SELF
// UPDATE CURRENT AUTHENTICATED USER
// [PATCH] /api/users/me
// =============================
export const updateCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { name, username, email, password } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (username !== undefined) updates.username = username;
    if (email !== undefined) updates.email = email;
    if (password !== undefined) {
      updates.passwordHash = await bcrypt.hash(password, 10);
    }

    // Duplicate checks
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({
        where: { username, id: { [Op.ne]: userId } },
      });
      if (usernameExists) {
        return res
          .status(409)
          .json({ success: false, message: "Username already in use" });
      }
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({
        where: { email, id: { [Op.ne]: userId } },
      });
      if (emailExists) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }
    }

    await user.update(updates);

    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["passwordHash"] },
    });

    res.status(200).json({
      success: true,
      message: "Your account has been updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// =============================
// SELF
// DELETE CURRENT AUTHENTICATED USER
// [DELETE] /api/users/me
// =============================
export const deleteCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: "Your account has been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// =============================
// ADMIN ONLY
// GET ALL USERS (Exclude passwordHash)
// [GET] /api/users/
// =============================
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["passwordHash"] },
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// =============================
// ADMIN ONLY
// GET USER BY ID (Exclude passwordHash)
// [GET] /api/users/:id
// =============================
export const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["passwordHash"] },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// =============================
// ADMIN ONLY
// UPDATE USER BY ID (PATCH)
// [PATCH] /api/users/:id
// =============================
export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, username, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (username !== undefined) updates.username = username;
    if (email !== undefined) updates.email = email;
    if (password !== undefined) {
      updates.passwordHash = await bcrypt.hash(password, 10);
    }

    // Duplicate checks
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({
        where: { username, id: { [Op.ne]: id } },
      });
      if (usernameExists) {
        return res
          .status(409)
          .json({ success: false, message: "Username already in use" });
      }
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({
        where: { email, id: { [Op.ne]: id } },
      });
      if (emailExists) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }
    }

    await user.update(updates);

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ["passwordHash"] },
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// =============================
// ADMIN ONLY
// DELETE USER BY ID
// [DELETE] /api/users/:id
// =============================
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
