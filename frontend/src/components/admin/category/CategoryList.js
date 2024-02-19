import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { FaTrashAlt } from "react-icons/fa";

const CategoryList = () => {
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="--mb2">
      <h3>All Categories</h3>
      <div className="table">
        {categories.length === 0 ? (
          <p>No Category Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => {
                const { _id, name, slug } = cat;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color={"red"}
                          // onClick={() => confirmDelete(slug)}
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
    </div>
  );
};

export default CategoryList;
