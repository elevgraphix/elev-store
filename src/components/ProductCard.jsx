import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { 
    faCartShopping,
    faStar,
    faUser,
    faPlus,
    faBolt
} from "@fortawesome/free-solid-svg-icons";



export default function ProductCard({ 

    product,
    cart,
    addToCart,
    handleBuyNow
    
}) {
    
    const navigate = useNavigate();

    function openProductDetails() {
        navigate(`/products/${product.id}`);
    }


    const cartItem = cart.find(item => item.id === product.id);

    const cartQuantity = cartItem ? cartItem.quantity : 0;

    const remainingStock = product.stock - cartQuantity;


    return (
        <div className="product-card">

            <img
                className="product-image"
                src={product.images[0]}
                alt={product.title}
                onClick={openProductDetails}
            />

            <div className="product-info">

                <h2 
                    className="product-title"
                    onClick={openProductDetails}
                >
                    {product.title}
                </h2>

                <p className="product-category">
                    {product.category}
                </p>

                <p className="product-price">
                    ${product.price}
                </p>

                <p className="product-description">
                    {product.description}
                </p>

                
                
                <div className="stock-row">

                    <div
                        className={`stock ${
                            remainingStock === 0
                                ? "out-of-stock"
                                : remainingStock <= 5
                                    ? "low-stock"
                                    : ""
                        }`}
                    >
                        <span className="stock-dot"></span>

                        <span>
                            {
                                remainingStock === 0
                                    ? "Out of Stock"
                                    : `${remainingStock} In Stock`
                            }
                        </span>
                    </div>

                    {
                        cartQuantity > 0 && (
                            <p className="cart-status">

                                <span className="divider">|</span>

                                <FontAwesomeIcon icon={faCartShopping} />

                                {cartQuantity} {cartQuantity === 1 ? "item" : "items"} in your cart

                            </p>
                        )
                    }

                </div>


                <div className="product-actions">

                    <button
                        className="cartBtn"
                        disabled={remainingStock === 0}
                        onClick={() => addToCart(product)}
                        title="Add to Cart"
                    >
                        <span className="cartIcon">
                            <FontAwesomeIcon icon={faCartShopping} />
                            <FontAwesomeIcon
                                className="plusIcon"
                                icon={faPlus} />
                        </span>
                    </button>

                    <button
                        className="buyBtn"
                        disabled={product.stock === 0 && cartQuantity === 0}
                        onClick={() => handleBuyNow(product)}
                    >
                        <FontAwesomeIcon icon={faBolt} />
                        {" "}Buy Now
                    </button>

                </div>

            </div>

        </div>
    );
}