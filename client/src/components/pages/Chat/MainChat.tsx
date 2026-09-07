import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Contacts from '../../Contacts/Contacts';
import { getMessages, SendMessage } from './MainChatRestFunctions';
import { useParams } from 'react-router-dom';
import classes from './MainChat.module.scss';
import Message from '../../Message/Message';
import ScrollToDown from '../../ScrollToDown';


export default function MainChat() {
    const[displayContacts,setDisplay] = useState<boolean>(true);
    const[isMobile,setMobile] = useState<boolean>(false);
    const [contacts, setContacts] = useState<any[]>([]);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<any[]>([]);
    const [file,setFile] = useState<null|File|string>();
    const { login } = useParams();
    const [chat, setChat] = useState<number>(9);

    const [currentPage, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const previousHeight = useRef<number>(0);
    const previousScroll = useRef<number>(0);
    const firstLoad = useRef<boolean>(true);

    function changeMessage(event: ChangeEvent<HTMLInputElement>): void {
        setMessage(event.target.value);
    }
useEffect(()=>{
       const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
       setMobile(isMobile);
   },[]);
    useEffect(() => {
        setMessages([]);
        setHasMore(true);
        firstLoad.current = true;
    }, [login]);

    useEffect(() => {
        if (!hasMore) return;
        Fetch();
    }, [currentPage]);

    async function Fetch() {
        previousHeight.current = document.documentElement.scrollHeight;
        previousScroll.current = window.scrollY;
           
            const count = await getMessages(
                setContacts,
                setChat,
                setMessages,
                typeof login === 'string' ? login : '',
                Number(currentPage)
            );

            if (Number(count) < 20) {
                setHasMore(false);
            }
       
    }

    useEffect(() => {
    if (messages.length === 0) return;

    if (firstLoad.current) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                firstLoad.current = false;

                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'instant'
                });
            });
        });

        return;
    }

    if (Number(currentPage) > 1) {
        requestAnimationFrame(() => {
            const newHeight = document.documentElement.scrollHeight;
            const difference = newHeight - previousHeight.current;

            window.scrollTo({
                top: previousScroll.current + difference,
                behavior: 'instant'
            });
        });
    }
}, [messages, currentPage]);

    function ScrollHandler() {
        if (
            window.scrollY < 100 &&
            hasMore
        ) {
            setPage(prev => prev + 1);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', ScrollHandler);

        return () => {
            document.removeEventListener('scroll', ScrollHandler);
        };
    }, [hasMore]);

    return (
        <div>
            <ScrollToDown />

            <Contacts contacts={contacts} display={isMobile?displayContacts:true} setDisplay={setDisplay}/>

            <div className={classes.profile}>
                <button className={classes.back} onClick={()=>setDisplay(true)}>{'<'}</button>
                <img src="../../../public/profile.png" alt="Profile" />
                <h2>{login}</h2>
            </div>

            <form className={classes.form}>
                {messages.map((mess: any) => (
                    <Message
                        key={mess.id}
                        mess={mess}
                    />
                ))}
            </form>

            <div className={classes.inputsDiv}>
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={changeMessage}
                />
                 <label htmlFor='file' className={classes.label}>📎</label>
                 <input id="file" className={classes.input} type="file" style={{display:'none'}} onChange={((e)=>{
        const result = e.target.files?.[0]? e.target.files?.[0]:null;
        setFile(result)
    })}/>
                <button
                    className={classes.button}
                    type="button"
                    onClick={() =>
                        SendMessage(
                            message,
                            chat,
                            setContacts,
                            setChat,
                            setMessages,
                            typeof login === 'string' ? login : '',
                            setMessage,
                            file!,
                            setFile
                        )
                    }
                >
                    Send
                </button>
                {file&&
                <div className={classes.imageDiv}>
                <button onClick={()=>setFile(null)}>X</button>
            <img src={URL.createObjectURL(file as File)}/>
            </div>
            }
            </div>
            
        </div>
    );
}