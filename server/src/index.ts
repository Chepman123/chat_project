import express,{Request,Response} from 'express';
import cors from 'cors';
import registration from './Routers/LoginSystem/registration';
import login from './Routers/LoginSystem/login';
import chat from './Routers/Chat';
import con from './Routers/Contacts';
import db from './db';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/registration',registration(db));
app.use('/login',login(db));
app.use('/chat',chat(db));
app.use('/contacts',con(db));

app.listen(5000);