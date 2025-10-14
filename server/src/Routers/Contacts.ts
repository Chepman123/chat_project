import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { Router,Request,Response } from "express";
import ContactsController from "../Controlers/ChatSystem/GetContacts";
import ContactsService from "../Services/ContactsService";

export default (db:Connection)=>{
  const router = Router();

   const service:ContactsService = new ContactsService(db);
   const controller:ContactsController = new ContactsController(service);

  router.get('/',(req:Request,res:Response)=>{
    controller.GetContacts(req,res,db);
  });

  return router;
}