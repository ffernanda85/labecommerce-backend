import { Request, Response } from "express";
import { db } from "../../database/knex";

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const idToUpdate = req.params.id;
    const { id, name, price, description, image_url } = req.body;

    if (id !== undefined) {
      if (typeof id !== "string" || id.length < 1) {
        res.status(400);
        throw new Error("Invalid 'id'. Enter a valid string");
      }
    }

    if (name !== undefined) {
      if (typeof name !== "string" || name.length < 1) {
        res.status(400);
        throw new Error("Invalid 'name'. Enter a valid string");
      }
    }

    if (price !== undefined) {
      if (typeof price !== "number") {
        res.status(400);
        throw new Error("Invalid 'price'. Enter a number");
      } else if (price <= 0) {
        res.status(400);
        throw new Error("Invalid 'price'. Enter a value greater than zero");
      }
    }

    if (description !== undefined) {
      if (typeof description !== "string" || description.length < 1) {
        res.status(400);
        throw new Error("Invalid 'description'. Enter a valid string");
      }
    }

    if (image_url !== undefined) {
      if (typeof image_url !== "string" || image_url.length < 1) {
        res.status(400);
        throw new Error("Invalid 'imageUrl'. Enter a valid string");
      }
    }
    const [product] = await db("products").where({ id: idToUpdate });
    if (product) {
      const updateProduct = {
        id: id || product.id,
        name: name || product.name,
        price: price || product.price,
        description: description || product.description,
        image_url: image_url || product.image_url,
      };

      await db("products").update(updateProduct).where({ id: idToUpdate });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
    res.status(200).send({ message: "Update product" });
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
};
