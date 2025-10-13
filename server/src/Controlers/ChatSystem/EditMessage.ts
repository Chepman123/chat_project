import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { Request,Response } from "express";
export default (req:Request,res:Response,db:Connection)=>{
    const sql:string = 'UPDATE messages SET content=? WHERE id = ?';
    db.query(sql,[req.body.content,req.body.id]);
}