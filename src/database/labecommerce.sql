-- Active: 1687214593832@@127.0.0.1@3306

--Criando a tabela de users
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, created_at)
VALUES
    ("u001", "user001", "user001@gmail.com", "user001", "20/06/2023"),
    ("u002", "user002", "user002@gmail.com", "user002", "20/06/2023"),
    ("u003", "user003", "user003@gmail.com", "user003", "20/06/2023"),
    ("u004", "user004", "user004@gmail.com", "user004", "20/06/2023"),
    ("u005", "user005", "user005@gmail.com", "user005", "20/06/2023");

--Exibir tabela users
SELECT * FROM users;
