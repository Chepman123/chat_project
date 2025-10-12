import { Link } from "react-router-dom";

type ContactProps = {
    contact: { username: string };
}

export default function Contact({ contact }: ContactProps) {

    return <Link to={"/chat/"+contact.username}>{contact.username}</Link>;
}
