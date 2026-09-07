import { QueryError } from "mysql2";
import bcrypt from 'bcrypt';
import db from '../db'
import jwt from "jsonwebtoken";

export default class RegistrationService{
  

    async Registration(password:string,login:string,date:string):Promise<{result:boolean,token:string}>{
        const hashedPassword:string = await bcrypt.hash(password,10);
        if(await this.loginIsUsed(login)) return {result:false,token:''};

       const sql:string = `INSERT INTO users(username,password,birthday) VALUES($1,$2,$3)`;

       await db.query(sql,[login,hashedPassword,date]);

       this.createChatId();

       const token:string = jwt.sign({login:login},process.env.SECRET!);

       return {result:true,token:token};
   }

     async createChatId() {
        let sql:string = `SELECT id FROM users`;
        const result = (await db.query(sql)).rows;

        sql = `INSERT INTO chats( FirstuserId, SeconduserId) VALUES ($1,$2)`;
            for(let i=0;i<result.length-1;i++){
               
               await db.query(sql,[result[result.length-1].id,result[i].id]);
            }
                
    }
    async loginIsUsed(login: string): Promise<boolean> {
     
    const sql = `SELECT * FROM users WHERE username = $1`;

    const rows= (await db.query(sql,[login])).rows;

    return rows.length > 0;
}
}