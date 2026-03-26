import inventoryModel from "../models/inventory-model.js"

async function buildInventory(req, res) {
  const data = await inventoryModel.getAllCards()

  res.render("inventory/cards", {
    title: "Card Inventory",
    cards: data
  })
}

async function buildAdminInventory(req, res) {
  const data = await inventoryModel.getAllCards()

  res.render("inventory/admin", {
    title: "Inventory Management",
    cards: data
  })
}


//add cards
async function buildAddCard(req, res) {

  const sets = await inventoryModel.getAllSets()

  res.render("inventory/add-card", {
    title: "Add Card",
    sets
  })
}


async function addCard(req, res) {
  const { name, description, price, rarity, set_id } = req.body

  await inventoryModel.insertCard(
    name,
    description,
    price,
    rarity,
    set_id
  )

  res.redirect("/admin-inventory")
}

async function buildEditCard(req, res) {

  const cardId = req.params.id
  const card = await inventoryModel.getCardById(cardId)

  res.render("inventory/edit-card", {
    title: "Edit Card",
    card
  })
}

async function updateCard(req, res) {

  const cardId = req.params.id

  const { name, description, price, rarity, set_id } = req.body

  await inventoryModel.updateCard(
    cardId,
    name,
    description,
    price,
    rarity,
    set_id
  )

  res.redirect("/admin-inventory")
}

async function buildDeleteCard(req, res) {

  const cardId = req.params.id
  const card = await inventoryModel.getCardById(cardId)

  res.render("inventory/delete-card", {
    title: "Delete Card",
    card
  })
}

async function deleteCard(req, res) {

  const cardId = req.params.id

  await inventoryModel.deleteCard(cardId)

  res.redirect("/admin-inventory")
}

//sets of cards
async function buildAddSet(req, res) {

  res.render("inventory/add-set", {
    title: "Add Card Set"
  })
}
async function addSet(req, res) {

  const { name, release_year } = req.body

  await inventoryModel.insertCardSet(name, release_year)

  res.redirect("/admin-inventory")
}

//show cards
async function showCards(req, res) {

  const cards = await inventoryModel.getAllCards()

  res.render("cards/cards", {
    title: "Card Inventory",
    cards
  })

}

async function showCardDetails(req, res) {

  const cardId = req.params.id

  const card = await inventoryModel.getCardDetails(cardId)

  res.render("cards/card-details", {
    title: card.name,
    card
  })

}


//export default { buildInventory }
export default {
  buildInventory,
  buildAdminInventory,
  buildAddCard,
  addCard,
  buildEditCard,
  updateCard,
  buildDeleteCard,
  deleteCard,
  buildAddSet,
  addSet,
  showCards,
  showCardDetails
}

