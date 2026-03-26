import express from "express"
import inventoryController from "../controllers/inventoryController.js"

const router = new express.Router()

router.get("/", inventoryController.buildAdminInventory)

router.get("/add-card", inventoryController.buildAddCard)

router.post("/add-card", inventoryController.addCard)

router.get("/edit/:id", inventoryController.buildEditCard)

router.post("/edit/:id", inventoryController.updateCard)

router.get("/delete/:id", inventoryController.buildDeleteCard)

router.post("/delete/:id", inventoryController.deleteCard)

//routes for sets
router.get("/add-set", inventoryController.buildAddSet)

router.post("/add-set", inventoryController.addSet)

export default router