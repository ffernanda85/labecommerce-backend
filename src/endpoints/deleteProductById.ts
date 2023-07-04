import { Request, Response } from "express";
import { products } from "../dataBase";

export function deleteProductById(req: Request, res: Response) {
    try {
        //atribuindo a constante id o path params id
        const id = req.params.id;
    
        //verificando se o produto existe
        const findIndexProduct = products.findIndex((product) => product.id === id);
        if (findIndexProduct < 0) {
          res.status(404);
          throw new Error("Product not found");
        }
        //deletando o produto
        products.splice(findIndexProduct, 1);
        res.status(200).send("Deleted product");
          
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