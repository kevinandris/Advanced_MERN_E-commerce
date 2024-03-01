import React, { useEffect, useState } from "react";
import {
  deleteBrand,
  getBrands,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const BrandList = () => {
  const { IsLoading, brands } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  // ! This function is shipped to "confirmDelete function"
  const deleteBrandButton = async (slug) => {
    await dispatch(deleteBrand(slug));
    await dispatch(getBrands());
  };

  // ! This function is in trash icon
  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure you want to delete this brand?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteBrandButton(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  /* >>> Pagination from `React-paginate` */
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = brands.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(brands.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % brands.length;
    setItemOffset(newOffset);
  };
  /* =========================================== */

  return (
    <div className="--mb2">
      <h3>All Brands</h3>
      <div className="table">
        {brands.length === 0 ? (
          <p>No Brand Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((brand, index) => {
                const { _id, name, slug, category } = brand;
                return (
                  <tr key={_id}>
                    <td>{itemOffset + index + 1}</td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color={"red"}
                          onClick={() => confirmDelete(slug)}
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
  );
};

export default BrandList;
