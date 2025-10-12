import { Link } from 'react-router-dom';
import classes from './Main.module.css';

export default function Main(){
   return(<main>
    <div className={classes.div}>
    <div className={classes.slogan}>
    <h3>Welcome to</h3>
    <h1>Perv Chat</h1>
    </div>
    <div className={classes.buttons}>
        <Link to='/login'>Log in</Link>
        <Link to='/registration'>Create account</Link>
    </div>
    </div>
   </main>)
}