import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function OrderSuccessModal({

    isOrderSuccessOpen,
    closeSuccessModal,
    customerName

}) {

    return (
        <div className={`success-overlay ${isOrderSuccessOpen ? "active" : ""}`}>

            <div className="success-modal">

                <FontAwesomeIcon 
                    icon={faCircleCheck}
                    className="success-icon"
                />

                <h2>Thank You, {customerName || "Customer"}!</h2>

                <p>
                    Your order has been placed successfully. 
                    <br /> <br /> <b> We've received your order and will begin processing it shortly. </b>
                </p>

                <p className="order-note">
                    You will receive an email confirmation shortly.
                </p>

                <button
                    className="continueBtn"
                    onClick={closeSuccessModal}
                >
                    Continue Shopping
                </button>

            </div>

        </div>
    );
}