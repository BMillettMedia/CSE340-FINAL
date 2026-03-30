import pool from "../database/index.js"

/* *****************************
Register new account
***************************** */
async function registerAccount(
  account_firstname,
  account_lastname,
  account_email,
  account_password
) {
  try {

    const sql = `
      INSERT INTO accounts
      (account_firstname, account_lastname, account_email, account_password)
      VALUES ($1,$2,$3,$4)
      RETURNING *
    `

    const result = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_password
    ])

    return result.rows[0]

  } catch (error) {

    console.error("registerAccount error:", error)

    return null

  }
}

/* *****************************
Get account by email
***************************** */
async function getAccountByEmail(account_email) {

  try {

    const sql = `
      SELECT * FROM accounts
      WHERE account_email = $1
    `

    const result = await pool.query(sql, [account_email])

    return result.rows[0]

  } catch (error) {

    console.error("getAccountByEmail error:", error)

    return null

  }
}

export default {
  registerAccount,
  getAccountByEmail
}