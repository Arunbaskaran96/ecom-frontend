import React from "react";
import XSwipper from "../../components/ui/swipper/XSwipper";
import Category from "../../components/home/category/Category";
import classes from "./home.module.scss";

function Home() {
  return (
    <div>
      <XSwipper />
      <div className={classes.categoryContainer}>
        <h2 className={classes.text}>Browse By Category</h2>
        <Category />
      </div>
    </div>
  );
}

export default Home;
