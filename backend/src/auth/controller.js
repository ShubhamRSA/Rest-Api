import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../../db.js";
import {
  getUserByUsernameQuery,
  createUserQuery,
  checkUsernameQuery,
  checkEmailQuery,
} from "./queries.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

/**
 * Register a new user
 */
export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Username, email, password, and confirm password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Check if username already exists
    const usernameExists = await pool.query(checkUsernameQuery, [username]);
    if (usernameExists.rows.length > 0) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    // Check if email already exists
    const emailExists = await pool.query(checkEmailQuery, [email]);
    if (emailExists.rows.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const userUid = uuidv4();

    // Create user
    const result = await pool.query(createUserQuery, [
      userUid,
      username,
      email,
      hashedPassword,
    ]);

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.user_uid, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY },
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.user_uid,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

/**
 * Login user
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // Find user by username
    const result = await pool.query(getUserByUsernameQuery, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    // Verify password
    const isPasswordValid = await bcryptjs.compare(
      password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.user_uid, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.user_uid,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

/**
 * Get current user (protected route)
 */
export const getCurrentUser = async (req, res) => {
  try {
    // User ID is set by auth middleware
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Fetch user from database
    const result = await pool.query(
      "SELECT user_uid, username, email, created_at FROM users WHERE user_uid = $1",
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({
      message: "Failed to get user",
      error: error.message,
    });
  }
};
