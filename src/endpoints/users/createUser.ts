import { Request, Response } from "express";
import { db } from "../../database/knex";
import { TUser } from "../../types";

export async function createUser(req: Request, res: Response) {
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
      throw new Error("Enter all the necessary information: id, name, email and password!");
    }
    //verifica id é string e tem pelo menos 1 caractere
    if (typeof id !== "string" || id.length < 1) {
      res.status(400);
      throw new Error("Invalid 'Id'. Enter a string");
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
      password
    };
    //Inserindo newUser na tabela users
    await db("users").insert(newUser)
    //alterando o status para 201 e retornando a mensagem de cadastro realizado com sucesso
    res.status(201).send({ message: "Registered user!" });

  } catch (error:unknown) {
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