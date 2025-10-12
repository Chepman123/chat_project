import express,{Request,Response} from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import registration from './Routers/LoginSystem/registration';
import login from './Routers/LoginSystem/login';
import chat from './Routers/Chat';
import db from './db';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/registration',registration(db));
app.use('/login',login(db));
app.use('/chat',chat(db));

app.listen(5000);