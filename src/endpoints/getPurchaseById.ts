import { Request, Response } from "express";
import { db } from "../database/knex";
import { TViewPurchase } from "../types";

export async function getPurchaseById(req: Request, res: Response) {
  try {
    const idToSelect = req.params.id;
    const [testPurchase] = await db("purchases").where({ id: idToSelect });

    if (!testPurchase) {
      res.status(404);
      throw new Error("'id' not found");
    }

    const [viewPurchase] = await db("purchases")
      .select(
        "purchases.id  AS purchaseId",
        "purchases.buyer AS buyerId",
        "users.name AS buyerName",
        "users.email AS buyerEmail",
        "purchases.total_price AS totalPrice",
        "purchases.created_at AS createdAt"
      )
      .innerJoin("users", "users.id", "=", "purchases.buyer")
      .where("purchases.id", "=", idToSelect);

    const products = await db("products")
      .select(
        "products.id",
        "products.name",
        "products.price",
        "products.description",
        "products.image_url AS imageUrl",
        "purchases_products.quantity"
      )
      .innerJoin(
        "purchases_products",
        "purchases_products.product_id",
        "=",
        "products.id"
      )
      .where("purchases_products.purchase_id", "=", idToSelect);

      const viewPurchaseById: TViewPurchase[] = {
          ...viewPurchase,
          products
      }
      
    res.status(200).send(viewPurchaseById);
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
