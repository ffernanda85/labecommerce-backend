export type TUser = {
    id: string
    name: string
    email: string
    password: string
    createdAt: string
}

export type TProduct = {
    id: string
    name: string
    price: number
    description: string
    image_url: string
}

export type TViewPurchase = {
    purchaseId: string
    buyerId: string
    buyerName: string
    buyerEmail: string
    totalPrice: number
    createdAt: string
    products: Array<{
        id: string
        name: string
        price: number
        description: string
        imageUrl: string
        quantity: number
    }>
}
