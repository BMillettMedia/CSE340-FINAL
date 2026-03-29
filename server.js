import express from "express"
import session from "express-session"
import path from "path"
import { fileURLToPath } from "url"
import methodOverride from "method-override"
import dotenv from "dotenv"

import cardRoutes from "./routes/cardRoutes.js"
import accountRoute from "./routes/accountRoute.js"
import authRoutes from "./routes/authRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"


app.use("/reviews",reviewRoutes)
// Load environment variables
dotenv.config()

// Create Express app
const app = express()

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride("_method"))

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yugioh-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
)

// Static Files
app.use(express.static(path.join(__dirname, "public")))

// View Engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Routes
app.use("/cards", cardRoutes)
app.use("/account", accountRoute)
app.use("/auth", authRoutes)
app.use("/dashboard", dashboardRoutes)

// Home Page
app.get("/", (req, res) => {
  res.render("layout/main", {
    title: "Yu-Gi-Oh Card Shop",
    content: `
      <h1>Welcome to Yu-Gi-Oh Card Shop</h1>
      <p>Browse cards and build your deck.</p>
      <a href="/cards">View Cards</a>
    `,
  })
})

// Start Server
const PORT = process.env.PORT || 5500

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})