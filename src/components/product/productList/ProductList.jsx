import React from "react";
import classes from "./productlist.module.scss";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { Rating } from "@mui/material";
import { CiHeart } from "react-icons/ci";

function ProductList({ prod }) {
  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img
          className={classes.image}
          src={prod.images[0].url}
          alt="prod-image"
        />
      </div>
      <div className={classes.bottom}>
        <div className={classes.bottomLeft}>
          <h4>
            <MdOutlineCurrencyRupee /> <span>10000</span>
          </h4>
          <div className={classes.reviewContainer}>
            <Rating
              size="small"
              name="read-only"
              value={prod.ratings}
              readOnly
            />
            <span>{prod.ratings} </span>
          </div>
          <div className={classes.nameContainer}>
            <p>{prod.name}</p>
          </div>
        </div>
        <div className={classes.bottomRight}>
          <div className={classes.iconContainer}>
            <CiHeart className={classes.icon} size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
