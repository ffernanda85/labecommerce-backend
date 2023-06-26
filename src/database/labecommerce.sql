-- Active: 1687289759464@@127.0.0.1@3306

-- =================== QUERIES TABLE USERS =====================

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

-- Query Create User
INSERT INTO users (id, name, email, password, created_at)
VALUES
    ("u006", "user006", "user006@gmail.com", "user006", "21/06/2023");

--Delete user by id
DELETE FROM users
WHERE id = "u006";


-- =================== QUERIES PRODUCTS ==========================

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

-- Query Get All Products
SELECT * FROM products;

-- Query Get All Products com termo de busca
SELECT * FROM products
WHERE name LIKE '%game%';

-- Query Create Product
INSERT INTO products (id, name, price, description, image_url)
VALUES
    ("p006", "Notebook 006", 499.99, "The best product 006", "https://picsum.photos/seed/summer/400");

--Delete product by id
DELETE FROM products
WHERE id = "p006";

-- Query Update product by id
UPDATE products
SET name = "Notebook 0006",
    price = 100,
    description = "",
    image_url = ""
WHERE id = "p006";

-- ============================== Queries Purchases =========================
--purchases table creation query
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

--Populating purchases table
INSERT INTO purchases (id, buyer, total_price, created_at)
VALUES
    ("b001", "u001", 10000, "26/06/2023"),
    ("b002", "u001", 20000, "28/06/2023"),
    ("b003", "u002", 30000, "25/06/2023"),
    ("b004", "u003", 40000, "25/06/2023");

-- Query UPDATE purchases
UPDATE purchases
SET
    total_price = 9900
WHERE id = "b001";

--Query INNER JOIN purchases and users
SELECT 
    purchases.id AS purchase_id,
    buyer AS buyer_id,
    users.name AS buyer_name,
    email AS buyer_email,
    total_price,
    purchases.created_at
FROM purchases
INNER JOIN users
ON purchases.buyer = users.id;   