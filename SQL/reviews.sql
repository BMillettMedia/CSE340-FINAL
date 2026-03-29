CREATE TABLE reviews (

review_id SERIAL PRIMARY KEY,

review_text TEXT NOT NULL,

review_rating INTEGER NOT NULL,

review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

account_id INTEGER REFERENCES accounts(account_id),

card_id INTEGER REFERENCES cards(id)

);