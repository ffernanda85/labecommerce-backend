import express, { Request, Response } from "express";
import { users } from "../dataBase";

export function getAllUsers(req: Request, res: Response) {
  try {
    res.status(200).send(users);
  } catch (error) {
    //garante que o status seja alterado do padrão caso ocorra um erro inesperado
    //já que o valor do status padrão é 200
    if (res.statusCode === 200) {
      res.status(500);
    }
    //verifica se o erro recebido é uma instância da classe Error ou é um error inesperado do servidor
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Unexpected error!");
    }
  }
}
