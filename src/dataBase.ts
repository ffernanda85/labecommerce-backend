import { TProduct, TUser } from "./types";

export const users: TUser[] = [
    {
        id: "u001",
        name: "Usuário 001",
        email: "usuario001@gmail.com",
        password: "usuario001",
        createdAt: new Date().toISOString()
    },
    {
        id: "u002",
        name: "Usuário 002",
        email: "usuario002@gmail.com",
        password: "usuario002",
        createdAt: new Date().toISOString()
    },
]

export const products: Array<TProduct> = [
    {
        id: "p001",
        name: "Product 001",
        price: 380,
        description: "Melhor Product 001 do Mercado",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "p002",
        name: "Product 002",
        price: 580,
        description: "Melhor Product 002 do Mercado",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
]


export function createUser(id: string, name: string, email: string, password: string): string {
    const newUser:TUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    }

    users.push(newUser)

    users.sort((a, b) => {
        if (a.id < b.id) {
            return -1
        } else if (a.id > b.id) {
            return 1
        } else {
            return 0
        }
    })
    return `Cadastro Realizado com Sucesso!`
}

export function getAllUsers(): TUser[] {
   return users
}
export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string): string {
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
        } else if (a.id > b.id) {
            return 1
        } else {
            return 0
        }
    })

    return `Produto Criado com Sucesso!`
}

export function getAllProducts():TProduct[] {
    return products
}

export function searchProductByName(name:string): TProduct[] {
   const search = products.filter(product => {
        return product.name.toLowerCase().includes(name.toLowerCase())    
   })
   return search
}

