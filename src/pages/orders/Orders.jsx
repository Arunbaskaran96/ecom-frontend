import React, { useEffect, useState } from "react";
import classes from "./order.module.scss";
import { userSelector } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { fetchOrders, orderSelector } from "../../redux/slices/orderSlice";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

function Orders() {
  const dispatch = useDispatch();
  const { user } = userSelector();
  const { loading, orders } = orderSelector();
  console.log(orders);

  useEffect(() => {
    dispatch(fetchOrders("65f5d8d72ec3602589747810"));
  }, []);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (orders.result.length === 0) {
    return (
      <div className={classes.noOrders}>
        <p>No orders</p>
        <button>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h3>Your Orders - ({orders.result.length})</h3>
      </div>
      <div className={classes.orderContainer}>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Amount</th>
              <th>PurChased At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.result.map((prod) => {
                return (
                  <tr key={prod._id}>
                    <td>{prod._id}</td>
                    <td>{prod.totalPrice}</td>
                    <td>{prod.createdAt}</td>
                    <td>{prod.orderStatus}</td>
                    <td className={classes.action}>
                      <Link
                        className={classes.link}
                        to={`/orderview/${prod._id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
