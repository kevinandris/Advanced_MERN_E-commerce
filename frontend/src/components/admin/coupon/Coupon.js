import React from "react";
import "./Coupon.scss";
import CreateCoupon from "./CreateCoupon";
import CouponList from "./CouponList";

const Coupon = () => {
  return (
    <section>
      <div className="container coupon">
        <CreateCoupon />
        <CouponList />
      </div>
    </section>
  );
};

export default Coupon;
