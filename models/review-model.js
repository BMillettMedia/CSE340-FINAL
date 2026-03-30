import pool from "../database/connection.js"

/* *****************************
Get Reviews By Card
***************************** */
async function getReviewsByCard(cardId){

const sql = `
SELECT r.*, a.account_firstname
FROM reviews r
JOIN accounts a
ON r.account_id = a.account_id
WHERE card_id = $1
ORDER BY review_date DESC
`

const result = await pool.query(sql,[cardId])

return result.rows

}

/* *****************************
Add Review
***************************** */
async function addReview(text,rating,accountId,cardId){

const sql = `
INSERT INTO reviews
(
review_text,
review_rating,
account_id,
card_id
)
VALUES ($1,$2,$3,$4)
`

return pool.query(sql,[text,rating,accountId,cardId])

}

/* *****************************
Delete Review
***************************** */
async function deleteReview(reviewId){

const sql = `
DELETE FROM reviews
WHERE review_id = $1
`

return pool.query(sql,[reviewId])

}

async function getAverageRating(card_id){

  const sql = `
  SELECT ROUND(AVG(review_rating),1) AS average_rating
  FROM reviews
  WHERE card_id = $1
  `

  const result = await pool.query(sql,[card_id])

  return result.rows[0]

}

export default {

getReviewsByCard,
addReview,
deleteReview,
getAverageRating

}