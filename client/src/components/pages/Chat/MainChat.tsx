import { useEffect, useState, type ChangeEvent } from 'react';
import Contacts from '../../Contacts/Contacts';
import {getMessages,SendMessage} from './MainChatRestFunctions'
import { useParams } from 'react-router-dom';

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
    <Contacts contacts={contacts}/>
  <form>
      {
      messages.map((mess:any)=>{
        return(
        <>
        <h2>{mess.content}</h2>
        <p>{mess.hour}:{mess.minute}</p>
        <p>{mess.username}</p>
        </>)
      })}
      <input type='text' value={message} onChange={changeMessage}/>
      <button type="button" onClick={()=>SendMessage(message,chat)}>Send</button>
    </form>
    </div>)
}