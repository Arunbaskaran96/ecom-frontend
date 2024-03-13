import React, { useState } from "react";
import "./app.css";
import "./hello.scss";
import image from "./profile2.jpg";
import down from "./down.svg";
import classes from "./app.module.scss";
function App() {
  const [count, setCount] = useState(0);
  return (
    <header>
      <div className="container">App</div>
      <p className="line">hello world</p>
      <h5>this is h5 asd</h5>
      <p>new tag</p>
      <button className={classes.button} onClick={() => setCount(count + 1)}>
        Count - {count}
      </button>
      <img src={image} alt="profile" />
      <img src={down} alt="profile" />
    </header>
  );
}

export default App;
