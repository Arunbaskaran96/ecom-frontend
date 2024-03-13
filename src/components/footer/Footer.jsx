import React from "react";
import classes from "./footer.module.scss";
import brandImg from "../../assets/brandLogo.jpg";
import playStore from "../../assets/playstore.svg";
import appstore from "../../assets/apple.svg";
import { FaApple } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

function Footer() {
  return (
    <div className={classes.container}>
      <div>
        <img className={classes.brandlogo} src={brandImg} alt="brandImg" />
      </div>
      <div className={classes.supportContainer}>
        <div>
          <p>111 Bijoy sarani, Dhaka, DH 1515,</p>
          <p>Bangladesh.</p>
        </div>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>
      <div className={classes.accountContainer}>
        <p>My Account</p>
        <p>Cart</p>
        <p>Whishlist</p>
        <p>Shop</p>
      </div>
      <div className={classes.storeContainer}>
        <div>
          <h4>Download App</h4>
          <div className={classes.iconContainer}>
            <FaPlay size={30} />
            <div>
              <h4>Google Play</h4>
            </div>
          </div>
          <div className={classes.iconContainer}>
            <FaApple size={30} />
            <div>
              <h4>App Store</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
