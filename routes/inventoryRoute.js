import express from "express"
import inventoryController from "../controllers/inventoryController.js"

const router = new express.Router()

router.get("/", inventoryController.buildInventory)

export default router