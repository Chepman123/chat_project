import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { Request,Response } from "express";
import ContactsService from "../../Services/ContactsService";
export default class ContactsController{
    constructor(private serv:ContactsService){}
    async GetContacts(req:Request,res:Response,db:Connection){
   
    try{
    res.json(await this.serv.GetContacts(req.query.user1));
    }
    catch(error){
        res.status(500).json({error:error});
    }
}
}