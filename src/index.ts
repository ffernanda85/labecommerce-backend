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

//Get All Users
app.get("/users", (req: Request, res: Response) => {
    try {
        res.status(200).send(users)    

    } catch (error) {
        //garante que o status seja alterado do padrão caso ocorra um erro inesperado
        //já que o valor do status padrão é 200
        if (res.statusCode === 200) {
            res.status(500)
        }
        //verifica se o erro recebido é uma instância da classe Error ou é um error inesperado do servidor
        if (error instanceof Error) {
            res.send(error.message)    
        } else {
            res.send("Unexpected error")
        }
    }
})

//Get All Products
app.get("/products", (req: Request, res: Response) => {
    try {
        
        const name = req.query.name

        if (name) {
            const result = products.filter(product => {
                return product.name.toLowerCase().includes(name.toString().toLowerCase())
            })
            result.length > 0 ? res.status(200).send(result) : res.status(200).send(products)    
        }
        res.status(200).send(products)  

    } catch (error) {
        
    }
    
    
     
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

//updateProductById
app.put("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    //Desestruturando e tipando as entradas do req.body
    const {name, price, description, imageUrl} = req.body as TProduct 
    
    //declarando as entradas do req.body e tipando elas uma a uma
    /* const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.newImageUrl as string | undefined */

    const product = products.find(product => product.id === id)

    if (product) {
        product.name = name || product.name
        product.price = price > 0 ? price : product.price
        product.description = description || product.description
        product.imageUrl = imageUrl || product.imageUrl

        res.status(200).send("Produto Atualizado com sucesso!")
    } else {

        res.status(400).send("Produto não encontrado!")
    }
})

//deleteUserById
app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexUserDelete = users.findIndex(user => user.id === id)

    if (indexUserDelete >= 0) {
        users.splice(indexUserDelete, 1)
        res.status(200).send("Usuário apagado com sucesso!")

    } else {
        res.status(400).send("Usuário não encontrado!")    
    }
})

//deleteProductById
app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexProductDelete = products.findIndex(product => product.id === id)

    if (indexProductDelete >= 0) {
        products.splice(indexProductDelete, 1)
        res.status(200).send("Produto apagado com sucesso!")

    } else {
        res.status(400).send("Produto não encontrado!")
    }
})