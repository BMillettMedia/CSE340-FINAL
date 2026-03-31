import pool from "../database/connection.js"

/* ***************************
Get All Cards
*************************** */
async function getAllCards() {
  try {

    const sql = `
      SELECT *
      FROM cards
      ORDER BY name
    `

    const result = await pool.query(sql)

    return result.rows

  } catch (error) {

    console.error("getAllCards error:", error)

    return []

  }
}

/* ***************************
Get Card By ID
*************************** */
async function getCardById(id) {

  try {

    const sql = `
      SELECT *
      FROM cards
      WHERE id = $1
    `

    const result = await pool.query(sql, [id])

    return result.rows[0]

  } catch (error) {

    console.error("getCardById error:", error)

    return null

  }

}

/* ***************************
Insert Card
*************************** */
async function insertCard(
  name,
  description,
  price,
  stock,
  set_id,
  image_path,
  rarity
) {

  try {

    const sql = `
      INSERT INTO cards
      (
        name,
        description,
        price,
        stock,
        set_id,
        image_path,
        rarity
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `

    const result = await pool.query(sql, [
      name,
      description,
      price,
      stock,
      set_id,
      image_path,
      rarity
    ])

    return result.rows[0]

  } catch (error) {

    console.error("insertCard error:", error)

  }

}

/* ***************************
Update Card
*************************** */
async function updateCard(
  id,
  name,
  description,
  price,
  stock,
  set_id,
  image_path,
  rarity
) {

  try {

    const sql = `
      UPDATE cards
      SET
        name=$1,
        description=$2,
        price=$3,
        stock=$4,
        set_id=$5,
        image_path=$6,
        rarity=$7
      WHERE id=$8
      RETURNING *
    `

    const result = await pool.query(sql, [
      name,
      description,
      price,
      stock,
      set_id,
      image_path,
      rarity,
      id
    ])

    return result.rows[0]

  } catch (error) {

    console.error("updateCard error:", error)

  }

}

/* ***************************
Delete Card
*************************** */
async function deleteCard(id) {

  try {

    const sql = `
      DELETE FROM cards
      WHERE id=$1
      RETURNING *
    `

    const result = await pool.query(sql, [id])

    return result.rows[0]

  } catch (error) {

    console.error("deleteCard error:", error)

  }

}

/* ***************************
Search Cards
*************************** */
async function searchCards(searchTerm) {

  try {

    const sql = `
      SELECT *
      FROM cards
      WHERE LOWER(name) LIKE LOWER($1)
      ORDER BY name
    `

    const result = await pool.query(sql, [`%${searchTerm}%`])

    return result.rows

  } catch (error) {

    console.error("searchCards error:", error)

    return []

  }

}

/* ***************************
Filter Cards By Rarity
*************************** */
async function getCardsByRarity(rarity) {

  try {

    const sql = `
      SELECT *
      FROM cards
      WHERE rarity = $1
      ORDER BY name
    `

    const result = await pool.query(sql, [rarity])

    return result.rows

  } catch (error) {

    console.error("getCardsByRarity error:", error)

    return []

  }

}

export default {
  getAllCards,
  getCardById,
  insertCard,
  updateCard,
  deleteCard,
  searchCards,
  getCardsByRarity
}