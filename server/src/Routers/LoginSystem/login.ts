import { Router,Request,Response } from "express";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import func from '../../Controlers/LoginSystem/login'

export default (db:Connection)=>{
    const router = Router();

    router.post('/',(req:Request,res:Response)=>{func(req,res,db)});

    return router;
}