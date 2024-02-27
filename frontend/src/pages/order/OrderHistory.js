import React, { useEffect } from "react";
import "./OrderHistory.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../redux/features/order/orderSlice";
import Loader from "../../components/loader/Loader";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const openOrderDetails = (id) => {
    navigate(`/order-details/${id}`);
  };

  return (
    <section style={{ height: "87.8vh" }}>
      <div className="container order">
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className="table">
            {orders.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date:</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, index) => {
                    const {
                      _id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={_id} onClick={() => openOrderDetails(_id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{_id}</td>
                        <td>${orderAmount}</td>
                        <td>
                          <p
                            className={
                              orderStatus !== "delivered"
                                ? "pending"
                                : "delivered"
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}{" "}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
