import express,{ Router,Request,Response } from "express";
import func from '../../Controlers/LoginSystem/registration'
import RegistrationContoller from "../../Controlers/LoginSystem/registration";
import RegistrationService from "../../Services/RegistrationService";
import Middleware from "../../Middleware";

export default ()=>{
    const router = Router();
    const serv:RegistrationService = new RegistrationService();
    const reg:RegistrationContoller = new RegistrationContoller(serv);

    router.post('/',Middleware,(req:Request,res:Response)=>{reg.Registration(req,res)})

    return router;
}