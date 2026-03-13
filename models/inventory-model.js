import pool from "../database/";

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


//export default { getAllCards }
export default {
  getAllCards,
  insertCard
}