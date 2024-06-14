import { useEffect, useState } from "react";
import Header from "./header.js";
import Header1 from "./headerv1.js";
export default function MainHeader() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const flag = screenWidth < 1200;
  return (
    <>
      {flag && <Header1 />}
      {!flag && <Header />}
    </>
  );
}
