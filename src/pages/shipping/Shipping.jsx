import React, { useEffect, useState } from "react";
import classes from "./shipping.module.scss";
import { removeCartCount, userSelector } from "../../redux/slices/userSlice";
import useLocalStorage from "../../hooks/useLocalStorage";
import { addressValidator } from "../../utils/formValidators/addressValidator";
import { cartSelector } from "../../redux/slices/cartSlice";
import {
  calculateTax,
  grandTotal,
  shippingCharges,
} from "../../utils/calculateTax";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Shipping() {
  const { user } = userSelector();
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const { setItem, getItem } = useLocalStorage("address");
  const address = getItem();
  const { cart, grandSubTotal } = cartSelector();
  const { getItem: getToken } = useLocalStorage("token");
  const token = getToken();
  const navigate = useNavigate();
  const userDispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.user.name,
    email: user.user.email,
    phoneNo: user.user.mobile,
    city: "",
    street: "",
    pinCode: "",
    doorNo: "",
  });

  useEffect(() => {
    if (address?.email) {
      setFormData({ ...address });
    }
  }, []);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const checkHandler = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressValidator(formData, setErrors)) {
      const taxPrice = calculateTax(grandSubTotal);
      const shipping = shippingCharges(grandSubTotal);
      const total = grandTotal(grandSubTotal, shipping, taxPrice);
      const cartlist = cart.cartItems.map((item) => {
        const { quantity, subTotal, productId } = item;
        return {
          quantity,
          price: subTotal,
          image: productId.images[0].url,
          name: productId.name,
          product: productId._id,
        };
      });
      const data = {
        shippingInfo: formData,
        orderItems: cartlist,
        userId: user.user._id,
        subTotal: grandSubTotal,
        taxPrice,
        shippingPrice: shipping,
        totalPrice: total,
      };

      if (checked) {
        setItem(formData);
      }
      const response = await fetch(`${BASE_URL}/addOrder`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        navigate("/orders");
        userDispatch(removeCartCount());
      }
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <div className={classes.heading}>
          <h3>Billing Details</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.formContainer}>
            <div className={classes.left}>
              <div>
                <label className={classes.label}>Name</label>
                <div className={classes.inputContainer}>
                  <input
                    value={formData.name}
                    type="text"
                    id="name"
                    onChange={changeHandler}
                  />
                  <br />
                  {errors.name && (
                    <span className={classes.error}>{errors.name}</span>
                  )}
                </div>
              </div>
              <div>
                <label className={classes.label}>Email</label>
                <div className={classes.inputContainer}>
                  <input value={formData.email} readOnly />
                  <br />
                  {errors.email && (
                    <span className={classes.error}>{errors.email}</span>
                  )}
                </div>
              </div>
              <div>
                <label className={classes.label}>Mobile</label>
                <div className={classes.inputContainer}>
                  <input
                    value={formData.phoneNo}
                    type="number"
                    id="phoneNo"
                    onChange={changeHandler}
                  />
                  <br />
                  {errors.mobile && (
                    <span className={classes.error}>{errors.mobile}</span>
                  )}
                </div>
              </div>
              <div>
                <label className={classes.label}>Door No</label>
                <div className={classes.inputContainer}>
                  <input
                    value={formData.doorNo}
                    type="text"
                    id="doorNo"
                    onChange={changeHandler}
                  />
                  <br />
                  {errors.door && (
                    <span className={classes.error}>{errors.door}</span>
                  )}
                </div>
              </div>
            </div>
            <div className={classes.right}>
              <div>
                <label className={classes.label}>Street</label>
                <div className={classes.inputContainer}>
                  <input
                    value={formData.street}
                    type="text"
                    id="street"
                    onChange={changeHandler}
                  />
                  <br />
                  {errors.street && (
                    <span className={classes.error}>{errors.street}</span>
                  )}
                </div>
              </div>
              <div>
                <label className={classes.label}>City</label>
                <div className={classes.inputContainer}>
                  <input
                    value={formData.city}
                    type="text"
                    id="city"
                    onChange={changeHandler}
                  />
                  <br />
                  {errors.city && (
                    <span className={classes.error}>{errors.city}</span>
                  )}
                </div>
              </div>
              <div>
                <label className={classes.label}>Pincode</label>
                <div className={classes.inputContainer}>
                  <input
                    value={formData.pinCode}
                    type="number"
                    id="pinCode"
                    onChange={changeHandler}
                  />
                  <br />
                  {errors.pincode && (
                    <span className={classes.error}>{errors.pincode}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <input
              value={checked}
              checked={checked}
              onChange={checkHandler}
              type="checkbox"
            />
            <p>Save this information for fater check-out next time</p>
          </div>
          <div className={classes.btnContainer}>
            <button>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
