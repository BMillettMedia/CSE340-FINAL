import utilities from "../utilities/index.js"
import cardModel from "../models/card-model.js"
import reviewModel from "../models/review-model.js"


/* *****************************
Build Card List
***************************** */
async function buildCardList(req,res){

  const nav = await utilities.getNav()
  const cards = await cardModel.getAllCards()

  res.render("cards/index",{
    title:"Card Inventory",
    nav,
    cards
  })

}

/* *****************************
Single Card
***************************** */
async function buildCardDetail(req,res){

  const nav = await utilities.getNav()
  const cardId = req.params.id

  const card = await cardModel.getCardById(cardId)
  const reviews = await reviewModel.getReviewsByCard(cardId)

  res.render("cards/detail",{
    title:card.card_name,
    nav,
    card,
    reviews
  })

}

/* *****************************
Admin Inventory Dashboard
***************************** */
async function buildManageInventory(req,res){

  const nav = await utilities.getNav()
  const cards = await cardModel.getAllCards()

  res.render("cards/manage",{
    title:"Manage Cards",
    nav,
    cards
  })

}

/* *****************************
Build Add Card Page
***************************** */
async function buildAddCard(req,res){

  const nav = await utilities.getNav()

  res.render("cards/add",{
    title:"Add New Card",
    nav
  })

}

/* *****************************
Add Card
***************************** */
async function addCard(req,res){

  const nav = await utilities.getNav()

  const {
    card_name,
    card_type,
    card_attribute,
    card_attack,
    card_defense,
    card_description
  } = req.body

  await cardModel.insertCard(
    card_name,
    card_type,
    card_attribute,
    card_attack,
    card_defense,
    card_description
  )

  res.redirect("/cards/manage")

}

/* *****************************
Edit Card Page
***************************** */
async function buildEditCard(req,res){

  const nav = await utilities.getNav()
  const cardId = req.params.id

  const card = await cardModel.getCardById(cardId)

  res.render("cards/edit",{
    title:"Edit Card",
    nav,
    card
  })

}

/* *****************************
Update Card
***************************** */
async function updateCard(req,res){

  const {
    card_id,
    card_name,
    card_type,
    card_attribute,
    card_attack,
    card_defense,
    card_description
  } = req.body

  await cardModel.updateCard(
    card_id,
    card_name,
    card_type,
    card_attribute,
    card_attack,
    card_defense,
    card_description
  )

  res.redirect("/cards/manage")

}

/* *****************************
Delete Card
***************************** */
async function deleteCard(req,res){

  const cardId = req.params.id

  await cardModel.deleteCard(cardId)

  res.redirect("/cards/manage")

}

export default {
  buildCardList,
  buildCardDetail,
  buildManageInventory,
  buildAddCard,
  addCard,
  buildEditCard,
  updateCard,
  deleteCard
}