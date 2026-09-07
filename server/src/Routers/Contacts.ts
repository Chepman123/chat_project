import { Router,Request,Response } from "express";
import ContactsController from "../Controlers/ChatSystem/GetContacts";
import ContactsService from "../Services/ContactsService";
import Middleware from "../Middleware";

export default ()=>{
  const router = Router();

   const service:ContactsService = new ContactsService();
   const controller:ContactsController = new ContactsController(service);

  router.get('/',Middleware,(req:Request,res:Response)=>{
    controller.GetContacts(req,res,);
  });

  return router;
}