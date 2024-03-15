import React from "react";
import XSwipper from "../../components/ui/swipper/XSwipper";
import Category from "../../components/home/category/Category";
import classes from "./home.module.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <XSwipper />
      <div>
        <Link to="/cart">
          <button>View Products</button>
        </Link>
      </div>
      <div className={classes.categoryContainer}>
        <h2 className={classes.text}>Browse By Category</h2>
        <Category />
      </div>
    </div>
  );
}

export default Home;
