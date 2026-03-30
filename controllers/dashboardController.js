import utilities from "../utilities/index.js"

async function buildDashboard(req, res) {

  const nav = await utilities.getNav()

  res.render("dashboard/index", {
    title: "Dashboard",
    nav,
    user: req.session.user
  })
}

export default {
  buildDashboard
}