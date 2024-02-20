import React from "react";
import styles from "./Admin.module.scss";
import AdminHome from "../../components/admin/AdminHome/AdminHome";
import Navbar from "../../components/admin/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Category from "../../components/admin/category/Category";
import Brand from "../../components/admin/brand/Brand";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import EditProduct from "../../components/admin/editProduct/EditProduct";
import AddProduct from "../../components/admin/addProduct/AddProduct";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<AdminHome />} />
          <Route path="category" element={<Category />} />
          <Route path="brand" element={<Brand />}></Route>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="all-product" element={<ViewProducts />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
