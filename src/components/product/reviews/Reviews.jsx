import React from "react";
import classes from "./review.module.scss";
import { Rating } from "@mui/material";

function Reviews({ rev }) {
  return (
    <div className={classes.container}>
      <div>
        <img src={rev.image} alt="user-image" className={classes.image} />
      </div>
      <div>
        <p>{rev.name}</p>
      </div>
      <div>
        <Rating readOnly value={rev.rating} />
      </div>
      <div className={classes.revContainer}>
        <p>{rev.review}</p>
      </div>
    </div>
  );
}

export default Reviews;
