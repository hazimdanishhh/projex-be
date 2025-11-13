import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../../config/db.js";
import User from "../models/user.model.js";

// =============================
// CREATE USER AS ADMIN
// =============================
// [POST] /api/admin/create-user
export const createUserAsAdmin = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { name, username, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "name, email, password, and role are required",
      });
    }

    const allowedRoles = ["user", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    // Check if email exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = uuidv4();
    const newUser = await User.create(
      {
        id: userId,
        name,
        username: username || null,
        email,
        passwordHash: hashedPassword,
        role,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { transaction }
    );

    await transaction.commit();

    const { passwordHash, ...userWithoutPassword } = newUser.toJSON();

    res.status(201).json({
      success: true,
      message: "User created successfully by admin",
      user: userWithoutPassword,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// =============================
// UPDATE USER AS ADMIN
// =============================
// [PATCH] /api/admin/users/:id
export const updateUserAsAdmin = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { name, username, email, password, role } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) updates.passwordHash = await bcrypt.hash(password, 10);
    if (role) {
      const allowedRoles = ["user", "admin"];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role specified",
        });
      }
      updates.role = role;
    }

    // Find user first
    const user = await User.findByPk(req.params.id, { transaction });
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user
    await user.update(updates, { transaction });

    await transaction.commit();

    const { passwordHash, ...userWithoutPassword } = user.toJSON();

    res.status(200).json({
      success: true,
      message: "User updated successfully by admin",
      user: userWithoutPassword,
    });
  } catch (error) {
    await transaction.rollback();

    // Unique constraint handling
    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0].path;
      return res.status(400).json({
        success: false,
        message: `${field} already in use`,
      });
    }

    next(error);
  }
};
