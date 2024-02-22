import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <section style={{ height: "80vh" }}>
        <div className="--center-all --column-gap">
          <h2>Page Not Found</h2>
          <p>Looks like the page you are looking for could not be found.</p>
          <br />
          <Link to={"/"}>
            <button className="--btn">Back to home</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
