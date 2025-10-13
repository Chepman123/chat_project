import { Router,Request,Response } from "express";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import LoginContoller from "../../Controlers/LoginSystem/login";
import LoginService from "../../Services/LoginService";

export default (db:Connection)=>{
    const router = Router();
    
    const service:LoginService = new LoginService(db);
    const controller:LoginContoller = new LoginContoller(service);
    
    router.post('/',(req:Request,res:Response)=>controller.Login(req,res));

    return router;
}