import React from "react";
import "./OrderHistory.scss";
import { useNavigate } from "react-router-dom";
import ListOfOrders from "./ListOfOrders";

const OrderHistory = () => {
  const navigate = useNavigate();

  const openOrderDetails = (id) => {
    navigate(`/order-details/${id}`);
  };

  return (
    <div className="orderHistoryContainer">
      <section>
        <div className="container order">
          <h2>Your Order History</h2>
          <p>
            Open an order to leave a <b>Product Review</b>
          </p>
          <br />
          <ListOfOrders openOrderDetails={openOrderDetails} />
        </div>
      </section>
    </div>
  );
};

export default OrderHistory;
