import express from "express"
import dashboardController from "../controllers/dashboardController.js"
import authMiddleware from "../utilities/authMiddleware.js"

const router = new express.Router()

/* *****************************
Protected Dashboard Route
***************************** */
router.get(
  "/",
  authMiddleware.checkLogin,
  dashboardController.buildDashboard
)

export default router