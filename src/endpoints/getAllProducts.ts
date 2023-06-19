import { Request, Response } from "express";
import { products } from "../dataBase";

export function getAllProducts(req: Request, res: Response) {
  try {
    const name = req.query.name;

    //verifica se name está sendo enviado pela query
    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("Invalid 'name'. Enter a string");
      }
      //forçando um erro caso o name tenha menos de 01 caracter
      if (name.length < 1) {
        res.status(400);
        throw new Error("Invalid name! Enter more than one character");
      }
      //verificando se o name enviado é compativel com algum produto, caso sim retorna o produto, se não retorna todos os produtos
      const filterProduct = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
      filterProduct.length > 0
        ? res.status(200).send(filterProduct)
        : res.status(200).send(products);
      }
      
    //se o name não for enviado pela query mostra todos os produtos
    res.status(200).send(products);
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
