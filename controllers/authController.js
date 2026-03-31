import bcrypt from "bcrypt"
import pool from "../database/connection.js"
import utilities from "../utilities/index.js"

/* ***************************
 * Build Login View
 *************************** */
async function buildLogin(req, res) {

  const nav = await utilities.getNav()

  res.render("account/login", {
    title: "Login",
    nav
  })

}

/* ***************************
 * Process Login
 *************************** */
async function processLogin(req, res) {

  const nav = await utilities.getNav()

  try {

    res.render("account/login", {
      title: "Login",
      nav,
      message: "Login functionality not implemented yet."
    })

  } catch (error) {

    console.error("processLogin error:", error)

    res.status(500).render("account/login", {
      title: "Login",
      nav,
      message: "Login failed."
    })

  }

}

/* ***************************
 * Build Register View
 *************************** */
async function buildRegister(req, res) {

  const nav = await utilities.getNav()

  res.render("account/register", {
    title: "Register",
    nav
  })

}

/* ***************************
 * Process Registration
 *************************** */
async function processRegister(req, res) {

  const nav = await utilities.getNav()

  try {

    res.render("account/login", {
      title: "Login",
      nav,
      message: "Account created successfully. Please login."
    })

  } catch (error) {

    console.error("processRegister error:", error)

    res.status(500).render("account/register", {
      title: "Register",
      nav,
      message: "Registration failed."
    })

  }

}

/* ***************************
 * Logout
 *************************** */
function logout(req, res) {

  req.session.destroy()

  res.redirect("/")

}

export default {
  buildLogin,
  processLogin,
  buildRegister,
  processRegister,
  logout
}