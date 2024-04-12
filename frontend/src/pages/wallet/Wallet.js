import React, { useEffect, useState } from "react";
import "./Wallet.scss";
import Confetti from "react-confetti";
import PageMenu from "../../components/pageMenu/PageMenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, selectUser } from "../../redux/features/auth/authSlice";
import mcImg from "../../assets/mc_symbol.png";
import {
  AiFillDollarCircle,
  AiFillGift,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";
import paymentImg from "../../assets/payment.svg";
import WalletTransactions from "./WalletTransactions";
import {
  RESET_RECEIVER,
  RESET_TRANSACTION_MESSAGE,
  getUserTransactions,
  selectTransactionMessage,
  selectTransactions,
  transferFund,
  verifyAccount,
} from "../../redux/features/transaction/transactionSlice";
import TransferModal from "./TransferModal";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import DepositModal from "./DepositModal";
import axios from "axios";

const transactionss = [
  {
    _id: 123456,
    createdAt: "31-11-2023",
    amount: 100,
    sender: "aye@gmail.com",
    receiver: "Keipy store",
    description: "Payment for products",
    status: "success",
  },
  {
    _id: 1234567,
    createdAt: "31-11-2023",
    amount: 100,
    sender: "aye@gmail.com",
    receiver: "Keipy store",
    description: "Payment for products",
    status: "success",
  },
];

const initialTransferDataState = {
  amount: 0,
  sender: "",
  receiver: "",
  description: "",
  status: "",
};

const initialDepositState = {
  amount: 0,
  paymentMethod: "",
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const transactions = useSelector(selectTransactions);
  const transactionMessage = useSelector(selectTransactionMessage);

  /* ============== FOR THE TRANSFER MODAL FORM ================== */
  const [transferData, setTransferData] = useState(initialTransferDataState);
  const { amount, sender, receiver, description, status } = transferData;
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    setDepositData({ ...depositData, [name]: value });
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
    setIsVerified(false);
    dispatch(RESET_TRANSACTION_MESSAGE());
    dispatch(RESET_RECEIVER());
  };

  const verifyUserAccount = async () => {
    if (receiver === "") {
      toast.error("Please add receivers account");
    } else if (!validateEmail) {
      toast.error("Please add a valid email account");
    }

    const formData = {
      receiver,
    };

    dispatch(verifyAccount(formData));
  };

  const closeModal = (e) => {
    if (e.target.classList.contains("cm")) {
      setShowTransferModal(false);
      setShowDepositModal(false);
      setTransferData({ ...initialTransferDataState });
      setTransferData({ ...initialDepositState });
      setIsVerified(false);
      dispatch(RESET_TRANSACTION_MESSAGE());
    }
  };
  const { isLoading } = useSelector((state) => state.transaction);

  const transferMoney = async (e) => {
    e.preventDefault();
    if (amount < 1) {
      return toast.error("The amount must be bigger than 0");
    } else if (!description) {
      return toast.error("Please enter a description");
    }

    const formData = {
      ...transferData,
      sender: user.email,
      status: "Success",
    };

    await dispatch(transferFund(formData));
    await dispatch(getUser());
  };

  /* >> To ensure we have fresh details of a user */
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, user]);

  /* >> Grab the transactions when the page is reload*/
  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserTransactions());
  }, [dispatch]);

  /* >> Updating the user's current money and receiver's money*/
  useEffect(() => {
    if (transactionMessage === "Account verification successful") {
      setIsVerified(true);
    } else if (transactionMessage === "Transaction successful") {
      setTransferData({ ...initialTransferDataState });
      setShowTransferModal(false);
      setIsVerified(false);
      dispatch(RESET_RECEIVER());
      dispatch(getUserTransactions());
    }

    dispatch(RESET_TRANSACTION_MESSAGE());
  }, [transactionMessage, dispatch]);
  /* ======================================================== */
  /* ================= FOR THE DEPOSIT MODAL FORM ================== */

  const [depositData, setDepositData] = useState(initialDepositState);
  const { amount: depositAmount, paymentMethod } = depositData;
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [urlParams] = useSearchParams();
  const payment = urlParams.get("payment");

  const depositMoney = async (e) => {
    e.preventDefault();

    /* >> Validation */
    if (depositAmount < 1) {
      return toast.error("Please enter an amount that is greater than 0");
    } else if (paymentMethod === "") {
      return toast.error("Please select a payment method");
    } else if (paymentMethod === "flutterwave") {
      //   >> eslint disable-next-line no-undef
      //   FlutterwaveCheckout({
      //     public_key: process.env.REACT_APP_FLUTTERWAVE_PK,
      //     tx_ref: process.env.REACT_APP_TX_REF,
      //     amount: depositAmount,
      //     currency: "NZD",
      //     payment_options: "card, banktransfer, ussd",
      //     redirect_url: `${process.env.REACT_APP_BACKEND_URL}/api/transaction/depositFundFLW`,
      //     // meta: {
      //     //   source: "docs-inline-test",
      //     //   consumer_mac: "92a3-912ba-1192a",
      //     // },
      //     customer: {
      //       email: user.email,
      //       phone_number: user.phone,
      //       name: user.name,
      //     },
      //     customizations: {
      //       title: "Keipy Wallet Deposit",
      //       description: "Deposit funds to your Keipy wallet",
      //       logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
      //     },
      //   });
      //   return;
    } else if (paymentMethod === "stripe") {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/transaction/depositFundStripe`,
        {
          amount: depositAmount,
        }
      );
      window.location.href = data.url;
      return;
    }
  };

  useEffect(() => {
    if (payment === "successful") {
      toast.success("Payment Successful");
      setTimeout(() => {
        navigate("/wallet");
      }, 5000);
    } else if (payment === "failed") {
      toast.error("Payment failed, please try later.");
    }
  }, [payment, navigate]);

  return (
    <>
      {payment === "successful" && <Confetti />}
      <section
        className="container"
        style={{ marginTop: "40px", height: "84.46vh" }}
      >
        <PageMenu />

        <div className="wallet">
          <div className="wallet-data --flex-start --flex-dir-column">
            <div className="wallet-info --card --mr">
              <span className="hello">Hello </span>
              <h4>{user?.name}</h4>
              <div className="--underline"></div>
              <span className="--flex-between">
                <p>Account Balance</p>
                <img src={mcImg} alt="cc" width={50} />
              </span>

              <h4>${user?.balance.toFixed(2)}</h4>
              <div className="buttons --flex-center">
                <button
                  className="--btn --btn-primary"
                  onClick={() => setShowDepositModal(true)}
                >
                  <AiOutlineDollarCircle size={20} />
                  &nbsp; Deposit Money
                </button>

                <button
                  className="--btn --btn-danger"
                  onClick={() => setShowTransferModal(true)}
                >
                  <FaRegPaperPlane size={20} /> &nbsp; Transfer
                </button>
              </div>
            </div>

            {/* >> Wallet Promo */}
            <div className="wallet-promo --flex-between --card">
              <div className="wallet-text">
                <span className="--flex-start">
                  <AiFillDollarCircle size={25} color="#ff7722" /> &nbsp;
                  <h4>Keipy Wallet</h4>
                </span>

                <span className="--flex-start">
                  <h4>Cashback up to 50%</h4> &nbsp;
                  <AiFillGift size={20} color="#007bff" />
                </span>
                <span className="hello">
                  Use your Keipy wallet at checkout and get up to 80% cashback.
                </span>
              </div>

              <div className="wallet-img">
                <img src={paymentImg} width={150} alt="pay" />
              </div>
            </div>
          </div>

          {/* >> Wallet Transactions component */}
          {user !== null && (
            <WalletTransactions transactions={transactions} user={user} />
          )}
        </div>

        {/* >> Input Form from TransferModal.js*/}
        {showTransferModal && (
          <TransferModal
            isVerified={isVerified}
            isLoading={isLoading}
            transferData={transferData}
            handleInputChange={handleInputChange}
            handleAccountChange={handleAccountChange}
            verifyUserAccount={verifyUserAccount}
            transferMoney={transferMoney}
            closeModal={closeModal}
          />
        )}

        {/* >>  DepositModal.js*/}
        {showDepositModal && (
          <DepositModal
            depositData={depositData}
            closeModal={closeModal}
            handleDepositChange={handleDepositChange}
            depositMoney={depositMoney}
          />
        )}
      </section>
    </>
  );
};

export default Wallet;
