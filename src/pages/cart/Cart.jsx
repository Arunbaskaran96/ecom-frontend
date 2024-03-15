import React from "react";
import classes from "./cart.module.scss";
import { LuIndianRupee } from "react-icons/lu";
import masterCard from "../../assets/mastercard.svg";
import rupay from "../../assets/rupay.svg";
import apple from "../../assets/apple-pay.svg";
import visa from "../../assets/visa.svg";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = [
    {
      name: "Iphone",
      image:
        "https://m.media-amazon.com/images/I/31KxpX7Xk7L._SY445_SX342_QL70_FMwebp_.jpg",
      price: 15000,
    },
    {
      name: "Iphone",
      image:
        "https://m.media-amazon.com/images/I/31KxpX7Xk7L._SY445_SX342_QL70_FMwebp_.jpg",
      price: 15000,
    },
    {
      name: "Iphone",
      image:
        "https://m.media-amazon.com/images/I/31KxpX7Xk7L._SY445_SX342_QL70_FMwebp_.jpg",
      price: 15000,
    },
  ];
  return cartItems.length > 0 ? (
    <div className={classes.container}>
      <div className={classes.left}>
        <div>
          <h3>My Cart (3)</h3>
        </div>
        <table>
          <thead className={classes.head}>
            <tr className={classes.headRow}>
              <th>Product</th>
              <th>Quantity</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((cart) => {
                return (
                  <tr>
                    <td className={classes.prodCart}>
                      <div>
                        <img
                          className={classes.image}
                          src={cart.image}
                          alt="prodImage"
                        />
                      </div>
                      <div>
                        <p>{cart.name}</p>
                        <p>
                          <LuIndianRupee />
                          10000
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className={classes.quantityContainer}>
                        <button className={classes.quantityBtn}>-</button>
                        <span>0</span>
                        <button className={classes.quantityBtn}>+</button>
                      </div>
                    </td>
                    <td>
                      <h3>10000</h3>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className={classes.right}>
        <div className={classes.priceContainer}>
          <div className={classes.priceLeft}>
            <p>Subtotal</p>
            <p>Shipping Charges</p>
            <p>Tax</p>
          </div>
          <div className={classes.priceRight}>
            <p className={classes.subTotal}>
              <LuIndianRupee /> 10000
            </p>
            <p className={classes.shipping}>+ 200</p>
            <p className={classes.tax}>+ 180</p>
          </div>
        </div>
        <div className={classes.totalContainer}>
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <h3>12000</h3>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <button>Checkout</button>
          <div className={classes.cardImages}>
            <div>
              <img
                className={classes.cardImage}
                src={masterCard}
                alt="cardimage"
              />
              <img className={classes.cardImage} src={rupay} alt="cardimage" />
              <img className={classes.cardImage} src={apple} alt="cardimage" />
              <img className={classes.cardImage} src={visa} alt="cardimage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={classes.emptyCart}>
      <h4>Your Cart Is Empty</h4>
      <div>
        <Link to="/products">
          <button>Go To Products Page</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
