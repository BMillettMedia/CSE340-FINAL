# CSE340-FINAL

# Yu-Gi-Oh Card Marketplace – Final Project

## Project Overview

This project is a **full-stack web application** built using **Node.js, Express, PostgreSQL, and EJS**.
It simulates an online marketplace for trading cards, allowing administrators to manage inventory and users to view card information stored in a relational database.

The application demonstrates core web development concepts including:

* MVC architecture
* PostgreSQL database integration
* CRUD operations
* Authentication and authorization
* Dynamic content rendering

This project was developed as part of a **software/web development course final project**.

---

# Technologies Used

## Backend

* Node.js
* Express.js
* PostgreSQL
* pg (Node PostgreSQL client)
* express-session
* bcrypt

## Frontend

* EJS templating engine
* HTML5
* CSS3

## Development Tools

* pgAdmin 4
* Nodemon
* Git
* GitHub

---

# Features

## Inventory System

Administrators can manage card inventory stored in the database.

Supported operations:

* View all cards
* Add new cards
* Edit existing cards
* Delete cards
* Assign cards to sets

## Card Sets

Card sets organize cards into collections.

Admins can:

* Add new card sets
* Assign cards to sets
* Display cards by set relationship

## Authentication

User authentication is implemented with:

* Secure password hashing (bcrypt)
* Session-based login system
* Role-based permissions

Roles include:

* Admin
* Employee
* User

## Database Relationships

The database uses relational design with foreign keys.

Tables include:

* `users`
* `roles`
* `cards`
* `card_sets`
* `orders`
* `reviews`

Example relationships:

```
users.role_id → roles.id
cards.set_id → card_sets.id
orders.user_id → users.id
reviews.card_id → cards.id
reviews.user_id → users.id
```

---

# Project Structure

```
project-root
│
├── controllers
│   └── inventoryController.js
│
├── models
│   └── inventory-model.js
│
├── routes
│   ├── inventoryRoute.js
│   └── adminInventoryRoute.js
│
├── views
│   ├── inventory
│   │   ├── cards.ejs
│   │   ├── admin.ejs
│   │   ├── add-card.ejs
│   │   ├── edit-card.ejs
│   │   └── delete-card.ejs
│
├── public
│   ├── css
│   └── images
│
├── database
│   └── connection.js
│
├── server.js
├── package.json
└── README.md
```

---

# Installation

## 1 Clone the Repository

```
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

## 2 Install Dependencies

```
npm install
```

## 3 Configure Environment Variables

Create a `.env` file in the project root:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
SESSION_SECRET=your_secret_key
```

---

# Running the Application

Start the development server:

```
npm run dev
```

Or:

```
node server.js
```

Then open your browser and navigate to:

```
http://localhost:3000
```

---

# Example Mock Data

The project includes example cards such as:

* Blue-Eyes White Dragon
* Dark Magician
* Red-Eyes Black Dragon
* Summoned Skull
* Exodia the Forbidden One

These entries are stored in the PostgreSQL database and displayed dynamically in the inventory.

---

# Learning Objectives

This project demonstrates:

* Database-driven web development
* Secure authentication practices
* CRUD application design
* Relational database modeling
* MVC application architecture

---

# Future Improvements

Potential enhancements include:

* Search and filtering for cards
* Image uploads for card artwork
* Shopping cart functionality
* Order processing system
* User reviews and ratings UI
* Responsive UI improvements

---

# Author

Bryan Millett

BS Software Development – Brigham Young University
BS Graphic Information Technology – Arizona State University

Freelance multimedia designer and developer specializing in web development, media production, and UI/UX design.

---

# License

This project was created for educational purposes.
