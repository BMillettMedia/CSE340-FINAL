import bcrypt from "bcrypt"
import utilities from "../utilities/index.js"
import accountModel from "../models/account-model.js"

/* *****************************
Build Login View
***************************** */
async function buildLogin(req, res) {

  const nav = await utilities.getNav()

  res.render("account/login", {
    title: "Login",
    nav
  })
}


/* *****************************
Build Register View
***************************** */
async function buildRegister(req, res) {

  const nav = await utilities.getNav()

  res.render("account/register", {
    title: "Register",
    nav
  })
}


/* *****************************
Process Registration
***************************** */
async function registerAccount(req, res) {

  const nav = await utilities.getNav()

  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password
  } = req.body

  try {

    // Hash password
    const hashedPassword = await bcrypt.hash(account_password, 10)

    // Save account
    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword
    )

    if (regResult) {

      // Optional flash message (only works if middleware exists)
      if (req.flash) {
        req.flash("notice", "Account created. Please login.")
      }

      return res.redirect("/account/login")

    }

    // Registration failed
    res.render("account/register", {
      title: "Registration Failed",
      nav,
      errors: ["Registration failed. Please try again."],
      account_firstname,
      account_lastname,
      account_email
    })

  } catch (error) {

    console.error("Registration Error:", error)

    res.render("account/register", {
      title: "Registration Error",
      nav,
      errors: ["Something went wrong. Please try again."],
      account_firstname,
      account_lastname,
      account_email
    })

  }

}

export default {
  buildLogin,
  buildRegister,
  registerAccount
}