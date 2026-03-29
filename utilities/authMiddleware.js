function checkLogin(req, res, next) {

  if (!req.session.account) {
    return res.redirect("/auth/login")
  }

  next()

}

function checkAdmin(req, res, next) {

  if (!req.session.account) {
    return res.redirect("/auth/login")
  }

  if (req.session.account.account_type !== "Admin") {
    return res.redirect("/dashboard")
  }

  next()

}

export default {
  checkLogin,
  checkAdmin
}