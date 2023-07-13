import { Request, Response } from "express";
import { db } from "../../database/knex";

export async function createPurchase(req: Request, res: Response) {
  try {
    //desestruturando as query params recebidas via body
    const { id, buyer, total_price, products } = req.body;
    //verificando se todas as informações foram enviadas na requisição
    if (
      id === undefined ||
      buyer === undefined ||
      total_price === undefined ||
      products === undefined
    ) {
      res.status(400);
      throw new Error(
        "Enter all the necessary information:'id','buyer','total_price','products'"
      );
    }
    //validando o id
    if (typeof id !== "string" || id.length < 1) {
      res.status(400);
      throw new Error("Invalid 'Id'. Enter a valid string");
    }
    //validando total_price
    if (typeof total_price !== "number" || total_price <= 0) {
      res.status(400);
      throw new Error("Invalid 'total_price'. Enter a valid number");
    }
    //validando o array products
    if (products.length < 1) {
      res.status(400);
      throw new Error(
        "Enter all the necessary information!'Product Id' and 'quantity'"
      );
    }
    //for of para percorrer o array de products e fazer as validações do id e quantity
    for (let product of products) {
      //verificando se ambas as informações foram enviadas (id e quantity)
      if (product.id === undefined || product.quantity === undefined) {
        res.status(400);
        throw new Error(
          "Enter all the necessary information! 'Product Id' and 'quantity'"
        );
      }
      //validações de type e tamanho do id do produto
      if (typeof product.id !== "string" || product.id.length < 1) {
        res.status(400);
        throw new Error("Invalid product 'Id'. Enter a valid string");
      }
      //validações do quantity do produto
      if (typeof product.quantity !== "number" || product.quantity <= 0) {
        res.status(400);
        throw new Error("Invalid product 'quantity'. Enter a valid number");
      }
    }
    //validações no banco de dados quanto a purchases
    //verificando se id da compra já existe
    const [idPurchaseExist] = await db("purchases").where({ id: id });
    if (idPurchaseExist) {
      res.status(400);
      throw new Error("'purchase id' already registered");
    }
    //verificando se o comprador existe em users
    const [idBuyerExist] = await db("users").where({ id: buyer });
    if (!idBuyerExist) {
      res.status(400);
      throw new Error("'buyer'not registered in users");
    }
    //validações no banco de dados quanto a products
    for (let product of products) {
      //verificando se o produto está cadastrado em products
      const [idProductExist] = await db("products").where({ id: product.id });
      if (!idProductExist) {
        res.status(400);
        throw new Error("'id'not registered in products");
      }
    }
    //criando item a ser inserido na tabela purchases
    const newPurchase = {
      id,
      buyer,
      total_price,
    };
    //inserindo newPurchase na tabela purchases
    await db("purchases").insert(newPurchase);
    //inserindo os valores na tabela de relação purchases_products
    for (let product of products) {
      //criando o objeto a ser inserido na tabela purchases_products
      const newPurchase_Product = {
        purchase_id: id,
        product_id: product.id,
        quantity: product.quantity,
      };
      await db("purchases_products").insert(newPurchase_Product);
    }
    //alterando o status da resposta e enviando a mensagem de registro de compra
    res.status(201).send({ message: "registered purchase" });
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
