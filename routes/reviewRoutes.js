import express from "express"
import reviewController from "../controllers/reviewController.js"
import authMiddleware from "../utilities/authMiddleware.js"

const router = new express.Router()

/* *****************************
Add Review
***************************** */

router.post(
"/add",
authMiddleware.checkLogin,
reviewController.addReview
)

/* *****************************
Delete Review
***************************** */

router.get(
"/delete/:id",
authMiddleware.checkAdmin,
reviewController.deleteReview
)

export default router