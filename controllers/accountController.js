import bcrypt from "bcrypt"
import utilities from "../utilities/index.js"
import accountModel from "../models/account-model.js"

/* ***************************
Build Login View
*************************** */
async function buildLogin(req, res) {

  const nav = await utilities.getNav()

  res.render("account/login", {
    title: "Login",
    nav
  })
}

/* ***************************
Build Register View
*************************** */
async function buildRegister(req, res) {

  const nav = await utilities.getNav()

  res.render("account/register", {
    title: "Register",
    nav
  })
}

/* ***************************
Process Registration
*************************** */
async function registerAccount(req, res) {

  const nav = await utilities.getNav()

  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password
  } = req.body

  try {

    const hashedPassword = await bcrypt.hash(account_password, 10)

    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword
    )

    if (regResult) {

      req.flash("notice", "Account created successfully. Please log in.")

      return res.redirect("/account/login")

    } else {

      return res.render("account/register", {
        title: "Registration Failed",
        nav
      })

    }

  } catch (error) {

    console.error("Registration error:", error)

    res.render("account/register", {
      title: "Registration Error",
      nav
    })

  }

}

export default {
  buildLogin,
  buildRegister,
  registerAccount
}