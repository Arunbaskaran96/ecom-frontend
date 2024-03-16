import React, { useEffect, useState } from "react";
import classes from "./products.module.scss";
import FilterProduct from "../../components/product/filterProduct/FilterProduct";
import { MdOutlineCancel } from "react-icons/md";
import ProductList from "../../components/product/productList/ProductList";
import { FaFilter } from "react-icons/fa";
import { Alert, CircularProgress, Drawer, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
  productsSelector,
} from "../../redux/slices/productSlice";
import Loading from "../../components/loading/Loading";
import {
  addToCart,
  addToCartRequest,
  userSelector,
} from "../../redux/slices/userSlice";

function Products() {
  const prodDispatch = useDispatch();
  const userDispatch = useDispatch();
  const { user } = userSelector();
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const { result, loading, error } = productsSelector();

  const [toastOpen, setToastOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  const addtohandler = (prod) => {
    const formData = {
      userId: user.user._id,
      data: {
        subTotal: prod.price,
        quantity: 1,
        productId: prod._id,
      },
    };
    userDispatch(
      addToCart({
        subTotal: prod.price,
        quantity: 1,
        productId: prod._id,
      })
    );
    userDispatch(addToCartRequest(formData));

    setToastOpen(true);
  };

  useEffect(() => {
    prodDispatch(fetchProducts());
  }, []);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <div onClick={toggleDrawer(true)} className={classes.filterIcon}>
        <FaFilter size={30} />
      </div>
      <div className={classes.left}>
        <FilterProduct
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
        />
      </div>
      <div className={classes.right}>
        <div className={classes.filterpills}>
          <div className={classes.pill}>
            <p>Samsung</p>
            <MdOutlineCancel style={{ cursor: "pointer" }} />
          </div>
          <div className={classes.pill}>
            <p>Samsung</p>

            <MdOutlineCancel style={{ cursor: "pointer" }} />
          </div>
          <p className={classes.clr}>Clear all Filters</p>
        </div>
        <div className={classes.productsContainer}>
          {result &&
            result.products.map((prod) => {
              return (
                <ProductList
                  key={prod._id}
                  addtohandler={addtohandler}
                  prod={prod}
                />
              );
            })}
        </div>
      </div>
      <Drawer
        PaperProps={{ sx: { width: "70%" } }}
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <div className={classes.mobileDrawer}>
          <FilterProduct
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
          />
        </div>
      </Drawer>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Added to the cart"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Added to the cart
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Products;
