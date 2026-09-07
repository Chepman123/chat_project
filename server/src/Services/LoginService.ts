import { QueryError, RowDataPacket } from "mysql2";
import bcrypt from 'bcrypt';
import db from '../db'
import jwt from 'jsonwebtoken';

export default class LoginService{
    async login(name:string,password:string):Promise<{result:boolean,token:string}>{
          const sql:string = `SELECT password FROM users WHERE username = $1`;
            const result = (await db.query(sql,[name])).rows;
            if(result.length==0) return {result:false,token:''};

            const matched:boolean = await bcrypt.compare(password,result[0].password);
            const token:string = jwt.sign({login:name},process.env.SECRET!);
            return {result:matched,token:token};
    }
}