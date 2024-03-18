import React, { useEffect, useState } from "react";
import classes from "./orderview.module.scss";
import { BASE_URL } from "../../config";
import { CircularProgress } from "@mui/material";
import { userSelector } from "../../redux/slices/userSlice";
import { useParams } from "react-router-dom";

function OrderView() {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = userSelector();
  const { id } = useParams();

  useEffect(() => {
    getOrder();
  }, []);

  console.log(order);

  const getOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${id}`);
      const result = await response.json();
      setOrder(result.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <div>
      <CircularProgress />
    </div>;
  }
  return (
    <div className={classes.container}>
      <div className={classes.left}>order status</div>
      <div className={classes.right}>
        <div className={classes.ordersContainer}>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order?.orderItems?.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <img
                          className={classes.prodImage}
                          src={item.image}
                          alt="prod image"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className={classes.total}>
            <h3>Grand Total - {order?.totalPrice}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderView;
