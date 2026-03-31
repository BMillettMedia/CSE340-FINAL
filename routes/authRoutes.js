import express from "express"
import accountController from "../controllers/accountController.js"

const router = express.Router()

/* Login Page */
router.get("/login", accountController.buildLogin)

/* Register Page */
router.get("/register", accountController.buildRegister)

/* Process Registration */
router.post("/register", accountController.registerAccount)

export default router