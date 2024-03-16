import React, { useState } from "react";
import classes from "./productlist.module.scss";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { Rating } from "@mui/material";
import { CiHeart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import {
  addProdQuantity,
  addQuantity,
  isAddedinCart,
  subProdQuantity,
  subQuantity,
  userSelector,
} from "../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function ProductList({ prod, addtohandler }) {
  const userDispatch = useDispatch();
  const { user } = userSelector();
  const isPresentinCart = isAddedinCart(prod._id);

  const subQuantityHandler = (id) => {
    const formData = {
      userId: user.user._id,
      data: {
        productId: isPresentinCart._id,
        quantity: isPresentinCart.quantity - 1,
      },
    };
    userDispatch(subQuantity(id));
    userDispatch(subProdQuantity(formData));
  };

  const addQuantityHandler = (prod) => {
    const formData = {
      userId: user.user._id,
      data: {
        productId: isPresentinCart._id,
        quantity: isPresentinCart.quantity + 1,
        subTotal: isPresentinCart.subTotal + prod.price,
      },
    };
    userDispatch(addQuantity(prod._id));
    userDispatch(addProdQuantity(formData));
  };

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img
          className={classes.image}
          src={prod.images[0].url}
          alt="prod-image"
        />
        <Link to={`/product/${prod._id}`} className={classes.link}>
          <div className={classes.eyeIconContainer}>
            <FaEye size={24} />
          </div>
        </Link>
        <div className={classes.heartIcon}>
          <CiHeart color="blue" className={classes.icon} size={26} />
        </div>
      </div>
      <div>
        <div className={classes.bottom}>
          <div className={classes.nameContainer}>
            <p className={classes.prodName}>{prod.name}</p>
          </div>
          <p className={classes.ratings}>
            <MdOutlineCurrencyRupee /> <span>{prod.price}</span>
          </p>
          <div className={classes.reviewContainer}>
            <Rating
              size="small"
              name="read-only"
              value={prod.ratings}
              readOnly
            />
            <span>({prod.numOfReviews})</span>
          </div>
        </div>
        <div className={classes.btnContainer}>
          {isPresentinCart ? (
            <div className={classes.quantityContainer}>
              <button
                disabled={isPresentinCart.quantity === 1}
                onClick={() => subQuantityHandler(prod._id)}
                className={classes.subBtn}
              >
                -
              </button>
              <span>{isPresentinCart.quantity}</span>
              <button
                onClick={() => addQuantityHandler(prod)}
                className={classes.addBtn}
              >
                +
              </button>
            </div>
          ) : (
            <button onClick={() => addtohandler(prod)} className={classes.btn}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
