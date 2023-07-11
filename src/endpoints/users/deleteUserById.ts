/* import { Request, Response } from "express";
import { users } from "../dataBase";

export function deleteUserById(req: Request, res: Response) {
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
    
      } catch (error:unknown) {
        if (res.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Unexpected error!");
        }
      }
} */