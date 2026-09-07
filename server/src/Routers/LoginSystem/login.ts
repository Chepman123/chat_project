import { Router,Request,Response } from "express";
import LoginController from "../../Controlers/LoginSystem/login";
import LoginService from "../../Services/LoginService";

export default ()=>{
    const router = Router();
    
    const service:LoginService = new LoginService();
    const controller:LoginController = new LoginController(service);
    
    router.post('/',(req:Request,res:Response)=>controller.Login(req,res));

    return router;
}