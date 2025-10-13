import { Router,Request,Response } from "express";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import SendMessage from "../Controlers/ChatSystem/SendMessage";
import GetMessages from "../Controlers/ChatSystem/GetMessages";
import DeleteMessages from "../Controlers/ChatSystem/DeleteMessage";
import EditMessage from "../Controlers/ChatSystem/EditMessage";

export default (db:Connection)=>{
    const router = Router(); 
     router.get('/',(req:Request,res:Response)=>{GetMessages(req,res,db)});
     router.post('/',(req:Request,res:Response)=>{SendMessage(req,res,db)});
     router.delete('/',(req:Request,res:Response)=>{DeleteMessages(req,res,db)});
     router.put('/',(req:Request,res:Response)=>{EditMessage(req,res,db)});

    return router;
}