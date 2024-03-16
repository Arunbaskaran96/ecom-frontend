import React from "react";
import classes from "./loading.module.scss";

function Loading() {
  return (
    <div className={classes.container}>
      <div className={classes.loading}></div>
    </div>
  );
}

export default Loading;
