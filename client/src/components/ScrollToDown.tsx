import { useEffect } from "react"

export default function ScrollToDown(){
    useEffect(()=>{
      const height:any = document.documentElement.scrollHeight;
      window.scrollTo(height);
    console.log(height);
    },[])
    return<></>
}