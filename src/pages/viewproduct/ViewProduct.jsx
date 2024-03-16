import React, { useEffect, useState } from "react";
import classes from "./viewproduct.module.scss";
import { TiTick } from "react-icons/ti";
import { CircularProgress, Rating } from "@mui/material";
import { MdOutlineMessage } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Reviews from "../../components/product/reviews/Reviews";
import { BASE_URL } from "../../config";
import { useParams } from "react-router-dom";
import {
  addProdQuantity,
  addQuantity,
  isAddedinCart,
  subProdQuantity,
  subQuantity,
  userSelector,
} from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

function ViewProduct() {
  const [currentTag, setCurrentTag] = useState("description");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const isPresentinCart = isAddedinCart(product._id);
  const userDispatch = useDispatch();

  const { user } = userSelector();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/product/${id}`);
      const result = await response.json();
      if (result.success) {
        setProduct(result.product);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const addtoCartHandler = () => {};

  const addQuantityHandler = () => {
    console.log(isPresentinCart._id);
    const formData = {
      userId: user.user._id,
      data: {
        productId: isPresentinCart._id,
        quantity: isPresentinCart.quantity + 1,
        subTotal: isPresentinCart.subTotal + product.price,
      },
    };
    userDispatch(addQuantity(product._id));
    userDispatch(addProdQuantity(formData));
  };

  const subQuantityHandler = () => {
    const formData = {
      userId: user.user._id,
      data: {
        productId: isPresentinCart._id,
        quantity: isPresentinCart.quantity - 1,
        subTotal: isPresentinCart.subTotal + product.price,
      },
    };
    userDispatch(subQuantity(product._id));
    userDispatch(subProdQuantity(formData));
  };
  return (
    !loading &&
    product._id && (
      <div className={classes.container}>
        <div className={classes.top}>
          <div className={classes.left}>
            <swiper-container>
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
            {/* <div className={classes.stockContainer}>
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
            </div> */}
            <div>
              <h3>{product.name}</h3>
            </div>
            <div className={classes.ratingContainer}>
              <div>
                <Rating readOnly value={product.ratings} />
              </div>
              <span>{product.ratings}</span>
            </div>
            <div className={classes.reviewContainer}>
              <div>
                <MdOutlineMessage size={23} />
              </div>
              <span>{product.numOfReviews}</span>
            </div>

            <div className={classes.priceContainer}>
              <h6>
                <MdCurrencyRupee /> <span>{product.price}</span>
              </h6>
            </div>
            <div className={classes.addToCart}>
              {!isPresentinCart ? (
                <button className={classes.btn} onClick={addtoCartHandler}>
                  Add to cart
                </button>
              ) : (
                <div className={classes.quantityContainer}>
                  <button
                    disabled={isPresentinCart.quantity === 1}
                    className={classes.qtyBtn}
                    onClick={subQuantityHandler}
                  >
                    -
                  </button>
                  <span className={classes.qty}>
                    {isPresentinCart.quantity}
                  </span>
                  <button
                    onClick={addQuantityHandler}
                    className={classes.qtyBtn}
                  >
                    +
                  </button>
                </div>
              )}
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
                {product.reviews.length > 0 ? (
                  product.reviews.map((rev) => {
                    return <Reviews rev={rev} />;
                  })
                ) : (
                  <div className={classes.noReview}>No reviews found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default ViewProduct;
