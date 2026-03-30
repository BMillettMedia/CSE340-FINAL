async function getNav() {

  return `
  <nav>

    <a href="/">Home</a>
    <a href="/cards">Cards</a>
    <a href="/dashboard">Dashboard</a>
    <a href="/account/login">Login</a>
    <a href="/account/register">Register</a>

  </nav>
  `
}

export default {
  getNav
}