import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.render("layout/main", {
    title: "Dashboard",
    content: `
      <h2>Welcome ${req.session.user.email}</h2>
      <p>Your Role ID: ${req.session.user.role_id}</p>
      <a href="/logout">Logout</a>
    `
  });
});

export default router;