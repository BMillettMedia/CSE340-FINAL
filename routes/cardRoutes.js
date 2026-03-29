import express from "express"
import cardController from "../controllers/cardController.js"
import authMiddleware from "../utilities/authMiddleware.js"

const router = new express.Router()

/* *****************************
Public Card Routes
***************************** */

router.get("/", cardController.buildCardList)

router.get("/:id", cardController.buildCardDetail)


/* *****************************
Admin Inventory Routes
***************************** */

router.get(
  "/manage",
  authMiddleware.checkAdmin,
  cardController.buildManageInventory
)

router.get(
  "/add",
  authMiddleware.checkAdmin,
  cardController.buildAddCard
)

router.post(
  "/add",
  authMiddleware.checkAdmin,
  cardController.addCard
)

router.get(
  "/edit/:id",
  authMiddleware.checkAdmin,
  cardController.buildEditCard
)

router.post(
  "/edit",
  authMiddleware.checkAdmin,
  cardController.updateCard
)

router.get(
  "/delete/:id",
  authMiddleware.checkAdmin,
  cardController.deleteCard
)

export default router