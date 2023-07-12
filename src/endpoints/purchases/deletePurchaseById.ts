import { Request, Response } from "express";
import { db } from "../../database/knex";

export const deletePurchaseById = async (req: Request, res: Response) => {
   try {
    //recebendo o valor do id mandado pelo path params
    const idToDelete = req.params.id
    //verificando se id existe na tabela purchases
    const [purchase] = await db("purchases").where({ id: idToDelete })
    if (!purchase) {
        res.status(404);
        throw new Error("'Id'not found");
    }
    //deletando compra
    await db("purchases").del().where({ id: idToDelete })
    res.status(200).send({ message: 'successfully canceled purchase' })   
       
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