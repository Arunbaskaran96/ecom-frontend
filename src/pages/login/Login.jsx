import React, { useState } from "react";
import classes from "./login.module.scss";
import loginweb from "../../assets/loginweb.jpg";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <img className={classes.image} src={loginweb} alt="login_image" />
      </div>
      <div className={classes.right}>
        <div className={classes.rightContainer}>
          <h3>Log in to Exclusive</h3>
          <p>Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <div className={classes.inputContainer}>
              <input
                onChange={handleChange}
                value={formData.email}
                placeholder="Email"
                type="email"
                id="email"
              />
            </div>
            <div className={classes.inputContainer}>
              <input
                onChange={handleChange}
                value={formData.password}
                placeholder="Password"
                type="password"
                id="password"
              />
            </div>
            <div className={classes.btnContainer}>
              <button className={classes.btn}>Login</button>
            </div>
            <div className={classes.forgot}>
              <p>Forgot Password?</p>
            </div>
            <div className={classes.btnContainer}>
              <Link to="/register">
                <button className={`${classes.btn} ${classes.regBtn}`}>
                  Create an account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
