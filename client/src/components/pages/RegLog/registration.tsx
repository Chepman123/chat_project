import { useState, type ChangeEvent } from 'react';
import classes from './RegLog.module.css';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../../utils/cookies';
export default function Registration(){
    const navigate = useNavigate();
    const [login,setLogin]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [passwordAgain,setPasswordAgain] = useState<string>('');
    const [date,setDate] = useState<string>();
    const [status,setStatus] = useState<boolean>(true);
    function getLogin(event:ChangeEvent<HTMLInputElement>){
        setLogin(event.target.value);
    }
    function getPassword(event:ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }
    function getPasswordAgain(event:ChangeEvent<HTMLInputElement>){
       setPasswordAgain(event.target.value);
    }
    function getDate(event:ChangeEvent<HTMLInputElement>){
       setDate(event.target.value);
    }
    async function createAccount(){
        if(password!=passwordAgain||login==''||password==''||date=='') {
            setStatus(false);
            return;
        }
        const response = await fetch('http://localhost:5000/registration',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                Login:login,
                Password:password,
                date:date
            })
        })
        setCookie('user', login);
        if(await response.json()) navigate('/chat');
    }
    return (
        <div className={classes.div}>
        <form>
            <h1>Registration</h1>
            <input type='text' placeholder='login' value={login} onChange={getLogin} required/>
            <input type='password' placeholder='password' value={password} onChange={getPassword} required/>
            <input type='password' placeholder='repeat password' value={passwordAgain} onChange={getPasswordAgain} required/>
            <input type='date' placeholder='repeat password' value={date} onChange={getDate} required/>
            {!status &&
             <h2>Ти неправильно заповнив форму</h2>
            }
            <button onClick={createAccount} type='button'>Create account</button>
        </form>
        </div>
    )
}