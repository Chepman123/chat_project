import { Router,Request,Response } from "express";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import LoginController from "../../Controlers/LoginSystem/login";
import LoginService from "../../Services/LoginService";

export default (db:Connection)=>{
    const router = Router();
    
    const service:LoginService = new LoginService(db);
    const controller:LoginController = new LoginController(service);
    
    router.post('/',(req:Request,res:Response)=>controller.Login(req,res));

    return router;
}