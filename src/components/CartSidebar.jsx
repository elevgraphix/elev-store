// import SimpleBar from "simplebar-react";
// import "simplebar-react/dist/simplebar.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 

    faXmark, 
    faShoppingBag,
    faTrashCan,
    faBolt

} from "@fortawesome/free-solid-svg-icons";


export default function CartSidebar({ 
    cart, 
    isCartOpen, 
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    cartTotal,
    removeFromCart,
    openCheckout,
    handleCartBuyNow
}) {

    function calculateTotal(price, quantity) {
        return (price * quantity).toFixed(2);
    }

    function isCartItem (cart) {
        return (cart.length !== 0);
    }


    return (

        <div 
            className={`cart-overlay ${isCartOpen ? "active": ""}`}
            onClick={closeCart}
        >
            
            <aside 
                className={`cart-sidebar ${isCartOpen ? "active" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cart Header */}
                <div className="cart-header">

                    <h2>
                        Shopping Cart
                        {/* <FontAwesomeIcon icon={faShoppingBag} /> */}
                    </h2>

                    <button
                        className="close-cart-btn"
                        onClick={closeCart}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                </div>
                

                {/* Cart Body */}
                <div className="cart-body">

                    {/* Cart Items */}
                    <div className="cart-items">
                        {!isCartItem(cart) ? (
                            
                            <p className="empty-cart">
                                Your cart is empty.
                            </p>

                        ) : (

                            cart.map((item) => {
                                
                                const remainingStock = item.stock - item.quantity;
                                
                                return (

                                <div
                                    key={item.id}
                                    className="cart-item"
                                >

                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                    />

                                    <div className="cart-item-info">

                                        <h3>{item.title}</h3>

                                        <p>${calculateTotal(item.price, item.quantity)}</p>

                                        <div className="cart-item-actions">

                                            <div className="quantity-controls">

                                                <button
                                                    className="qtyBtn"
                                                    onClick={() => decreaseQuantity(item.id)}
                                                >
                                                    -
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button 
                                                    className="qtyBtn"
                                                    disabled={item.quantity >= item.stock}
                                                    onClick={() => increaseQuantity(item.id)}
                                                >
                                                    +
                                                </button>

                                                
                                            </div>

                                            <button
                                                className="buyNowCartBtn"
                                                onClick={() => handleCartBuyNow(item)}
                                                title="Buy Now"
                                            >
                                                <FontAwesomeIcon icon={faBolt} />
                                            </button>

                                        </div>
                                        

                                            <p
                                                className={`stock-info ${
                                                    remainingStock === 0
                                                        ? "out-of-stock"
                                                        : remainingStock <=5
                                                            ? "low-stock"
                                                            : ""
                                                }`}
                                            >

                                                <span className="stock-dot"></span>

                                                {
                                                    remainingStock === 0
                                                        ? "Out of Stock"
                                                        : `${remainingStock} Left`
                                                }

                                            </p>

                                    </div>

                                    <button
                                        className="removeBtn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />

                                    </button>
                                </div>


                            )})

                        )}
                    </div>

                    {/* Summary */}
                    <div className="cart-summary">

                        <div className="summary-row">
                            <span>Items</span>
                            <span>{totalItems}</span>
                        </div>

                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <button 
                            className="checkoutBtn"
                            disabled={cart.length === 0}
                            onClick={openCheckout}
                        >
                            Checkout
                        </button>

                    </div>

                </div>

            </aside>
        </div>


    );
}