import React, { useState } from "react";
import classes from "./register.module.scss";
import loginweb from "../../assets/loginweb.jpg";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
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
          <h3>Create an account</h3>
          <p>Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <div className={classes.inputContainer}>
              <input
                onChange={handleChange}
                value={formData.name}
                placeholder="Name"
                type="text"
                id="name"
              />
            </div>
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
                value={formData.mobile}
                placeholder="Mobile"
                type="text"
                id="mobile"
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
              <button className={classes.btn}>Create an account</button>
            </div>
            <div className={classes.loginContainer}>
              <p>
                Already have an account ?{" "}
                <Link to="/">
                  <span>Login</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
