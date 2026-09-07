import { getCookie } from '../../../utils/cookies';
import MainChat from './MainChat'

//SendMessage
let fileData: string | null = null;
export async function SendMessage(message:string,chatId:number, setContacts: (contacts: any[]) => void,
  setChat: (chatId: number) => void,
  setMessages: (messages: any) => void,
  secondLogin:string,
 setMessage: (message: string) => void,
image:null|string|File ,
 setFile:(file:File|string|null)=>void)
 {
    if(image == null && message == "") return;
    if (image instanceof File) {
    fileData = await new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(null);
      reader.readAsDataURL(image);
    });
  }
    await fetch('http://localhost:5000/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        username: getCookie('user'),
        Message:message,
        chatId:chatId,
        image:fileData
      }),
      credentials:'include'
    })
  
    setMessage('');
    setFile(null);
    getMessages(setContacts,setChat,setMessages,secondLogin,1);
  }


//GetMessages
export async function getMessages(
  setContacts: (contacts: any[]) => void,
  setChat: (chatId: number) => void,
  setMessages: (messages: any) => void,
  secondLogin:string,
  currentPage:number,
) {
    if(secondLogin=='')return
    const firstLogin = getCookie('user');
  const response = await fetch(`http://localhost:5000/chat?user1=${firstLogin}&user2=${secondLogin}&page=${currentPage}`,{method:'GET',credentials:'include'});
  const data = await response.json();
  setContacts(data.contacts);
  const messages = [...data.messages].reverse();
if(currentPage == 1){
setMessages(messages);
}
else setMessages((prev: any[]) => [
    ...messages,
    ...prev
]);
  setChat(data.chatId);
}


//GetContacts
export async function getContacts(setContacts: (contacts: any[]) => void){
    const firstLogin = getCookie('user');
  const response = await fetch(`http://localhost:5000/contacts?user1=${firstLogin}`,{method:'GET',credentials:'include'});
  const data = await response.json();
  
  setContacts(data);
}