import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function CheckoutModal({

    isCheckoutOpen,
    closeCheckout,

    checkoutItems,
    checkoutTotal,
    checkoutTotalItems,
    
    checkoutData,
    handleCheckoutChange,

    isFormValid,
    placeOrder,

}) {

    const shipping = 0;
    const tax = checkoutTotal * 0.075;
    const grandTotal = checkoutTotal + shipping + tax;

    function calculateTotal(price, quantity) {
        return (price * quantity).toFixed(2);
    }

    return (
        <div 
            className={`checkout-overlay ${isCheckoutOpen ? "active" : ""}`}
            onClick={closeCheckout}
        >

            <div 
                className={`checkout-modal ${isCheckoutOpen ? "active" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="checkout-header">

                    <h2>Checkout</h2>

                    <button
                        className="close-checkout-btn"
                        onClick={closeCheckout}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                </div>





                {/* Body */}
                <div className="checkout-body">

                    <div className="order-section">

                        <div className="order-section-header">

                            <h3>Your Order</h3>
                            
                            <span>{checkoutTotalItems} {checkoutTotalItems === 1 ? "item" : "items"}</span>

                        </div>

                        <div className="order-items">

                            {checkoutItems.map(item => (

                                <div
                                    key={item.id}
                                    className="order-item"
                                >

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                    />

                                    <h4>{item.title}</h4>

                                    <p className="order-price">
                                        {item.quantity} × ${item.price.toFixed(2)}
                                    </p>

                                    <strong className="order-total">
                                        ${calculateTotal(item.price, item.quantity)}
                                    </strong>

                                </div>

                            ))}

                        </div>

                    </div>
                    
                    <div className="order-summary">
                        <h3>Order Summary</h3>

                        <div className="summary-row">
                            <span>Items</span>
                            <span>{checkoutTotalItems}</span>
                        </div>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${checkoutTotal.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>

                        <div className="summary-row">
                            <span>Tax (7.5%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>

                    </div>

                    <form className="customer-info">

                        <h3>Customer Information</h3>

                        <input
                            type="text" 
                            name="fullName"
                            value={checkoutData.fullName}
                            onChange={handleCheckoutChange}
                            placeholder="Full Name"
                            required
                        />

                        <input 
                            type="email" 
                            name="email"
                            value={checkoutData.email}
                            onChange={handleCheckoutChange}
                            placeholder="Email Address"
                            required
                        />

                        <input 
                            type="tel" 
                            name="phone"
                            value={checkoutData.phone}
                            onChange={handleCheckoutChange}
                            placeholder="Phone Number"
                            required
                        />

                        <textarea
                            name="address"
                            value={checkoutData.address}
                            onChange={handleCheckoutChange}
                            placeholder="Delivery Address"
                            rows="4"
                            minLength={5}
                            required
                        ></textarea>

                    </form>

                </div>

                {/* Footer */}
                <div className="checkout-footer">

                    <button
                        className="cancelBtn"
                        onClick={closeCheckout}
                    >
                        Cancel
                    </button>

                    <button 
                        className="placeOrderBtn"
                        disabled={!isFormValid}
                        onClick={placeOrder}
                    >
                        Place Order • ${grandTotal.toFixed(2)}
                    </button>

                </div>

            </div>

        </div>
    );

}