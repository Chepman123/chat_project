import { getCookie } from '../../../utils/cookies';
export async function SendMessage(message:string,chatId:number) {

    fetch('http://localhost:5000/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        username: getCookie('user'),
        Message:message,
        chatId:chatId
      })
    })
  }
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