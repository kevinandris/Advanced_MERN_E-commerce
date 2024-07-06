import "./FooterMap.scss";

import React from "react";

const FooterMap = () => {
  return (
    <>
      <h1 className="title">Our store location:</h1>
      <address id="address">
        13 Canterbury Park Lane, Ellerslie <br />
        Auckland, New Zealand
      </address>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.909786281169!2d174.80216547729572!3d-36.89250637222106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d48fa9d34c95f%3A0x9dca8cd6130885c!2s13%20Canterbury%20Park%20Lane%2C%20Ellerslie%2C%20Auckland%201051!5e0!3m2!1sen!2snz!4v1720304160239!5m2!1sen!2snz"
          width="1000"
          height="550"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default FooterMap;
