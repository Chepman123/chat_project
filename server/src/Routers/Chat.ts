import { Router,Request,Response } from "express";
import ChatService from "../Services/ChatService";
import MessagesController from "../Controlers/Messages";
import Middleware from "../Middleware";

export default ()=>{
    const router = Router(); 

    const serv:ChatService = new ChatService();
    const contr:MessagesController = new MessagesController(serv);

     router.get('/',Middleware,(req:Request,res:Response)=>{contr.GetMessages(req,res)});
     router.post('/',(req:Request,res:Response)=>{contr.SendMessage(req,res)});
     router.delete('/',(req:Request,res:Response)=>{contr.DeleteMessage(req,res)});
     router.put('/',(req:Request,res:Response)=>{contr.EditMessage(req,res)});

    return router;
}