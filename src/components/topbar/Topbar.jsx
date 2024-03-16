import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import classes from "./topbar.module.scss";
import { CiSearch } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { userSelector } from "../../redux/slices/userSlice";

function Topbar() {
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const { cartCount } = userSelector();

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
            <Link to="/">
              <p>Home</p>
            </Link>
            <Link to="/products">
              <p>Products</p>
            </Link>
            <p>About</p>
            <p>Signup</p>
          </nav>
        </div>
        <div className={classes.inputContainer}>
          <input placeholder="what are you looking for?" type="text" />
          <CiSearch size={20} />
        </div>
        <div className={classes.orders}>
          <div className={classes.heartIconContainer}>
            <CiHeart size={33} className={classes.icon} />
            <span>1</span>
          </div>
          <Link to="/cart">
            <div className={classes.cartIconContainer}>
              <CiShoppingCart
                color="black"
                size={33}
                className={classes.icon}
              />
              {cartCount && <span>{cartCount}</span>}
            </div>
          </Link>
        </div>
      </header>
      <hr />
    </>
  );
}

export default Topbar;
