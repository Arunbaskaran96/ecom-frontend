import React from "react";
import "./app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Products from "./pages/products/Products";
import ViewProduct from "./pages/viewproduct/ViewProduct";
import Cart from "./pages/cart/Cart";
import About from "./pages/about/About";
import Shipping from "./pages/shipping/Shipping";
import Orders from "./pages/orders/Orders";
import OrderView from "./pages/orderview/OrderView";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/orderview/:id" element={<OrderView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
