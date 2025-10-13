import type { CSSProperties } from 'react'
import classes from './ButtonsWindow.module.css'
export default function ButtonsWindow({style,id, startEdit}:{style:CSSProperties,id:number,startEdit:() => void}){

    function deleteMessage(){
      fetch('http://localhost:5000/chat',{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({id:id})
      });
    }

    return <div className={classes.div} style={style}>
    <button className={classes.button} type='button' onClick={startEdit}>Edit</button><br/>
    <button className={classes.button}  onClick={deleteMessage}>Delete</button>
    </div>
}