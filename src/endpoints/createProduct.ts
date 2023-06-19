import { Request, Response } from "express";
import { products } from "../dataBase";
import { TProduct } from "../types";

export function createProduct( req: Request, res: Response) {
    try {
        //Desestruturando e recebendo dados do req.body
        const { id, name, price, description, imageUrl } = req.body;
        //validando o body
        if (
          id === undefined ||
          name === undefined ||
          price === undefined ||
          description === undefined ||
          imageUrl === undefined
        ) {
          res.status(400);
          throw new Error("Enter all the necessary information!");
        }
        //verifica se id é string e tem pelo menos 1 caractere
        if (typeof id !== "string" || id.length < 1) {
          res.status(400);
          throw new Error("Invalid 'Id'. Enter a valid string");
        } else {
          //verificando se o Id já existe
          const findId = products.find((product) => product.id === id);
          if (findId) {
            res.status(409);
            throw new Error("This 'Id' already exists");
          }
        }
        //verifica se name é string e tem pelo menos 1 caractere
        if (typeof name !== "string" || name.length < 1) {
          res.status(400);
          throw new Error("Invalid 'name'. Enter a valid string");
        }
        //validando o price
        if (typeof price !== "number" || price <= 0) {
          res.status(400);
          throw new Error("Invalid 'price'. Enter a valid number");
        }
        //verifica se description é string e tem pelo menos 1 caractere
        if (typeof description !== "string" || description.length < 1) {
          res.status(400);
          throw new Error("Invalid 'description'. Enter a valid string");
        }
        //validando imageURL
        if (typeof imageUrl !== "string" || imageUrl.length < 1) {
          res.status(400);
          throw new Error("Invalid 'imageURL'. Enter a string");
        }
        //criando o newProduct com as informações validadas do body
        const newProduct: TProduct = {
          id,
          name,
          price,
          description,
          imageUrl,
        };
    
        products.push(newProduct);
    
        products.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          } else if (a.id > b.id) {
            return 1;
          } else {
            return 0;
          }
        });
    
        res.status(201).send("Registered Product!");
          
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