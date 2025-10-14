import { QueryError } from "mysql2";
import bcrypt from 'bcrypt';
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { Request, Response } from "express";

export default class RegistrationService{
    constructor(private db:Connection){}

    async Registration(password:string,login:string,date:string):Promise<boolean>{
        const hashedPassword:string = await bcrypt.hash(password,10);

        if(await this.loginIsUsed(login)) return(false);

       const sql:string = `INSERT INTO users(username,password,birthday) VALUES(?,?,?)`;

       await new Promise<void>((resolve,reject)=>{
         this.db.query(sql,[login,hashedPassword,date],async(error:QueryError|null,result:any)=>{
            if(error){
                console.log(error);
                reject(error);
            }
           resolve();
       });
       });
       this.createChatId();
       return(true);
   }

     async createChatId() {
        let sql:string = `SELECT id FROM users`;
        await new Promise<void>((resolve,reject)=>{
         this.db.query(sql,(error:Error,result:any)=>{
            sql = `INSERT INTO chats( FirstuserId, SeconduserId) VALUES (?,?)`;
            for(let i=0;i<result.length-1;i++){
               
               this.db.query(sql,[result[result.length-1].id,result[i].id],(error:QueryError|null,result:any)=>{
                if(error){
                    console.log(error);
                    reject(error);
                }
               });
            }
            resolve();
        })   
        });
         
    }
    async loginIsUsed(login: string): Promise<boolean> {
    const sql = `SELECT * FROM users WHERE username = ?`;

    const rows: any[] = await new Promise((resolve, reject) => {
        this.db.query(sql, [login], (error: QueryError | null, result: any[]) => {
            if (error) reject(error);
            else resolve(result);
        });
    });

    return rows.length > 0;
}
}