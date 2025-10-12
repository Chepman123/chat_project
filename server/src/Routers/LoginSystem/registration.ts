import express,{ Router,Request,Response } from "express";
import func from '../../Controlers/LoginSystem/registration'
import { Connection } from "mysql2/typings/mysql/lib/Connection";

export default (db:Connection)=>{
    const router = Router();

    router.post('/',(req:Request,res:Response)=>{func(req,res,db)})

    return router;
}