import { products, users } from "./dataBase";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TUser } from "./types";
import { getAllUsers } from "./endpoints/getAllUsers";
import { getAllProducts } from "./endpoints/getAllProducts";
import { createUser } from "./endpoints/createUser";

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

//metodo ping
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//Get All Users
app.get("/users", getAllUsers);

//Get All Products
app.get("/products", getAllProducts);

//create User
app.post("/users", createUser);

//create Product
app.post("/products", (req: Request, res: Response) => {
  try {
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

    //validando id como string
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("Invalid 'Id'. Enter a string");
    } else {
      //verificando se o Id já existe
      const findId = products.find((product) => product.id === id);
      if (findId) {
        res.status(409);
        throw new Error("This 'Id' already exists");
      }
    }

    //validando name
    if (typeof name !== "string") {
      res.status(400);
      throw new Error("Invalid 'name'. Enter a string");
    }

    //validando o price
    if (typeof price !== "number") {
      res.status(400);
      throw new Error("Invalid 'price'. Enter a number");
    }

    //validando description
    if (typeof description !== "string") {
      res.status(400);
      throw new Error("Invalid 'description'. Enter a string");
    }

    //validando imageURL
    if (typeof imageUrl !== "string") {
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
});

//delete User By Id
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    //verificando se a conta existe
    const findIndexUser = users.findIndex((user) => user.id === id);
        
    if (findIndexUser < 0) {
      res.status(404);
      throw new Error("Account not found");
    }
    //deleta o usuário que está no indice indicado pelo findIndexUser
    users.splice(findIndexUser, 1);
    res.status(200).send("Deleted user");

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
});

//delete Product By Id
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    //atribuindo a constante id o path params id
    const id = req.params.id;

    //verificando se o produto existe
    const findIndexProduct = products.findIndex((product) => product.id === id);

    if (findIndexProduct < 0) {
      res.status(404);
      throw new Error("Product not found");
    }
    
    //deletando o produto
    products.splice(findIndexProduct, 1);
    res.status(200).send("Deleted product");
      
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
});

//update Product By Id
app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const findProduct = products.find(product => product.id === id)

        if (!findProduct) {
            res.status(404)
            throw new Error("Product not found");
        }
        //Desestruturando as entradas do req.body
        const { name, price, description, imageUrl } = req.body

        if (name !== undefined && typeof name !== "string") {
            res.status(400)
            throw new Error("Invalid 'name'. Enter a string");
        }

        if (price !== undefined) {
          if (typeof price !== "number") {
            res.status(400)
            throw new Error("Invalid 'price'. Enter a number");  
          } else if (price <= 0) {
            res.status(400)
            throw new Error("Invalid 'price'. Enter a value greater than zero");  
          }
        }  

        if (description !== undefined && typeof description !== "string") {
            res.status(400)
            throw new Error("Invalid 'description'. Enter a string");
        }

        if (imageUrl !== undefined && typeof imageUrl !== "string") {
            res.status(400)
            throw new Error("Invalid 'imageURL'. Enter a string");
        }

        findProduct.name = name || findProduct.name
        findProduct.price = price || findProduct.price
        findProduct.description = description || findProduct.description
        findProduct.imageUrl = imageUrl || findProduct.imageUrl

        res.status(200).send("Update product")

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
});
