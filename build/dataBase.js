"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductByName = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
exports.users = [
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
];
function createUser(id, name, email, password) {
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    exports.users.push(newUser);
    exports.users.sort((a, b) => {
        if (a.id < b.id) {
            return -1;
        }
        else if (a.id > b.id) {
            return 1;
        }
        else {
            return 0;
        }
    });
    return `Cadastro Realizado com Sucesso!`;
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
exports.products = [
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
];
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    };
    exports.products.push(newProduct);
    exports.products.sort((a, b) => {
        if (a.id < b.id) {
            return -1;
        }
        else if (a.id > b.id) {
            return 1;
        }
        else {
            return 0;
        }
    });
    return `Produto Criado com Sucesso!`;
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function searchProductByName(name) {
    const search = exports.products.filter(product => {
        return product.name.toLowerCase().includes(name.toLowerCase());
    });
    return search;
}
exports.searchProductByName = searchProductByName;
//# sourceMappingURL=dataBase.js.map