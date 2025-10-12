import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { Request,Response } from "express";
export default function GetContacts(req:Request,res:Response,db:Connection){
    const sql:string = `SELECT username FROM users WHERE username != ?`;
    db.query(sql,[req.query.user1],(error,result:any[])=>{
        res.json(result);
    })
}