import express,{ Router,Request,Response } from "express";
import func from '../../Controlers/LoginSystem/registration'
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import RegistrationContoller from "../../Controlers/LoginSystem/registration";
import RegistrationService from "../../Services/RegistrationService";

export default (db:Connection)=>{
    const router = Router();
    const serv:RegistrationService = new RegistrationService(db);
    const reg:RegistrationContoller = new RegistrationContoller(serv);

    router.post('/',(req:Request,res:Response)=>{reg.Registration(req,res)})

    return router;
}