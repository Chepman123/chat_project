import type { CSSProperties } from 'react';
import classes from './Message.module.css';
import { getCookie } from '../../utils/cookies';
export default function Message({mess}:{mess:any}){
    return (<div className={classes.div} style={(getCookie('user')==mess.username?
    {justifySelf:'end',backgroundColor:'rgb(109, 70, 145)'}:
    {justifySelf:'start',backgroundColor: 'rgb(60, 33, 85)'}
    )as CSSProperties}>
        <p className={classes.name}>{mess.username}</p>
        <h2 className={classes.content}>{mess.content}</h2>
        <p className={classes.time}>{mess.hour}:{mess.minute<10?`0${mess.minute}`:mess.minute}</p>
        
    </div>)
}