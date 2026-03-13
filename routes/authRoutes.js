import express from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

const router = express.Router();

/* REGISTER PAGE */
router.get("/register", (req, res) => {
  res.render("layout/main", {
    title: "Register",
    content: `
      <h2>Register</h2>
      <form method="POST" action="/register">
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    `
  });
});

/* REGISTER HANDLER */
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  // default role = user (role_id = 3)
  await pool.query(
    "INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3)",
    [email, hashedPassword, 3]
  );

  res.redirect("/login");
});

/* LOGIN PAGE */
router.get("/login", (req, res) => {
  res.render("layout/main", {
    title: "Login",
    content: `
      <h2>Login</h2>
      <form method="POST" action="/login">
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    `
  });
});

/* LOGIN HANDLER */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    return res.send("User not found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.send("Incorrect password");
  }

  req.session.user = {
    id: user.id,
    role_id: user.role_id,
    email: user.email
  };

  res.redirect("/dashboard");
});

/* LOGOUT */
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

export default router;