import { Router,Request,Response } from "express";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import ChatService from "../Services/ChatService";
import MessagesController from "../Controlers/Messages";

export default (db:Connection)=>{
    const router = Router(); 

    const serv:ChatService = new ChatService(db);
    const contr:MessagesController = new MessagesController(serv);

     router.get('/',(req:Request,res:Response)=>{contr.GetMessages(req,res)});
     router.post('/',(req:Request,res:Response)=>{contr.SendMessage(req,res)});
     router.delete('/',(req:Request,res:Response)=>{contr.DeleteMessage(req,res)});
     router.put('/',(req:Request,res:Response)=>{contr.EditMessage(req,res)});

    return router;
}