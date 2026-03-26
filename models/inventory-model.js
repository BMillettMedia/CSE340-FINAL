import pool from "../database/";


//singles for sale
async function getAllCards() {
  try {
    const data = await pool.query(`
      SELECT cards.id,
             cards.name,
             cards.description,
             cards.price,
             cards.rarity,
             card_sets.name AS set_name
      FROM cards
      JOIN card_sets
      ON cards.set_id = card_sets.id
      ORDER BY cards.name;
    `)
    return data.rows
  } catch (error) {
    console.error("getAllCards error " + error)
  }
}

async function insertCard(name, description, price, rarity, set_id) {
  try {
    const sql = `
      INSERT INTO cards
      (name, description, price, rarity, set_id)
      VALUES ($1,$2,$3,$4,$5)
    `
    return await pool.query(sql, [
      name,
      description,
      price,
      rarity,
      set_id
    ])
  } catch (error) {
    console.error(error)
  }
}

async function getCardById(id) {
  const sql = `
    SELECT *
    FROM cards
    WHERE id = $1
  `
  const data = await pool.query(sql, [id])
  return data.rows[0]
}

async function updateCard(
  id,
  name,
  description,
  price,
  rarity,
  set_id
) {

  const sql = `
  UPDATE cards
  SET name=$1,
      description=$2,
      price=$3,
      rarity=$4,
      set_id=$5
  WHERE id=$6
  `

  return pool.query(sql, [
    name,
    description,
    price,
    rarity,
    set_id,
    id
  ])
}

async function deleteCard(id) {

  const sql = `
  DELETE FROM cards
  WHERE id=$1
  `

  return pool.query(sql, [id])
}

//sets for cards
async function getAllSets() {
  const sql = `
    SELECT id, name
    FROM card_sets
    ORDER BY name
  `
  const data = await pool.query(sql)
  return data.rows
}

async function insertCardSet(name, release_year) {
  const sql = `
    INSERT INTO card_sets (name, release_year)
    VALUES ($1,$2)
  `
  return pool.query(sql, [name, release_year])
}

async function getCardDetails(id) {

  const sql = `
  SELECT cards.*,
         card_sets.name AS set_name
  FROM cards
  JOIN card_sets
  ON cards.set_id = card_sets.id
  WHERE cards.id=$1
  `

  const data = await pool.query(sql, [id])
  return data.rows[0]

}

//export default { getAllCards }
export default {
  getAllCards,
  insertCard,
  getCardById,
  updateCard,
  deleteCard,
  getAllSets,
  insertCardSet,
  getCardDetails
}