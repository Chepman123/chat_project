import { getCookie } from "../../utils/cookies";
import Contact from "./Contact";

type ContactsProps = {
    contacts: { username: string }[];
}

export default function Contacts({ contacts }: ContactsProps) {
    return (
        <>
            {contacts.map((contact, index) => (
                contact.username!=getCookie('user') &&
                <Contact key={index} contact={contact} />
            ))}
        </>
    );
}
