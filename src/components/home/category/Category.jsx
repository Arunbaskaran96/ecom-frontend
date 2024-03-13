import React from "react";
import classes from "./category.module.scss";
import { CiMobile2 } from "react-icons/ci";

function Category() {
  const categories = [
    {
      img: <CiMobile2 size={60} />,
      name: "Phones",
    },
    {
      img: <CiMobile2 size={60} />,
      name: "Comnputers",
    },
    {
      img: <CiMobile2 size={60} />,
      name: "HeadPhones",
    },
    {
      img: <CiMobile2 size={60} />,
      name: "SmartWatch",
    },
  ];
  return (
    <div className={classes.container}>
      {categories.map((category) => {
        return (
          <div className={classes.category}>
            <div>{category.img}</div>
            <p>{category.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Category;
