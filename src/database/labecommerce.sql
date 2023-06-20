-- Active: 1687214593832@@127.0.0.1@3306

--Criando a tabela de users
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

--Exibir tabela users
SELECT * FROM users;
