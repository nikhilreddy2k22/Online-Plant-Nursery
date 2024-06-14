import styles from "./login.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../reducers/user.js";

export default function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message1, setMessage] = useState("");
  const { message, isAuthenticated } = useSelector((store) => {
    return store.user;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    let msg = validate(name, username, password);
    if (msg.length === 0) {
      dispatch(register(name, username, password));
    } else {
      setMessage(msg);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    setMessage(message);
  }, [message, isAuthenticated, navigate]);

  return (
    <div className={styles.outerbox}>
      <div className={styles.box}>
        <img
          className={styles.logoImg}
          src="../../.././data/logo.jpg"
          alt="logo"
        />
        <h3>Sign Up</h3>

        <form className={styles.loginContainer} onSubmit={submit}>
          <input
            value={name}
            name="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={username}
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            value={password}
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {message1.length > 0 && <p>{message1}</p>}
          <button type="submit" onClick={submit}>
            CREATE ACCOUNT
          </button>
        </form>
        <footer className={styles.footerLogin}>
          <p>
            Already have an account?{" "}
            <Link to="/signin" className={styles.loginLink}>
              Sign in
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

function validate(name, username, password) {
  if (name.length <= 4) {
    return "Name must contain atleast 4 characters";
  }
  if (username.length === 0) {
    return "Enter UserName!";
  } else if (password.length === 0) {
    return "Enter Password!";
  } else if (!validateEmail(username)) {
    return "Enter Valid Email!";
  } else if (!validatePassword(password)) {
    return "Enter Strong Password!";
  }
  return "";
}
function validateEmail(email) {
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailPattern.test(email)) {
    return false;
  }
  return true;
}
function validatePassword(password) {
  const minLength = 8;
  // const passwordPattern =
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{minLength,}$/;
  // if (password.length < minLength || !passwordPattern.test(password)) {
  //   return false;
  // }
  if (password.length < minLength) return false;
  return true;
}
