import { Request, Response } from "express";
import { db } from "../../database/knex";
import { TProduct } from "../../types";

export async function createProduct( req: Request, res: Response) {
    try {
        //Desestruturando e recebendo dados do req.body
        const { id, name, price, description, image_url } = req.body;
        //validando o body
        if (
          id === undefined ||
          name === undefined ||
          price === undefined ||
          description === undefined ||
          image_url === undefined
        ) {
          res.status(400);
          throw new Error("Enter all the necessary information!");
        }
        //verifica se id é string e tem pelo menos 1 caractere
        if (typeof id !== "string" || id.length < 1) {
          res.status(400);
          throw new Error("Invalid 'Id'. Enter a valid string");
        } 
        //verifica se name é string e tem pelo menos 1 caractere
        if (typeof name !== "string" || name.length < 1) {
          res.status(400);
          throw new Error("Invalid 'name'. Enter a valid string");
        }
        //validando o price
        if (typeof price !== "number" || price <= 0) {
          res.status(400);
          throw new Error("Invalid 'price'. Enter a valid price");
        }
        //verifica se description é string e tem pelo menos 1 caractere
        if (typeof description !== "string" || description.length < 1) {
          res.status(400);
          throw new Error("Invalid 'description'. Enter a valid string");
        }
        //validando image_url
        if (typeof image_url !== "string" || image_url.length < 1) {
          res.status(400);
          throw new Error("Invalid 'image_url'. Enter a string");
        }
        //criando o newProduct com as informações validadas do body
        const newProduct: TProduct = {
          id,
          name,
          price,
          description,
          image_url
        };
        
        //inserindo newProduct na tabela products
        await db("products").insert(newProduct)  
        //alterando o status e enviando a mensagem de registro com sucesso
        res.status(201).send({ message: "Registered Product!" });
          
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