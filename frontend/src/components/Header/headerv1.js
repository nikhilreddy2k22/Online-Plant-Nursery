// import { useState, useEffect } from "react";

// export default function Navbar() {
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div>
//       <p>Screen width: {screenWidth}px</p>
//     </div>
//   );
// }

import "./headerv1.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { FaAlignJustify } from "react-icons/fa";
import { useState } from "react";
import { logout } from "../../reducers/user.js";
export default function Header1() {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function toggle() {
    setSidebar(!sidebar);
  }

  function handleSignout() {
    console.log("logout");
    dispatch(logout());
    navigate("/signin");
  }
  return (
    <>
      <nav className="container">
        <div className="inner-container">
          <div className="navbar-icon" onClick={() => toggle()}>
            <FaAlignJustify size={30} />
          </div>
          <div className="logo">
            <img src="data/main-logo.png" alt="logo" />
          </div>

          {/* <div className="ul-container">
            <p>PLANTS</p>
            <p>POTS & PLANTERS</p>
            <p>PLANT CARE</p>
            <p>BLOG</p>
          </div> */}
          <div className="icons">
            <div className="d-icons">
              {/* <Link to="/signin" style={{ color: "white" }}>
                <RiAccountCircleLine size={30} />
              </Link> */}
              <RiAccountCircleLine size={30} onClick={handleSignout} />
            </div>
            <div className="d-icons" size={30}>
              <Link to="/cart" style={{ color: "white" }}>
                <FaShoppingCart size={30} />
              </Link>
            </div>
          </div>
        </div>
        <form className="searchbox">
          <input name="search" type="text" placeholder="Search" />
          <div className="p-icons" areahidden="true">
            <CiSearch size={30} />
          </div>
        </form>
      </nav>
      <img src="data/houseplants.jpg" alt="home_image" className="main-image" />
      {sidebar && (
        <div className="sidebar-main-container">
          <Sidebar />
        </div>
      )}
    </>
  );
}

function Sidebar() {
  return (
    <div className="sidebar-container">
      <p>PLANTS</p>
      <p>POTS & PLANTERS</p>
      <p>PLANT CARE</p>
      <p>BLOG</p>
    </div>
  );
}
