import React, { useEffect, useRef } from "react";
import "./TransferModal.scss";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectReceiverName } from "../../redux/features/transaction/transactionSlice";

const TransferModal = ({
  transferData,
  isVerified,
  isLoading,
  handleInputChange,
  handleAccountChange,
  verifyUserAccount,
  transferMoney,
  closeModal,
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
                {receiverName !== "" && (
                  <p className="--text-sm --color-danger">
                    <b>Hello </b> {receiverName}
                  </p>
                )}
                <span className="--flex-end">
                  <input
                    type="text"
                    placeholder="Receiver's account"
                    name="receiver"
                    value={transferData.receiver}
                    onChange={handleAccountChange}
                    required
                  />

                  <input
                    type="button"
                    className="--btn --btn-danger --btn-lg"
                    name="verify"
                    value={"Verify"}
                    onClick={verifyUserAccount}
                  />
                </span>
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={transferData.description}
                  onChange={handleInputChange}
                  required
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
                      type="button"
                      className="--btn --btn-primary --btn-lg cm"
                      disabled
                    >
                      Sending...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="--btn --btn-primary --btn-lg cm"
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
