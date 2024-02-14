import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Spinner } from "./components/loader/Loader";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";

function App() {
  // ! using axios to send the token or credentials to the backend every time; through http request.
  axios.defaults.withCredentials = true;

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header /> {/* from components folder */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
