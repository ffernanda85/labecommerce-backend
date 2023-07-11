import { Request, Response } from "express";
import { db } from "../../database/knex";

export async function deleteUserById(req: Request, res: Response) {
  //criar bloco try cat para a função assíncrona
  try {
    //receber o id pelo path params
    const idToDelete = req.params.id;

    //verificar se o id enviado faz parte da tabela de users
    const [user] = await db("users").where({ id: idToDelete });
    if (!user) {
      res.status(404);
      throw new Error("'User Id'not found");
    }

    await db("users").del().where({ id: idToDelete });
    res.status(200).send({ message: "deleted user" });
  } catch (error: unknown) {
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
