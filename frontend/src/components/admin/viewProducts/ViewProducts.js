import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import Search from "../../search/Search";
import { Spinner } from "../../loader/Loader";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { shortenText } from "../../../utils";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ViewProducts = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading } = useSelector((state) => state.product);

  /* >>> Display the items created on the console */
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProducts());
    }
  }, [isLoggedIn, dispatch]);

  // ! This function is in trash icon as a prop at onClick
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this Product?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  // ! This function is passed in to the `confirmDelete function`
  const removeProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  // ! Pagination from `React-paginate`
  const itemsPerPage = 3;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };
  /* ==================================== */

  return (
    <section>
      <div className="container product-list">
        <div className="table">
          <div className="--flex-between --flex-dir-column">
            <span>
              <h3>All Products</h3>
              <p>
                ~ <b>{products.length}</b> Products found
              </p>
            </span>
            {/* >>> "Search" component */}
            <span>
              <Search
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </span>
          </div>
        </div>
        {isLoading && <Spinner />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No products found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <td>s/n</td>
                  <td>Name</td>
                  <td>Category</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Value</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {/* >>> NOTE: "products variable" was replaced by "currentItems" from pagination variable */}
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>{price * quantity}</td>
                      <td className="icons">
                        <span>
                          {/* >>> Use Link tag to give a space between icons */}
                          <Link to="/">
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/admin/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrash
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </section>
  );
};

export default ViewProducts;
