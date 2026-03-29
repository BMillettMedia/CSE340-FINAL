import pool from "../database/connection.js"

/* *****************************
Register new account
***************************** */
async function registerAccount(
    account_firstname, 
    account_lastname, 
    account_email, 
    account_password)
    {

  const sql = `
  INSERT INTO accounts
  (account_firstname, account_lastname, account_email, account_password)
  VALUES ($1,$2,$3,$4)
  RETURNING *
  `

  return await pool.query(sql, [
    account_firstname,
    account_lastname,
    account_email,
    account_password
  ])

}

/* *****************************
Get account by email
***************************** */
async function getAccountByEmail(account_email){

  const sql = `
  SELECT * FROM accounts
  WHERE account_email = $1
  `

  const result = await pool.query(sql,[account_email])
  return result.rows[0]

}

export default {
  registerAccount,
  getAccountByEmail
}