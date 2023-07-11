import express, { Request, Response } from "express";
import cors from "cors";
import { getAllUsers } from "./endpoints/users/getAllUsers";
import { getAllProducts } from "./endpoints/products/getAllProducts";
import { createUser } from "./endpoints/users/createUser";
import { createProduct } from "./endpoints/products/createProduct";
//import { deleteUserById } from "./endpoints/users/deleteUserById";
import { updateProductById } from "./endpoints/products/updateProductById";
import { createPurchase } from "./endpoints/purchases/createPurchase";
import { getProductById } from "./endpoints/products/getProductById";
import { deletePurchaseById } from "./endpoints/purchases/deletePurchaseById";
import { getPurchaseById } from "./endpoints/purchases/getPurchaseById";
import { deleteProductById } from "./endpoints/products/deleteProductById";

//criando o servidor express
const app = express();

//garantindo que as respostas serão no formato .JSON
app.use(express.json());

//habilitando o cors no servidor
app.use(cors());

//colocando o servidor para escutar a porta 3003 da nossa máquina
//startando servidor e testando
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//Get All Users
app.get("/users", getAllUsers);
//Get All Products
app.get("/products", getAllProducts);
//Get Product By Id
app.get("/products/:id", getProductById);
//Get Purchase By Id
app.get("/purchases/:id", getPurchaseById);
//create User
app.post("/users", createUser);
//create Product
app.post("/products", createProduct);
//create purchase
app.post("/purchases", createPurchase);
//delete Purchase By Id
app.delete("/purchases/:id", deletePurchaseById);
//delete User By Id
//app.delete("/users/:id", deleteUserById);
//delete Product By Id
app.delete("/products/:id", deleteProductById);
//update Product By Id
app.put("/products/:id", updateProductById);
