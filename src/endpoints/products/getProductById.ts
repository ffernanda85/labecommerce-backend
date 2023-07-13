import { Request, Response } from "express";
import { db } from "../../database/knex";

export async function getProductById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const [result] = await db("products").where({ id: id });

    if (!result) {
      res.status(404);
      throw new Error("'Id' not found");
    }
    res.status(200).send(result);
  } catch (error: unknown) {
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
