import { useEffect, useState } from "react";
import Contacts from "../../Contacts/Contacts";
import { getContacts } from "../Chat/MainChatRestFunctions";
import classes from './ContactsPage.module.css';

export default function ContactsPage(){
    const [contacts,setContacts] = useState<any[]>([]);

    useEffect(()=>{
          getContacts(setContacts);
      },[])
    return(<div className={classes.div}>
    <Contacts contacts={contacts}/>
    </div>)
}