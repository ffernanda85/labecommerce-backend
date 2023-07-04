import { Request, Response } from "express";
import { products } from "../dataBase";

export function updateProductById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        //verifica se o produto a ser editado realmente existe
        const findProduct = products.find(product => product.id === id)

        if (!findProduct) {
            res.status(404)
            throw new Error("Product not found");
        }
        //Desestruturando as entradas do req.body
        const { name, price, description, imageUrl } = req.body
        //verifica se o name foi enviado, se é uma string e possui pelo menos um caractere
        if (name !== undefined) {
            if (typeof name !== "string" || name.length < 1) {
               res.status(400)
               throw new Error("Invalid 'name'. Enter a valid string");
            }
        }
        //verifica se o price foi enviado, se é do tipo number e se é maior que zero
        if (price !== undefined) {
          if (typeof price !== "number") {
            res.status(400)
            throw new Error("Invalid 'price'. Enter a number");  
          } else if (price <= 0) {
            res.status(400)
            throw new Error("Invalid 'price'. Enter a value greater than zero");  
          }
        }  
        //verifica se description foi enviado, se é uma string e possui pelo menos um caractere
        if (description !== undefined && (typeof description !== "string" || description.length < 1)) {
            res.status(400)
            throw new Error("Invalid 'description'. Enter a valid string");
        }
        //verifica se imageUrl foi enviado, se é uma string e possui pelo menos um caractere
        if (imageUrl !== undefined && (typeof imageUrl !== "string" || imageUrl.length < 1)) {
            res.status(400)
            throw new Error("Invalid 'imageURL'. Enter a valid string");
        }

        findProduct.name = name || findProduct.name
        findProduct.price = price || findProduct.price
        findProduct.description = description || findProduct.description
        findProduct.imageUrl = imageUrl || findProduct.imageUrl

        res.status(200).send("Update product")

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