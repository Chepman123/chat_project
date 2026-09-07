import { Request,Response } from "express";

import LoginService from "../../Services/LoginService";

export default class LoginController{
   constructor(private serv:LoginService){}
  async Login(req:Request,res:Response){

   if (!req.body.login || !req.body.password) {
  return res.status(400).json({ error: "Missing login or password" });
   }
   try{
      const result = await this.serv.login(req.body.login,req.body.password);
      
       res.cookie('token',result.token,{
                httpOnly:true,
                secure:true,
                sameSite:'none',
                maxAge:7*24*60*60*1000
            })
            
   res.json(result.result);
   }
   catch(error){
      res.status(500).json({error:error});
   }
}
}
