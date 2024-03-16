import React, { useEffect, useState } from "react";
import classes from "./login.module.scss";
import loginweb from "../../assets/loginweb.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin, userSelector } from "../../redux/slices/userSlice";
import Loading from "../../components/loading/Loading";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { BiSolidHandUp } from "react-icons/bi";
import formValidator from "../../utils/formValidators/login";

function Login() {
  const userDispatch = useDispatch();
  const { loading, error, user } = userSelector();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.success === false) {
      setOpen(true);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidator(formData, setFormError)) {
      setFormError({});
      userDispatch(signin(formData))
        .then((res) => {
          if (res.payload.success) {
            navigate("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
              <br />
              {formError.email && (
                <span className={classes.error}>
                  {formError.email} <BiSolidHandUp />
                </span>
              )}
            </div>
            <div
              style={{ marginBottom: "25px" }}
              className={classes.inputContainer}
            >
              <input
                onChange={handleChange}
                value={formData.password}
                placeholder="Password"
                type="password"
                id="password"
              />
              <br />
              {formError.password && (
                <span className={classes.error}>
                  {formError.password} <BiSolidHandUp />
                </span>
              )}
            </div>
            <div className={classes.btnContainer}>
              <button disabled={loading} className={classes.btn}>
                {loading ? <CircularProgress /> : "Login"}
              </button>
            </div>
            <div className={classes.forgot}>
              <p>Forgot Password?</p>
            </div>
            <div className={classes.btnContainer}>
              <Link to="/register">
                <button
                  disabled={loading}
                  type="button"
                  className={`${classes.btn} ${classes.regBtn}`}
                >
                  Create an account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={user.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={user.success === false ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {user.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
