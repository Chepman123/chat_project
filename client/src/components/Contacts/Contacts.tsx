import { getCookie } from "../../utils/cookies";
import Contact from "./Contact";
import classes from './Contacts.module.css';

type ContactsProps = {
    username: string;
}[];

export default function Contacts({ contacts,display,setDisplay}: {contacts:ContactsProps,display:boolean,setDisplay?:(display:boolean)=>void}) {
    return (
        <div className={classes.div} style={{ display: display ? 'block' : 'none' }}>
            {contacts.map((contact, index) => (
                contact.username!=getCookie('user') &&
                <Contact key={index} contact={contact} setDisplay={setDisplay}/>
            ))}
        </div>
    );
}
