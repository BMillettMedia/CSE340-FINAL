import express from "express"
import cardController from "../controllers/cardController.js"

const router = new express.Router()

/* ***************************
Card Inventory
*************************** */
router.get("/", cardController.buildCardList)

/* ***************************
Card Detail
*************************** */
router.get("/:card_id", cardController.buildCardDetail)

/* ***************************
Search Cards
*************************** */
router.get("/search/results", cardController.searchCards)

/* ***************************
Filter by Rarity
*************************** */
router.get("/rarity/:rarity", cardController.filterByRarity)

export default router