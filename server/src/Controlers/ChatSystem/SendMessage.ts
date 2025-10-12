import { Request,Response } from "express";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

export default (req:Request,res:Response,db:Connection)=>{
   let selectSql = 'SELECT id FROM users WHERE username = ?';
db.query(selectSql, [req.body.username], (error, result: any) => {
    const idUser = result[0].id;

    const insertSql = 'INSERT INTO messages(chat_id, sender_id, content) VALUES (?,?,?)';
    db.query(insertSql, [req.body.chatId, idUser, req.body.Message]);
});

}