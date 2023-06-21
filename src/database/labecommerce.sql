-- Active: 1687289759464@@127.0.0.1@3306

----------------------- QUERIES TABLE USERS ----------------------

--Query de criação da tabela de users
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

--Query para popular a tabela users
INSERT INTO users (id, name, email, password, created_at)
VALUES
    ("u001", "user001", "user001@gmail.com", "user001", "20/06/2023"),
    ("u002", "user002", "user002@gmail.com", "user002", "20/06/2023"),
    ("u003", "user003", "user003@gmail.com", "user003", "20/06/2023"),
    ("u004", "user004", "user004@gmail.com", "user004", "20/06/2023"),
    ("u005", "user005", "user005@gmail.com", "user005", "20/06/2023");

-- Query Get All Users
-- Query para mostrar tabela users
SELECT * FROM users;

---------------------- QUERIES PRODUCTS -----------------------------

-- Query de criação da tabela products
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- Delete Table Products
DROP TABLE products;

-- Populando a tabela products
INSERT INTO products (id, name, price, description, image_url)
VALUES
    ("p001", "Monitor 001", 999.99, "The best product 001", "https://picsum.photos/seed/Mouse%20gamer/400"),
    ("p002", "Mouse 002", 899.99, "The best product 002", "https://picsum.photos/seed/Monitor/400"),
    ("p003", "Keyboard 003", 799.99, "The best product 003", "https://picsum.photos/seed/house/400"),
    ("p004", "Gamer Keyboard 004", 699.99, "The best product 004", "https://picsum.photos/seed/street/400"),
    ("p005", "Notebook 005", 599.99, "The best product 005", "https://picsum.photos/seed/soccer/400");

--Deletando todos as linhas da tabela products
DELETE FROM products;

-- Query Get All Products
SELECT * FROM products;

-- Query Get All Products com termo de busca
SELECT * FROM products
WHERE name LIKE '%game%';
