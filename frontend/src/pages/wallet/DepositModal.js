import React, { useEffect, useRef } from "react";
import "./DepositModal.scss";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";

const DepositModal = ({
  depositData,
  closeModal,
  handleDepositChange,
  depositMoney,
}) => {
  const inputRef = useRef(null);

  /* */
  useEffect(() => {
    inputRef.current?.focus();
  }, []); /* // ! If [] is missing, the input field cant be typed */



  return (
    <section className="--100vh modal-section">
      <div className="--flex-center modal">
        <div className="--bg-light --p --card modal-content">
          <AiOutlineClose
            color="red"
            size={16}
            className="close-icon cm"
            onClick={(e) => closeModal(e)}
          />

          <div className="--flex-start modal-head --my">
            <AiOutlineInfoCircle color="red" size={18} />
            <h3 className="--text-p --ml">Deposit funds into your wallet</h3>
          </div>

          <div className="modal-body">
            <form onSubmit={depositMoney}>
              <p className="req">
                <label>Amount</label>
                <input
                  ref={inputRef}
                  type="number"
                  placeholder="Amount"
                  required
                  name="amount"
                  value={depositData.amount}
                  onChange={handleDepositChange}
                />
              </p>

              <label htmlFor="stripe" className="radio-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="paymentMethod"
                  id="stripe"
                  value={"stripe"}
                  onChange={handleDepositChange}
                />
                <span className="custom-radio" />
                Stripe
              </label>
              <br />

              <label htmlFor="flutterwave" className="radio-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="paymentMethod"
                  id="flutterwave"
                  value={"flutterwave"}
                  onChange={handleDepositChange}
                />
                <span className="custom-radio" />
                Flutterwave
              </label>
              <br />

              <span className="--flex-end">
                <button
                  className="--btn --btn-lg cm"
                  onClick={(e) => closeModal(e)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="--btn --btn-primary --btn-lg cm"
                >
                  Proceed
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositModal;
