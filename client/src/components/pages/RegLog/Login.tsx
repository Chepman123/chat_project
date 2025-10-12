import { useState, type ChangeEvent } from 'react';
import classes from './RegLog.module.css';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../../utils/cookies';
export default function Login(){
    const navigate = useNavigate();
    const [status,setStauts] = useState<boolean>(true);
    const [login,setLogin] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    function getLogin(event:ChangeEvent<HTMLInputElement>){
        setLogin(event.target.value);
    }
    function getPassword(event:ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }
    async function LogIn() {
        const response = await fetch('http://localhost:5000/login',
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    login:login,
                    password:password
                })
            }
        )
        const result:boolean = await response.json();
        setStauts(result);
        if(result){
             setCookie('user', login);;
             navigate('/chat');
        }
    }
    return(
        <div className={classes.div}>
    <form>
        <h1>Log in</h1>
        <input type='text' placeholder='login' value={login} onChange={getLogin}/>
        <input type='password' placeholder='password' value={password} onChange={getPassword}/>
        {!status &&
          <h2>Неправильний пароль чи логін</h2>
        }
        <button onClick={LogIn} type='button'>Log in</button>
    </form>
    </div>
    )
}