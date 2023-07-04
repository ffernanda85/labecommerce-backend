import { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await db('users')
    res.status(200).send(result);
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