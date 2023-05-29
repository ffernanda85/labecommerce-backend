import { createProduct, createUser, getAllProducts, getAllUsers, products, searchProductByName, users } from "./dataBase";

//console.log(users);
//console.log(products);

//createUser("u003", "Usuario 003", "usuario003@gmail.com", "usuario003")
//getAllUsers()

createProduct("p003", "Product 003", 1900, "Melhor Product 003 do Mercado", "https://picsum.photos/seed/Monitor/401")
//getAllProducts()
searchProductByName("PRODU")