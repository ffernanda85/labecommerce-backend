import { products, users } from "./dataBase";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TUser } from "./types";

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
app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error) {
    //garante que o status seja alterado do padrão caso ocorra um erro inesperado
    //já que o valor do status padrão é 200
    if (res.statusCode === 200) {
      res.status(500);
    }
    //verifica se o erro recebido é uma instância da classe Error ou é um error inesperado do servidor
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Unexpected error!");
    }
  }
});

//Get All Products
app.get("/products", (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;

    //verifica se name está sendo enviado pela query
    if (name !== undefined) {
      //forçando um erro caso o name tenha menos de 01 caracter
      if (name.length < 1) {
        res.status(400);
        throw new Error("Invalid name! Enter more than one character");
      }
      //verificando se o name enviado é compativel com algum produto, caso sim retorna o produto, se não retorna todos os produtos
      const filterProduct = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
      filterProduct.length > 0
        ? res.status(200).send(filterProduct)
        : res.status(200).send(products);
    }
    //se o name não for enviado pela query mostra todos os produtos
    res.status(200).send(products);
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

//create User
app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    //validando o body
    if (
      id === undefined ||
      name === undefined ||
      email === undefined ||
      password === undefined
    ) {
      res.status(400);
      throw new Error("Enter all the necessary information!");
    }

    //validando o id como string
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("Invalid 'Id'. Enter a string");
    } else {
      const findId = users.find((user) => user.id === id);
      if (findId) {
        res.status(400);
        throw new Error("This 'Id' already exists");
      }
    }

    //validando o name como string
    if (typeof name !== "string") {
      res.status(400);
      throw new Error("Invalid 'name'. Enter a string");
    }

    //validando o email
    if (typeof email !== "string") {
      res.status(400);
      throw new Error("Invalid 'email'. Enter a string");
    } else {
      //verificando se o email já existe
      const findEmail = users.find((user) => user.email === email);

      if (findEmail) {
        res.status(400);
        throw new Error("This 'email' already exists");
      }
    }

    //validando o password
    if (typeof password !== "string") {
      res.status(400);
      throw new Error("Invalid 'password'. Enter a string");
    }

    //criando o novo usuário com os dados validados
    const newUser: TUser = {
      id,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    //dando o push no novo usuário para o array de usuário(o nosso banco de dados mocado)
    users.push(newUser);
    //fazendo um sort para garantir que a ordem de nossos usuários seja baseado no id
    users.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });
    //alterando o status para 201 e retornando a mensagem de cadastro realizado com sucesso
    res.status(201).send("Registered user!");
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
        res.status(400);
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

    const findIndexUser = users.findIndex((user) => user.id === id);

    //verificando se a conta existe
    if (findIndexUser < 0) {
      res.status(404);
      throw new Error("Account not exist");
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

//deleteProductById
app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const indexProductDelete = products.findIndex((product) => product.id === id);

  if (indexProductDelete >= 0) {
    products.splice(indexProductDelete, 1);
    res.status(200).send("Produto apagado com sucesso!");
  } else {
    res.status(400).send("Produto não encontrado!");
  }
});

//updateProductById
app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  //Desestruturando e tipando as entradas do req.body
  const { name, price, description, imageUrl } = req.body as TProduct;

  //declarando as entradas do req.body e tipando elas uma a uma
  /* const newName = req.body.name as string | undefined
      const newPrice = req.body.price as number
      const newDescription = req.body.description as string | undefined
      const newImageUrl = req.body.newImageUrl as string | undefined */

  const product = products.find((product) => product.id === id);

  if (product) {
    product.name = name || product.name;
    product.price = price > 0 ? price : product.price;
    product.description = description || product.description;
    product.imageUrl = imageUrl || product.imageUrl;

    res.status(200).send("Produto Atualizado com sucesso!");
  } else {
    res.status(400).send("Produto não encontrado!");
  }
});
