import db from '../db'
export default class ContactsService{
    async GetContacts(login:unknown):Promise<any[]>{
         const sql:string = `SELECT username FROM users WHERE username != $1`;
         
         return (await db.query(sql,[login])).rows;
    }
}