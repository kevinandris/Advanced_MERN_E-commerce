import React, { useEffect, useRef } from "react";
import "./TransferModal.scss";
import { useSelector } from "react-redux";
import { selectReceiverName } from "../../redux/features/transaction/transactionSlice";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";

const TransferModal = ({
  closeModal,
  transferData,
  handleInputChange,
  handleAccountChange,
  verifyUserAccount,
  isVerified,
  isLoading,
  transferMoney,
}) => {
  const inputRef = useRef(null);

  /* */
  useEffect(() => {
    inputRef.current?.focus();
  }, []); /* // ! IF [] is missing, the input field cant be typed */

  const receiverName = useSelector(selectReceiverName);

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
            <h3 className="--text-p --ml">Send Money To Someone</h3>
          </div>

          <div className="modal-body">
            <form onSubmit={transferMoney}>
              <p className="req">
                <label>Amount</label>
                <input
                  ref={inputRef}
                  type="number"
                  placeholder="Amount"
                  required
                  name="amount"
                  value={transferData.amount}
                  onChange={handleInputChange}
                />
                <label>Receiver's account</label>
                <p className="--color-danger">
                  <b>{receiverName}</b>
                </p>
                <span className="--flex-end --row-gap">
                  <input
                    type="text"
                    placeholder="Receiver's account"
                    required
                    name="receiver"
                    value={transferData.receiver}
                    onChange={handleAccountChange}
                  />

                  <input
                    className="--btn --btn-red --btn-lg"
                    type="button"
                    name="verify"
                    value={"Verify"}
                    onClick={verifyUserAccount}
                  />
                </span>

                <label>Description</label>
                <input
                  type="text"
                  placeholder="Receiver's account"
                  required
                  name="description"
                  value={transferData.description}
                  onChange={handleInputChange}
                />
              </p>

              {!isVerified && (
                <p className="--color-danger">
                  Please click the verify button above!!!
                </p>
              )}

              {isVerified && (
                <span className="--flex-end">
                  <button
                    className="--btn --btn-lg cm"
                    onClick={(e) => closeModal(e)}
                  >
                    Cancel
                  </button>
                  {isLoading ? (
                    <button
                      type="submit"
                      className="--btn --btn-primary --btn-lg"
                      disabled
                    >
                      Sending...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="--btn --btn-primary --btn-lg"
                    >
                      Send
                    </button>
                  )}
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferModal;
