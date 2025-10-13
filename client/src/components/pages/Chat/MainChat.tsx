import { useEffect, useState, type ChangeEvent } from 'react';
import Contacts from '../../Contacts/Contacts';
import {getMessages,SendMessage} from './MainChatRestFunctions'
import { useParams } from 'react-router-dom';
import classes from './MainChat.module.css';
import Message from '../../Message/Message';
import ScrollToDown from '../../ScrollToDown';


export default function MainChat(){
  const [contacts,setContacts] = useState<any[]>([]);
     const[message,setMessage]=useState<string>('');
  const[messages,setMessages]=useState<any[]>([]);
  const {login} = useParams();
  const [chat,setChat] = useState<number>(9);
  
  function changeMessage(event:ChangeEvent<HTMLInputElement>):void{
     setMessage(event.target.value);
  }
  

  useEffect(()=>{
      getMessages(setContacts,setChat, setMessages,typeof login === "string"?login:'');
  },[login])

  return(
  <div>
    <ScrollToDown/>
    <Contacts contacts={contacts}/>
    <div className={classes.profile}>
      <img src="../../../public/profile.png" alt="Profile"/>
      <h2>{login}</h2>
    </div>
  <form className={classes.form}>
      {
      messages.map((mess:any)=>{
        return(
        <Message mess={mess}/>)
      })}
    </form>
    <div className={classes.inputsDiv}>
      <input type='text' placeholder='Message' value={message} onChange={changeMessage} />
      <button className={classes.button} type="button" onClick={()=>SendMessage(message,chat,setContacts,setChat, setMessages,typeof login === "string"?login:'',setMessage)}>Send</button>
      </div>
    </div>)
}