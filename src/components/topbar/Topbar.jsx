import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import classes from "./topbar.module.scss";
import { CiSearch } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

function Topbar() {
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  return (
    <>
      <header className={classes.container}>
        <div className={classes.menuIcon}>
          <div
            className={classes.menuicon}
            onClick={() => setIsSideBarActive(!isSideBarActive)}
          >
            {!isSideBarActive ? (
              <CiMenuBurger size={28} />
            ) : (
              <IoCloseSharp size={28} />
            )}
          </div>
        </div>
        <div className={classes.brand}>ECom</div>
        <div className={classes.navigation}>
          <nav className={classes.nav}>
            <a>Home</a>
            <a>Contact</a>
            <a>About</a>
            <a>Signup</a>
          </nav>
        </div>
        <div className={classes.inputContainer}>
          <input placeholder="what are you looking for?" type="text" />
          <CiSearch size={20} />
        </div>
        <div className={classes.orders}>
          <CiHeart size={30} className={classes.icon} />
          <CiShoppingCart size={30} className={classes.icon} />
        </div>
      </header>
      <hr />
    </>
  );
}

export default Topbar;
