import React from "react";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const userRole = user?.role;

  if (userRole === "admin") {
    return children;
  }

  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission denied</h2>
        <p>This page can only be viewed by an admin user</p>
        <br />
        <Link to={"/"}>
          <button className="--btn">Back to home</button>
        </Link>
      </div>
    </section>
  );
};

// ! The "Admin word on the header" that allows an access to Admin page could only been seen by admin users
export const AdminOnlyLink = ({ children }) => {
  const user = useSelector(selectUser);
  const userRole = user?.role;

  if (userRole === "admin") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
