import { Request, Response } from "express";
import { db } from "../database/knex";

export async function createPurchase(req:Request, res:Response) {
    try {
        //desestruturando as query params recebidas via body
        const { id, buyer, totalPrice } = req.body
        //verificando se todas as informações foram enviadas na requisição
        if (
            id === undefined ||
            buyer === undefined ||
            totalPrice === undefined
        ) {
            res.status(400);
            throw new Error("Enter all the necessary information!");
        }
        //validando o id
        if (typeof id !== "string" || id.length < 1) {
            res.status(400);
            throw new Error("Invalid 'Id'. Enter a valid string");
        }
        //validando totalPrice
        if (typeof totalPrice !== "number" || totalPrice <= 0) {
            res.status(400);
            throw new Error("Invalid 'totalPrice'. Enter a valid number");
        }
       
        //criando item a ser inserido na tabela
        const newPurchase = {
            id,
            buyer,
            totalPrice,
            createdAt: new Date().toISOString()
        }
        //inserindo newPurchase na tabela purchases
        await db("purchases").insert(newPurchase)
        //alterando o status da resposta e enviando a mensagem de registro de compra
        res.status(201).send({ message: "registered purchase" })

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