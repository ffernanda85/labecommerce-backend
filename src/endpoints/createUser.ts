import { Request, Response } from "express";
import { users } from "../dataBase";
import { TUser } from "../types";

export function createUser(req: Request, res: Response) {
  try {
    const { id, name, email, password } = req.body;
    //verifica se está sendo enviado todos os dados para criação do usuário
    if (
      id === undefined ||
      name === undefined ||
      email === undefined ||
      password === undefined
    ) {
      res.status(400);
      throw new Error("Enter all the necessary information!");
    }
    //verifica id é string e tem pelo menos 1 caractere
    if (typeof id !== "string" || id.length < 1) {
      res.status(400);
      throw new Error("Invalid 'Id'. Enter a string");
    } else {
      const findId = users.find((user) => user.id === id);
      if (findId) {
        res.status(409);
        throw new Error("This 'Id' already exists");
      }
    }
    //verifica se name é string e tem pelo menos 1 caractere
    if (typeof name !== "string" || name.length < 1) {
      res.status(400);
      throw new Error("Invalid 'name'. Enter a string");
    }
    //validando o email
    if (typeof email !== "string") {
      res.status(400);
      throw new Error("Invalid 'email'. Enter a string");
    } else {
      //verificando se email segue o padrão regex
      if (!email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")) {
        res.status(422);
        throw new Error("Invalid email, try again!");
      }
      //verificando se o email já existe
      const findEmail = users.find((user) => user.email === email);

      if (findEmail) {
        res.status(409);
        throw new Error("This 'email' already exists");
      }
    }
    //verifica se o password é string e tem pelo menos 1 caractere
    if (typeof password !== "string" || password.length < 1) {
      res.status(400);
      throw new Error("Invalid 'password'. Enter a string");
    }
    //criando o novo usuário com os dados validados
    const newUser: TUser = {
      id,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    //dando o push no novo usuário para o array de usuário(o nosso banco de dados mocado)
    users.push(newUser);
    //fazendo um sort para garantir que a ordem de nossos usuários seja baseado no id
    users.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });
    //alterando o status para 201 e retornando a mensagem de cadastro realizado com sucesso
    res.status(201).send("Registered user!");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Unexpected error!");
    }
  }
}