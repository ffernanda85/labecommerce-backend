import { createProduct, createUser, getAllProducts, getAllUsers, products, searchProductByName, users } from "./dataBase";

//console.log(users);
//console.log(products);

//console.log(createUser("u003", "Usuario 003", "usuario003@gmail.com", "usuario003"));
//console.log(createUser("u000", "Usuario 000", "usuario003@gmail.com", "usuario003"));
//console.log(getAllUsers())



console.log(createProduct("p003", "Product 003", 1900, "Melhor Product 003 do Mercado", "https://picsum.photos/seed/Monitor/401"))
//console.log(createProduct("p000", "Product 000", 1900, "Melhor Product 003 do Mercado", "https://picsum.photos/seed/Monitor/401"))
//console.log(getAllProducts())
console.log(searchProductByName("PR"))