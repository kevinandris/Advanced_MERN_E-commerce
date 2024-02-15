import { useSelector } from "react-redux";

const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // ! if there is a component, you have to use return statement
  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // ! if there is a component, you have to use a return statement
  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogin;
