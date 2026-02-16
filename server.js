import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import cardRoutes from "./routes/cardRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(
  session({
    secret: "yugioh-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/cards",cardRoutes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("layout/main", {
    title: "Yu-Gi-Oh Card Shop",
    content: `
      <h1>Welcome to Yu-Gi-Oh Card Shop</h1>
      <p>Browse cards and build your deck.</p>
      <a href="/cards">View Cards</a>
    `,
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
