import utilities from "../utilities/index.js"

async function buildDashboard(req, res) {

  const nav = await utilities.getNav()

  const account = req.session.account

  res.render("dashboard/index", {
    title: "Dashboard",
    nav,
    account
  })

}

export default {
  buildDashboard
}