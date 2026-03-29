import bcrypt from "bcrypt"
import pool from "../database/connection.js"
import utilities from "../utilities/index.js"

/* *****************************
Build Login Page
***************************** */
async function buildLogin(req, res) {

  const nav = await utilities.getNav()

  res.render("account/login", {
    title: "Login",
    nav
  })

}


/* *****************************
Process Login
***************************** */
async function processLogin(req, res) {

  const nav = await utilities.getNav()

  const { account_email, account_password } = req.body

  try {

    const sql = `
      SELECT *
      FROM accounts
      WHERE account_email = $1
    `

    const result = await pool.query(sql, [account_email])

    const account = result.rows[0]

    if (!account) {

      return res.render("account/login", {
        title: "Login",
        nav,
        errors: ["Invalid email or password"]
      })

    }

    const passwordMatch = await bcrypt.compare(
      account_password,
      account.account_password
    )

    if (!passwordMatch) {

      return res.render("account/login", {
        title: "Login",
        nav,
        errors: ["Invalid email or password"]
      })

    }

    req.session.account = {
      account_id: account.account_id,
      account_firstname: account.account_firstname,
      account_type: account.account_type
    }

    res.redirect("/dashboard")

  } catch (error) {

    console.error("Login Error:", error)

    res.render("account/login", {
      title: "Login Error",
      nav,
      errors: ["Something went wrong"]
    })

  }

}


/* *****************************
Logout
***************************** */
function logout(req, res) {

  req.session.destroy(() => {
    res.redirect("/")
  })

}

export default {
  buildLogin,
  processLogin,
  logout
}