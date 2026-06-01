import express from "express";
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protuct } from "../middleware/auth.js";

const router = express.Router();

const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, //30 Days
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      msg: "Please provide all fields",
    });
  }

  const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (userExists.rows.length > 0) {
    return res.status(400).json({
      msg: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query(
    `INSERT INTO users (username, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, username, email`,
    [username, email, hashedPassword],
  );

  const token = generateToken(newUser.rows[0].id);

  res.cookie("token", token, cookieOption);

  return res.status(201).json({
    user: newUser.rows[0],
  });
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Please provide all fields",
    });
  }

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return res.status(400).send({ msg: "Invalid credientials" });
  }

  const userData = user.rows[0];

  const isPasswordMatch = await bcrypt.compare(password, userData.password);

  if (!isPasswordMatch) {
    return res.status(400).send({ msg: "Invalid credientials" });
  }

  const token = generateToken(userData.id);

  res.cookie("token", token, cookieOption);

  res.json({
    user: {
      id: userData.id,
      username: userData.username,
      email: userData.email
    },
  });
});

//Me
router.get('/me', protuct, async (req, res) => {
  res.json(req.user);
})

//Logout
router.post('/logout', async (req, res) => {
  res.cookie('token', "", {...cookieOption, maxAge: 1},
  res.json({msg: 'User logged out succesfully'})
  )
});

export default router;
