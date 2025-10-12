import { Connection } from "mysql2/typings/mysql/lib/Connection";
import mysql from 'mysql2'
export default mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'chat_project'
})