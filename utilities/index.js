async function getNav(){

return `

<nav>

<a href="/">Home</a>
<a href="/cards">Cards</a>
<a href="/cards/manage">Inventory</a>
<a href="/dashboard">Dashboard</a>
<a href="/account/login">Login</a>
<a href="/account/register">Register</a>

<form action="/cards/search" method="GET" style="margin-left:auto;">

<input type="text" name="q" placeholder="Search cards">

<button type="submit">Search</button>

</form>

</nav>

`

}