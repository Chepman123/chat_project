import { Link } from "react-router-dom";
import classes from './Contact.module.css';
type ContactProps = {
    contact: { username: string };
}


export default function Contact({
    contact,
    setDisplay
}: ContactProps & {
    setDisplay?: (display: boolean) => void;
}) {
    return ( <div className={classes.contactCard}>
      <Link to={`/chat/${contact.username}`} className={classes.link} onClick={()=>setDisplay?setDisplay(false):''}>
        <img src="../../../public/profile.png" alt="Profile" className={classes.avatar} />
        <h2 className={classes.username}>{contact.username}</h2>
      </Link>
    </div>);
}
