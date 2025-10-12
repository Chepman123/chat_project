import { getCookie } from "../../utils/cookies";
import Contact from "./Contact";
import classes from './Contacts.module.css';

type ContactsProps = {
    contacts: { username: string }[];
}

export default function Contacts({ contacts }: ContactsProps) {
    return (
        <div className={classes.div}>
            {contacts.map((contact, index) => (
                contact.username!=getCookie('user') &&
                <Contact key={index} contact={contact} />
            ))}
        </div>
    );
}
