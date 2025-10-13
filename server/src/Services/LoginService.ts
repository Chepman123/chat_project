import { QueryError, RowDataPacket } from "mysql2";
import bcrypt from 'bcrypt';
import { Connection } from "mysql2/typings/mysql/lib/Connection";

interface passwords extends RowDataPacket{
    password:string
}

export default class LoginService{
    constructor(private db:Connection){}
    async login(name:string,password:string):Promise<boolean>{
          const sql:string = `SELECT password FROM users WHERE username = ?`;

          return new Promise<boolean>((resolve,reject)=>{
            this.db.query(sql,[name],async(error:QueryError|null,result:passwords[])=>{
              if(error)throw(error);
              if(result.length==0)
              { 
                return reject(error);
              }
              try{
              const matched:boolean = await bcrypt.compare(password,result[0].password)
              
              return resolve(matched);
              }
              catch(error:unknown){
                 console.log(error);
                 return reject(error);
              }
           });
          })

    }
}