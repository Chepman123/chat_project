import { useState, useRef, useEffect, type CSSProperties, type ChangeEvent } from 'react';
import classes from './Message.module.css';
import { getCookie } from '../../utils/cookies';
import ButtonsWindow from './ButtonsWindow';

export default function Message({ mess}: { mess: any}) {
    const [opened, setWindow] = useState<boolean>(false);
    const windowRef = useRef<HTMLDivElement>(null);
    const [showInput,setInput] = useState<boolean>(false);
    const [content,setContent] = useState<string>(mess.content);
    function startEdit():void{
        setWindow(false);
         setInput(true);
    }

    function openWindow() {
        setWindow(!opened);
    }
    function changeText(event:ChangeEvent<HTMLInputElement>){
        setContent(event.target.value);
    }
    function setChanges(){
        fetch('http://localhost:5000/chat',{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                id:mess.id,
                content:content
            })
        });
        setInput(false);
    }
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (windowRef.current && !windowRef.current.contains(event.target as Node)) {
                setWindow(false);
            }
        }

        if (opened) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [opened]);

    return (
        <div
            className={classes.div}
            style={
                (getCookie('user') === mess.username
                    ? { justifySelf: 'end', backgroundColor: 'rgb(109, 70, 145)' }
                    : { justifySelf: 'start', backgroundColor: 'rgb(60, 33, 85)' }) as CSSProperties
            }
        >
            <div className={classes.top}>
                <p className={classes.name}>{mess.username}</p>
                <button
                    onClick={openWindow}
                    type="button"
                    className={classes.button}
                    style={
                        (getCookie('user') === mess.username
                            ? { backgroundColor: 'rgb(109, 70, 145)' }
                            : { display: 'none' }) as CSSProperties
                    }
                >
                    ︙
                </button>
            </div>
            <h2 className={classes.content} style={(!showInput?{display:'block'}:{display:'none'})}>{content}</h2>
            <div className={classes.inputClass} style={(showInput?{display:'flex'}:{display:'none'})as CSSProperties}>
                <input type='text' value={content} onChange={changeText}/>
                <button type='button' className={classes.AcceptButton} onClick={setChanges}>✔</button>
            </div>
            <p className={classes.time}>
                {mess.hour}:{mess.minute < 10 ? `0${mess.minute}` : mess.minute}
            </p>
            <div ref={windowRef}>
                <ButtonsWindow startEdit={startEdit} id={mess.id} style={(opened ? { display: 'block' } : { display: 'none' }) as CSSProperties} />
            </div>
        </div>
    );
}
