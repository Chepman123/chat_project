import bcrypt from 'bcrypt';
import { Request,Response } from 'express';
import { QueryError } from 'mysql2';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';



export default async function(req:Request,res:Response,db:Connection){
    const hashedPassword:string = await bcrypt.hash(req.body.Password,10);

      if(await loginIsUsed(req.body.Login,db)){
        res.json(false);
        return;
      }

       const sql:string = `INSERT INTO users(username,password,birthday) VALUES(?,?,?)`;
       await db.query(sql,[req.body.Login,hashedPassword,req.body.date],()=>{
        res.json(true);
       });
       createChatId(db);
}
async function createChatId(db:Connection) {
    let sql:string = `SELECT id FROM users`;
    db.query(sql,(error:Error,result:any)=>{
        for(let i=0;i<result.length-1;i++){
           sql = `INSERT INTO chats( FirstuserId, SeconduserId) VALUES (?,?)`;
           db.query(sql,[result[result.length-1].id,result[i].id]);
        }
    })
}

async function loginIsUsed(login: string, db: Connection): Promise<boolean> {
    const sql = `SELECT * FROM users WHERE username = ?`;

    const rows: any[] = await new Promise((resolve, reject) => {
        db.query(sql, [login], (error: QueryError | null, result: any[]) => {
            if (error) reject(error);
            else resolve(result);
        });
    });

    console.log(rows);
    return rows.length > 0;
}
