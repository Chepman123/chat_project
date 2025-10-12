import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from './components/pages/RegLog/registration';
import MainChat from "./components/pages/Chat/MainChat";
import Login from "./components/pages/RegLog/Login";
import Main from "./components/pages/Main/Main";
function App() {

 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/registration" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/chat/:login" element={<MainChat/>}/>
      <Route path="/" element={<Main/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
