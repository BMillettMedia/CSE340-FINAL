import express from "express"
import authController from "../controllers/authController.js"

const router = new express.Router()

/* ***************************
 * Login Page
 *************************** */
router.get("/login", authController.buildLogin)

/* ***************************
 * Process Login
 *************************** */
router.post("/login", authController.processLogin)

/* ***************************
 * Register Page
 *************************** */
router.get("/register", authController.buildRegister)

/* ***************************
 * Process Registration
 *************************** */
router.post("/register", authController.processRegister)

/* ***************************
 * Logout
 *************************** */
router.get("/logout", authController.logout)

export default router