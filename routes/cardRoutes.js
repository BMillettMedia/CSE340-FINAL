import express from "express";
import inventoryController from "../controllers/inventoryController.js"
import cardRoutes from "./routes/cardRoutes.js"

app.use("/cards", cardRoutes)

router.get("/", inventoryController.showCards)

router.get("/:id", inventoryController.showCardDetails)

const router = express.Router();

const cards = [
  {
    id: 1,
    name: "Blue-Eyes White Dragon",
    price: 25,
    image: "/images/blue-eyes.jpg"
  },
  {
    id: 2,
    name: "Dark Magician",
    price: 20,
    image: "/images/dark-magician.jpg"
  }
];

router.get("/", (req, res) => {

  let cardHTML = `<h1>Card List</h1><div class="card-grid">`;

  cards.forEach(card => {
    cardHTML += `
      <div class="card">
        <img src="${card.image}" width="150">
        <h3>${card.name}</h3>
        <p>$${card.price}</p>
      </div>
    `;
  });

  cardHTML += "</div>";

  res.render("layout/main", {
    title: "Cards",
    content: cardHTML
  });

});

export default router;
