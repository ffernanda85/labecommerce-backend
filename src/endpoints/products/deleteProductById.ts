import { Request, Response } from "express";
import { db } from "../../dataBase/knex";

export async function deleteProductById(req: Request, res: Response) {
  try {
    //atribuindo a constante idToDelete o path params id
    const idToDelete = req.params.id;
    //verificando se o id enviado está cadastrado nos products
    const [product] = await db("products").where({ id: idToDelete });
    if (!product) {
      res.status(404);
      throw new Error("'Id' not found");
    }
    //deletando produto do banco de dados
    await db("products").del().where({ id: idToDelete });
    res.status(200).send({ message: "deleted product" });
    
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
