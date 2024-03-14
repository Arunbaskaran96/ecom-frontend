import React, { useState } from "react";
import classes from "./viewproduct.module.scss";
import { TiTick } from "react-icons/ti";
import { Rating } from "@mui/material";
import { MdOutlineMessage } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Reviews from "../../components/product/reviews/Reviews";

function ViewProduct() {
  const [currentTag, setCurrentTag] = useState("description");

  const product = {
    images: [
      {
        publiId: "as",
        url: "https://m.media-amazon.com/images/I/411iWoJEJjL._AC_SY200_.jpg",
      },
    ],
    name: "IQZ00 Z9",
    description:
      "Fully Loaded Performance - Powered by MediaTek Dimensity 7200 built on flagship grade TSMC 2nd Gen 4nm process with a clock speed of 2.8GHz,Fully Loaded Camera - Experience Impressive camera shots with 50 MP Sony IMX882 OIS camera, 4K video recording with OIS, Super Night Mode, 2x Portrait Zoom, 50 MP UHD Mode.",
    price: "19999",
    ratings: 5,
    quantity: 1,
    reviews: [
      {
        name: "arun",
        image:
          "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png",
        rating: 5,
        review:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam   quae reprehenderit. Quam, veniam. Officiis ipsa neque fugit voluptates         cupiditate quod nulla officia nemo voluptate. Commodi iste dolore         aspernatur fugit maxime",
      },
      {
        name: "arun",
        image:
          "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png",
        rating: 5,
        review:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam   quae reprehenderit. Quam, veniam. Officiis ipsa neque fugit voluptates         cupiditate quod nulla officia nemo voluptate. Commodi iste dolore         aspernatur fugit maxime",
      },
      {
        name: "arun",
        image:
          "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png",
        rating: 5,
        review:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam   quae reprehenderit. Quam, veniam. Officiis ipsa neque fugit voluptates         cupiditate quod nulla officia nemo voluptate. Commodi iste dolore         aspernatur fugit maxime",
      },
      {
        name: "arun",
        image:
          "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png",
        rating: 5,
        review:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam   quae reprehenderit. Quam, veniam. Officiis ipsa neque fugit voluptates         cupiditate quod nulla officia nemo voluptate. Commodi iste dolore         aspernatur fugit maxime",
      },
      {
        name: "arun",
        image:
          "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png",
        rating: 5,
        review:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam   quae reprehenderit. Quam, veniam. Officiis ipsa neque fugit voluptates         cupiditate quod nulla officia nemo voluptate. Commodi iste dolore         aspernatur fugit maxime",
      },
    ],
  };
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div className={classes.left}>
          <swiper-container>
            <swiper-slide>
              <img
                className={classes.image}
                src="https://e-commerce-pied-xi.vercel.app/_next/image?url=%2Fimages%2Fhome%2Fbanner.webp&w=1920&q=75"
                alt="imag"
              />
            </swiper-slide>
            <swiper-slide>
              {product.images.map((item) => {
                return (
                  <img className={classes.image} src={item.url} alt="imag" />
                );
              })}
            </swiper-slide>
          </swiper-container>
        </div>
        <div className={classes.right}>
          <div className={classes.stockContainer}>
            {product.quantity > 0 ? (
              <>
                <TiTick color="green" size={28} />
                <span style={{ color: "green" }}>In Stock</span>
              </>
            ) : (
              <>
                <ImCross color="red" size={26} />{" "}
                <span style={{ color: "red" }}>Out of stock</span>
              </>
            )}
          </div>
          <div>
            <h3>{product.name}</h3>
          </div>
          <div className={classes.ratingContainer}>
            <div>
              <Rating readOnly value={5} />
            </div>
            <span>5</span>
          </div>
          <div className={classes.reviewContainer}>
            <div>
              <MdOutlineMessage size={23} />
            </div>
            <span>26 reviews</span>
          </div>

          <div className={classes.priceContainer}>
            <h6>
              <MdCurrencyRupee /> <span>{product.price}</span>
            </h6>
          </div>
          <div className={classes.addToCart}>
            <button className={classes.btn}>Add to cart</button>
          </div>
        </div>
      </div>

      <div className={classes.bottom}>
        <ul className={classes.bottomTags}>
          <li
            className={currentTag === "description" && classes.activetab}
            onClick={() => setCurrentTag("description")}
          >
            Description
          </li>
          <li
            className={currentTag === "reviews" && classes.activetab}
            onClick={() => setCurrentTag("reviews")}
          >
            Reviews
          </li>
        </ul>
        <div>
          {currentTag === "description" && (
            <div className={classes.descriptionContainer}>
              <p className={classes.description}>{product.description}</p>
            </div>
          )}
          {currentTag === "reviews" && (
            <div className={classes.reviewContainer}>
              {product.reviews &&
                product.reviews.map((rev) => {
                  return <Reviews rev={rev} />;
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
