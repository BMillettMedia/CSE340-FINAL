import pool from "../database/connection.js"

async function getAllCards(){

  const sql = `
  SELECT * FROM cards
  ORDER BY card_name
  `

  const result = await pool.query(sql)
  return result.rows
}

async function getCardById(id){

  const sql = `
  SELECT * FROM cards
  WHERE card_id = $1
  `

  const result = await pool.query(sql,[id])
  return result.rows[0]
}

async function insertCard(
  name,type,attribute,attack,defense,description
){

  const sql = `
  INSERT INTO cards
  (
    card_name,
    card_type,
    card_attribute,
    card_attack,
    card_defense,
    card_description
  )
  VALUES ($1,$2,$3,$4,$5,$6)
  `

  return pool.query(sql,[name,type,attribute,attack,defense,description])
}

async function updateCard(
  id,name,type,attribute,attack,defense,description
){

  const sql = `
  UPDATE cards
  SET
  card_name=$1,
  card_type=$2,
  card_attribute=$3,
  card_attack=$4,
  card_defense=$5,
  card_description=$6
  WHERE card_id=$7
  `

  return pool.query(sql,[name,type,attribute,attack,defense,description,id])
}

async function deleteCard(id){

  const sql = `
  DELETE FROM cards
  WHERE card_id=$1
  `

  return pool.query(sql,[id])
}


async function searchCards(searchTerm){

  try{

    const sql = `
      SELECT * FROM cards
      WHERE LOWER(card_name) LIKE LOWER($1)
    `

    const result = await pool.query(sql,[`%${searchTerm}%`])

    return result.rows

  }catch(error){

    console.error("Search Error:",error)

  }

}

async function getCardsByType(type){

  try{

    const sql = `
      SELECT * FROM cards
      WHERE card_type = $1
    `

    const result = await pool.query(sql,[type])

    return result.rows

  }catch(error){

    console.error(error)

  }

}

export default {
  getAllCards,
  getCardById,
  insertCard,
  updateCard,
  deleteCard,
  searchCards,
  getCardsByType
}