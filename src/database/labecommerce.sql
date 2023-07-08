-- Active: 1687289759464@@127.0.0.1@3306

-- =================== QUERIES TABLE USERS =====================

--Query de criação da tabela de users
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
);

DROP TABLE users;

--Query para popular a tabela users
INSERT INTO users (id, name, email, password)
VALUES
    ("u001", "Manoel", "manoel@gmail.com", "mane123"),
    ("u002", "Zé", "ze@gmail.com", "zezin123"),
    ("u003", "Maria", "maria@gmail.com", "maria123");

-- Query Get All Users
-- Query para mostrar tabela users
SELECT * FROM users;

UPDATE users
SET email = "manoel1@gmail.com"
WHERE id = "u001";

-- Query Create User
INSERT INTO users (id, name, email, password)
VALUES
    ("u004", "Luzia", "luzia@gmail.com", "lulu123");

--Delete user by id
DELETE FROM users
WHERE id = "u004";


-- =================== QUERIES PRODUCTS ==========================

-- Query de criação da tabela products
CREATE TABLE IF NOT EXISTS products (
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
    ("p001", "Monitor 001", 999.99, "The best Monitor 001", "https://picsum.photos/seed/Mouse%20gamer/400"),
    ("p002", "Mouse 002", 899.99, "The best Mouse 002", "https://picsum.photos/seed/Monitor/400"),
    ("p003", "Keyboard 003", 799.99, "The best Keyboard 003", "https://picsum.photos/seed/house/400"),
    ("p004", "Gamer Keyboard 004", 699.99, "The best Gamer 004", "https://picsum.photos/seed/street/400"),
    ("p005", "Notebook Gamer 005", 599.99, "The best Notebook 005", "https://picsum.photos/seed/soccer/400");

-- Query Get All Products
SELECT * FROM products;

-- Query Get All Products com termo de busca
SELECT * FROM products
WHERE LOWER(name) LIKE LOWER('%game%');

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
    price = 100000,
    description = "The best product 006 alterado",
    image_url = "https://picsum.photos/seed/summer/400"
WHERE id = "p006";

-- ============================== Queries Purchases =========================
--purchases table creation query
CREATE TABLE IF NOT EXISTS purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

--Populating purchases table
INSERT INTO purchases (id, buyer, total_price)
VALUES
    ("pur001", "u001", 10000),
    ("pur002", "u001", 20000),
    ("pur003", "u002", 30000),
    ("pur004", "u003", 40000);

DROP TABLE purchases;

-- Query UPDATE purchases
UPDATE purchases
SET
    total_price = 98000
WHERE id = "pur001";

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
ON purchases.buyer = users.id
WHERE users.id = "u002";   

-- =========================== TABELA DE RELAÇÕES purchases_products ==========================
-- Criando tabela de relação purchases_products
CREATE TABLE IF NOT EXISTS purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

DROP TABLE purchases_products;

-- Populando tabela purchase_products
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("pur001", "p001", 3),
    ("pur002", "p004", 2),
    ("pur004", "p005", 15);

-- Fazendo consulta com junção INNER JOIN
SELECT *
FROM purchases_products
INNER JOIN purchases ON purchases.id = purchases_products.purchase_id
INNER JOIN products ON products.id = purchases_products.product_id;

SELECT
    purchase_id,
    quantity,
    product_id,
    products.name AS productName,
    price AS productPrice,
    total_price AS totalPrice,
    purchases.created_at AS datePurchase,
    buyer AS buyerId,
    users.name AS userName
FROM purchases_products
INNER JOIN products ON products.id = purchases_products.product_id
INNER JOIN purchases ON purchases.id = purchases_products.purchase_id
INNER JOIN users ON users.id = purchases.buyer;