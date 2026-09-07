import express from 'express';
import cors from 'cors';
import registration from './Routers/LoginSystem/registration';
import login from './Routers/LoginSystem/login';
import chat from './Routers/Chat';
import con from './Routers/Contacts';
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));

app.use('/registration',registration());
app.use('/login',login());
app.use('/chat',chat());
app.use('/contacts',con());

app.listen(5000);