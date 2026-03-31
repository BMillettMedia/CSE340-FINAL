import utilities from "../utilities/index.js"
import cardModel from "../models/card-model.js"
import reviewModel from "../models/review-model.js"

/* ***************************
Build Card List
*************************** */
async function buildCardList(req, res) {

  try {

    const nav = await utilities.getNav()

    const cards = await cardModel.getAllCards() || []

    res.render("cards/index", {
      title: "Card Inventory",
      nav,
      cards
    })

  } catch (error) {

    console.error("buildCardList error:", error)

    const nav = await utilities.getNav()

    res.status(500).render("layout/main", {
      title: "Error",
      nav,
      content: "<h2>Unable to load card inventory.</h2>"
    })

  }

}


/* ***************************
Build Card Detail Page
*************************** */
async function buildCardDetail(req, res) {

  try {

    const nav = await utilities.getNav()

    const card_id = req.params.card_id

    const card = await cardModel.getCardById(card_id)

    if (!card) {
      return res.status(404).render("layout/main", {
        title: "Card Not Found",
        nav,
        content: "<h2>Card not found.</h2>"
      })
    }

    const reviews = await reviewModel.getReviewsByCardId(card_id) || []

    const average = await reviewModel.getAverageRating(card_id) || { avg: 0 }

    res.render("cards/detail", {
      title: card.name,   // FIXED (was card.card_name)
      nav,
      card,
      reviews,
      average,
      account: req.session?.user || null
    })

  } catch (error) {

    console.error("buildCardDetail error:", error)

    const nav = await utilities.getNav()

    res.status(500).render("layout/main", {
      title: "Error",
      nav,
      content: "<h2>Unable to load card details.</h2>"
    })

  }

}


/* ***************************
Search Cards
*************************** */
async function searchCards(req, res) {

  try {

    const nav = await utilities.getNav()

    const searchTerm = req.query.q || ""

    const cards = await cardModel.searchCards(searchTerm) || []

    res.render("cards/index", {
      title: "Search Results",
      nav,
      cards
    })

  } catch (error) {

    console.error("searchCards error:", error)

    const nav = await utilities.getNav()

    res.status(500).render("layout/main", {
      title: "Search Error",
      nav,
      content: "<h2>Unable to search cards.</h2>"
    })

  }

}


/* ***************************
Filter Cards by Rarity
*************************** */
async function filterByRarity(req, res) {

  try {

    const nav = await utilities.getNav()

    const rarity = req.params.rarity

    const cards = await cardModel.getCardsByRarity(rarity) || []

    res.render("cards/index", {
      title: `${rarity} Cards`,
      nav,
      cards
    })

  } catch (error) {

    console.error("filterByRarity error:", error)

    const nav = await utilities.getNav()

    res.status(500).render("layout/main", {
      title: "Filter Error",
      nav,
      content: "<h2>Unable to filter cards.</h2>"
    })

  }

}

export default {
  buildCardList,
  buildCardDetail,
  searchCards,
  filterByRarity
}