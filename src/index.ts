import { products, users } from "./dataBase";
import express, { Request, Response } from 'express';
import cors from 'cors';
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
    console.log("Servidor rodando na porta 3003")
})

//metodo ping
app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

//getAllUsers
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

//getAllProducts
app.get("/products", (req: Request, res: Response) => {
    const name = req.query.name

    if (name) {
        const result = products.filter(product => {
            return product.name.toLowerCase().includes(name.toString().toLowerCase())
        })
        result.length > 0 ? res.status(200).send(result) : res.status(200).send(products)    
    }
    res.status(200).send(products)    
})

//createUser
app.post("/users", (req: Request, res: Response) => {
    const { id, name, email, password } = req.body
    
    const newUser: TUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    }
    users.push(newUser);
    users.sort((a, b) => {
        if (a.id < b.id) {
            return -1
        } else if (a.id > b.id) {
            return 1
        } else {
            return 0
        }
    })
    res.status(201).send("Cadastro Realizado com Sucesso!")
})

//createProduct
app.post("/products", (req: Request, res: Response) => {
    const { id, name, price, description, imageUrl } = req.body
    
    const newProduct: TProduct = {
        id,
        name, 
        price,
        description,
        imageUrl
    }
    products.push(newProduct);
    products.sort((a, b) => {
        if (a.id < b.id) {
            return -1
        } else if (a.id > b.id){
            return 1
        } else {
            return 0
        }
    })
    res.status(201).send("Produto Cadastrado com Sucesso!")
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexUserDelete = users.findIndex(user => user.id === id)

    if (indexUserDelete >= 0) {
        users.splice(indexUserDelete, 1)
    }

    res.status(200).send("User apagado com sucesso!")
})