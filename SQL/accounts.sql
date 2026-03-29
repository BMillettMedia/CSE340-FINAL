CREATE TABLE accounts (

account_id SERIAL PRIMARY KEY,

account_email VARCHAR(255) UNIQUE NOT NULL,

account_password VARCHAR(255) NOT NULL,

account_type VARCHAR(20) DEFAULT 'Client'

);