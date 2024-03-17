import React, { useEffect } from "react";
import classes from "./cart.module.scss";
import { LuIndianRupee } from "react-icons/lu";
import masterCard from "../../assets/mastercard.svg";
import rupay from "../../assets/rupay.svg";
import apple from "../../assets/apple-pay.svg";
import visa from "../../assets/visa.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addProdQuantity,
  addQuantity,
  removeUserCart,
  subProdQuantity,
  subQuantity,
  userSelector,
} from "../../redux/slices/userSlice";
import {
  addQuantityCart,
  calculateGrandTotal,
  cartSelector,
  fetchCart,
  removeCart,
  removeFromCart,
  subQuantityCart,
} from "../../redux/slices/cartSlice";
import { CircularProgress } from "@mui/material";
import {
  calculateTax,
  grandTotal,
  shippingCharges,
} from "../../utils/calculateTax";
import { BASE_URL } from "../../config";

function Cart() {
  const cartDispatch = useDispatch();
  const userDispatch = useDispatch();
  const { user } = userSelector();
  const { loading, cart, error, grandSubTotal } = cartSelector();

  const taxPrice = calculateTax(grandSubTotal);
  const shipCharge = shippingCharges(grandSubTotal);
  const total = grandTotal(grandSubTotal, shipCharge, taxPrice);

  useEffect(() => {
    cartDispatch(fetchCart(user?.user?._id));
    cartDispatch(calculateGrandTotal());
  }, []);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const addQuantityHandler = (cart) => {
    const formData = {
      userId: user.user._id,
      data: {
        productId: cart._id,
        quantity: cart.quantity + 1,
        subTotal: cart.subTotal + cart.productId.price,
      },
    };
    cartDispatch(addQuantityCart(cart));
    userDispatch(addProdQuantity(formData));
    userDispatch(addQuantity(cart.productId._id));
  };
  const subQuantityHandler = (cart) => {
    const formData = {
      userId: user.user._id,
      data: {
        productId: cart._id,
        quantity: cart.quantity - 1,
        subTotal: cart.subTotal - cart.productId.price,
      },
    };
    cartDispatch(subQuantityCart(cart));
    userDispatch(subProdQuantity(formData));
    userDispatch(subQuantity(cart.productId._id));
  };

  const removeCartHandler = (cart) => {
    const formData = {
      userId: user.user._id,
      data: {
        productId: cart._id,
      },
    };
    cartDispatch(removeCart(cart));
    cartDispatch(removeFromCart(formData));
    userDispatch(removeUserCart(cart._id));
  };

  const handleCheckout = async () => {
    const response = await fetch(`${BASE_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.user._id,
        cart: cart.cartItems,
        total: total,
      }),
    });
    const result = await response.json();

    if (result.url) {
      console.log(result.url);
      window.location.href = result.url;
    }
  };

  return (
    <div>
      {cart?.cartItems?.length > 0 ? (
        <div className={classes.container}>
          <div className={classes.left}>
            <div>
              <h3>My Cart ({cart?.cartItems?.length})</h3>
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
                {cart.cartItems &&
                  cart.cartItems.map((cart) => {
                    return (
                      <tr key={cart._id}>
                        <td className={classes.prodCart}>
                          <div>
                            <img
                              className={classes.image}
                              src={cart.productId.images[0].url}
                              alt="prodImage"
                            />
                          </div>
                          <div>
                            <p>{cart?.productId.name}</p>
                            <p>
                              <LuIndianRupee />
                              {cart.productId.price}
                            </p>
                            <div className={classes.removeBtn}>
                              <button onClick={() => removeCartHandler(cart)}>
                                Remove
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={classes.quantityContainer}>
                            <button
                              disabled={cart.quantity === 1}
                              className={classes.quantityBtn}
                              onClick={() => subQuantityHandler(cart)}
                            >
                              -
                            </button>
                            <span>{cart.quantity}</span>
                            <button
                              onClick={() => addQuantityHandler(cart)}
                              className={classes.quantityBtn}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <h3>{cart.subTotal}</h3>
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
                  <LuIndianRupee /> {grandSubTotal}
                </p>
                <p className={classes.shipping}>+ {shipCharge}</p>
                <p className={classes.tax}>+ {taxPrice}</p>
              </div>
            </div>
            <div className={classes.totalContainer}>
              <div>
                <h3>Total</h3>
              </div>
              <div>
                <h3>{total}</h3>
              </div>
            </div>
            <div className={classes.btnContainer}>
              <button onClick={handleCheckout}>Checkout</button>
              <div className={classes.cardImages}>
                <div>
                  <img
                    className={classes.cardImage}
                    src={masterCard}
                    alt="cardimage"
                  />
                  <img
                    className={classes.cardImage}
                    src={rupay}
                    alt="cardimage"
                  />
                  <img
                    className={classes.cardImage}
                    src={apple}
                    alt="cardimage"
                  />
                  <img
                    className={classes.cardImage}
                    src={visa}
                    alt="cardimage"
                  />
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
      )}
    </div>
  );
}

export default Cart;
