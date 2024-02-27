import React from "react";
import "./Orders.module.scss";
import { useNavigate } from "react-router-dom";
import ListOfOrders from "../../../pages/order/ListOfOrders";

const Orders = () => {
  const navigate = useNavigate();
  const openOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <div className="container order">
      <h2>All Orders</h2>
      <p>
        Open an order to<b>Change Order Status</b>
      </p>
      <br />
      <ListOfOrders openOrderDetails={openOrderDetails} />
    </div>
  );
};

export default Orders;
