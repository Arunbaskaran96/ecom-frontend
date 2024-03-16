import React, { useEffect, useState } from "react";
import classes from "./shipping.module.scss";
import { userSelector } from "../../redux/slices/userSlice";
import useLocalStorage from "../../hooks/useLocalStorage";
import { addressValidator } from "../../utils/formValidators/addressValidator";

function Shipping() {
  const { user } = userSelector();
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const { setItem, getItem } = useLocalStorage("address");
  const address = getItem();

  const [formData, setFormData] = useState({
    name: user.user.name,
    email: user.user.email,
    mobile: user.user.mobile,
    city: "",
    street: "",
    pincode: "",
    door: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressValidator(formData, setErrors)) {
      if (checked) {
        setItem(formData);
      } else {
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
                    value={formData.mobile}
                    type="number"
                    id="mobile"
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
                    value={formData.door}
                    type="text"
                    id="door"
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
                    value={formData.pincode}
                    type="number"
                    id="pincode"
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
