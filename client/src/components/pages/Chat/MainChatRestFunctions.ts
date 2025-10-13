import { getCookie } from '../../../utils/cookies';
import MainChat from './MainChat'

//SendMessage
export async function SendMessage(message:string,chatId:number, setContacts: (contacts: any[]) => void,
  setChat: (chatId: number) => void,
  setMessages: (messages: any) => void,
  secondLogin:string,
 setMessage: (message: string) => void) {

    fetch('http://localhost:5000/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        username: getCookie('user'),
        Message:message,
        chatId:chatId
      })
    })
    setMessage('');
    getMessages(setContacts,setChat,setMessages,secondLogin);
  }


//GetMessages
export async function getMessages(
  setContacts: (contacts: any[]) => void,
  setChat: (chatId: number) => void,
  setMessages: (messages: any) => void,
  secondLogin:string
) {
    if(secondLogin=='')return
    const firstLogin = getCookie('user');
  const response = await fetch(`http://localhost:5000/chat?user1=${firstLogin}&user2=${secondLogin}`);
  const data = await response.json();
  setContacts(data.contacts);
  setMessages(data.messages);
  setChat(data.chatId);
}


//GetContacts
export async function getContacts(setContacts: (contacts: any[]) => void){
    const firstLogin = getCookie('user');
  const response = await fetch(`http://localhost:5000/contacts?user1=${firstLogin}`);
  const data = await response.json();
  
  setContacts(data);
}