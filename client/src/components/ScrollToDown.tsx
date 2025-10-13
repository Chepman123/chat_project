import { useEffect } from "react"

export default function ScrollToDown() {
  useEffect(() => {
    const height: number = document.documentElement.scrollHeight;
     window.scrollTo(0,200);
  }, []);

  return <></>;
}
