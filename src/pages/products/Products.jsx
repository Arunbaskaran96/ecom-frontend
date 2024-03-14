import React, { useState } from "react";
import classes from "./products.module.scss";
import FilterProduct from "../../components/product/filterProduct/FilterProduct";
import { MdOutlineCancel } from "react-icons/md";
import ProductList from "../../components/product/productList/ProductList";
import { FaFilter } from "react-icons/fa";
import { Drawer } from "@mui/material";

function Products() {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const products = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ];
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
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
          {products &&
            products.map((prod) => {
              return <ProductList prod={prod} />;
            })}
        </div>
      </div>
      <Drawer
        PaperProps={{ sx: { width: "70%" } }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <div className={classes.mobileDrawer}>
          <FilterProduct
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
          />
        </div>
      </Drawer>
    </div>
  );
}

export default Products;
