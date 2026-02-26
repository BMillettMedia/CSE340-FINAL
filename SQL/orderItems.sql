CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  card_id INT REFERENCES cards(id),
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL
);