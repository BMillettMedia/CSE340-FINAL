import express from "express"
import inventoryController from "../controllers/inventoryController.js"

const router = new express.Router()

router.get("/", inventoryController.buildAdminInventory)

router.get("/add-card", inventoryController.buildAddCard)

router.post("/add-card", inventoryController.addCard)

export default router