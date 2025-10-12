import { Request,Response } from "express";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import bcrypt from 'bcrypt';

export default (req:Request,res:Response,db:Connection)=>{
   const sql:string = `SELECT password FROM users WHERE username = '${req.body.login}'`;
   db.query(sql,async(error:Error,result:any)=>{
      if(result.length==0)
      { 
        res.json(false);
        return;
      }
      const matched:boolean = await bcrypt.compare(req.body.password,result[0].password)
      
      res.json(matched);
   });
}