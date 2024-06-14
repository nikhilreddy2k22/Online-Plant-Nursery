import "./header.css";
import { useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../reducers/user.js";
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignout() {
    console.log("logout");
    dispatch(logout());
    navigate("/signin");
  }
  return (
    <>
      <nav className="container1">
        <div className="logo">
          <img src="data/main-logo.png" alt="logo" />
        </div>

        <div className="ul-container">
          <p>PLANTS</p>
          <p>POTS & PLANTERS</p>
          <p>PLANT CARE</p>
          <p>BLOG</p>
        </div>
        <form className="searchbox1">
          <input name="search" type="text" placeholder="Search" />
          <div className="p-icons" areahidden="true">
            <CiSearch size={30} />
          </div>
        </form>
        <div className="icons1">
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
      </nav>
      <img
        src="data/houseplants.jpg"
        alt="home_image"
        className="main-image1"
      />
    </>
  );
}
