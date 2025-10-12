import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { Router,Request,Response } from "express";
import GetContacts from "../Controlers/ChatSystem/GetContacts";

export default (db:Connection)=>{
  const router = Router();

  router.get('/',(req:Request,res:Response)=>{
    GetContacts(req,res,db);
  });

  return router;
}