import { Connection } from "mysql2/typings/mysql/lib/Connection";

export default class ContactsService{
    constructor(private db:Connection){}
    GetContacts(login:unknown):Promise<any>{
         const sql:string = `SELECT username FROM users WHERE username != ?`;

         return new Promise((resolve,reject)=>{
              this.db.query(sql,[login],(error,result:any[])=>{
               if(error) reject(error);
           resolve(result);
    })
         })
    }
}