import { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const q = req.query.name;
    //verifica se name está sendo enviado pela query
    if (q !== undefined) {
      if (typeof q !== "string") {
        res.status(400);
        throw new Error("Invalid 'name'. Enter a string");
      }
      //forçando um erro caso o name tenha menos de 01 caracter
      if (q.length < 1) {
        res.status(400);
        throw new Error("Invalid name! Enter more than one character");
      }
      //verificando se o name enviado é compativel com algum produto, caso sim retorna o produto, se não retorna todos os produtos
      const result = await db("products")
        .select(
          "id AS productId",
          "name AS productName",
          "price",
          "description",
          "image_url AS imageUrl"
        )
        .where("name", "LIKE", `%${q}%`)
        .orderBy("productId", "ASC")
      
     /*  if (result.length < 1) {
        res.status(404);
        throw new Error("Invalid name! Product name not found!");
      } */
      
      res.status(200).send(result);
    }
    //se o name não for enviado pela query mostra todos os produtos
    const result = await db("products")
      .select(
        "id AS productId",
        "name AS productName",
        "price",
        "description",
        "image_url AS imageUrl"
      )
      .orderBy("productId", "ASC")
    
    res.status(200).send(result);

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
