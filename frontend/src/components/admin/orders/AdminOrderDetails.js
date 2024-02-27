import React from "react";
import "./AdminOrderDetails.module.scss";
import OrderDetailsComponent from "../../../pages/order/OrderDetailsComponent";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

const AdminOrderDetails = () => {
  return (
    <>
      {/* >> Component  */}
      <OrderDetailsComponent orderPageLink={"/admin/orders"} />
      <ChangeOrderStatus />
    </>
  );
};

export default AdminOrderDetails;
