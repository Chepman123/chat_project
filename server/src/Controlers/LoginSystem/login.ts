import { Request,Response } from "express";

import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import LoginService from "../../Services/LoginService";

export default class LoginController{
   constructor(private serv:LoginService){}
  async Login(req:Request,res:Response){

   if (!req.body.login || !req.body.password) {
  return res.status(400).json({ error: "Missing login or password" });
   }
   try{
   res.json(await this.serv.login(req.body.login,req.body.password));
   }
   catch(error){
      res.status(500).json({error:error});
   }
}
}
