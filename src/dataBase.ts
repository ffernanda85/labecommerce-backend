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
