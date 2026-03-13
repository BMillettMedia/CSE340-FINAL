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
  res.render("inventory/add-card", {
    title: "Add Card"
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

//export default { buildInventory }
export default {
  buildInventory,
  buildAdminInventory,
  buildAddCard,
  addCard
}

