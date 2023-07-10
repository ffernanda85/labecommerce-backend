import express, { Request, Response } from "express";
import cors from "cors";
import { getAllUsers } from "./endpoints/getAllUsers";
import { getAllProducts } from "./endpoints/getAllProducts";
import { createUser } from "./endpoints/createUser";
import { createProduct } from "./endpoints/createProduct";
//import { deleteUserById } from "./endpoints/deleteUserById";
//import { deleteProductById } from "./endpoints/deleteProductById";
import { updateProductById } from "./endpoints/updateProductById";
import { createPurchase } from "./endpoints/createPurchase";
import { getProductById } from "./endpoints/getProductById";
import { deletePurchaseById } from "./endpoints/deletePurchaseById";

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
//app.delete("/products/:id", deleteProductById);
//update Product By Id
app.put("/products/:id", updateProductById);
