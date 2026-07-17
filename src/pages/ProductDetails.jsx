import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 

    faStar, 
    faArrowLeft, 
    faPlus, 
    faBolt,
    faTruckFast,
    faRotateLeft,
    faShieldHalved

} from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function ProductDetails({

    addToCart,
    handleBuyNow

}) {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedImage, setSelectedImage] = useState("");

    const originalPrice =
        product
            ? product.price / (1 - product.discountPercentage / 100)
            : 0;

    const [quantity, setQuantity] = useState(1);

    function increaseQuantity() {
        setQuantity(prev => prev + 1);
    }

    function decreaseQuantity() {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    }
    
    
    useEffect(() => {
        
        async function getProduct() {
    
            try {
                
                const response = await fetch(
                    `https://dummyjson.com/products/${id}`
                );
    
                if (!response.ok) {
                    throw new Error("Unable to load product.")
                }
    
                const data = await response.json();
    
                setProduct(data);
    
            } catch (err) {
    
                setError(err.message)
    
            } finally{
    
                setLoading(false);
    
            }
    
        }

        getProduct();

    }, [id]);


    useEffect(() => {

        if (product) {
            setSelectedImage(product.images[0]);
        }

    }, [product]);


    if (loading) {
        return <h2>Loading product...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (

        <div className="product-details">

            <button
                className="backBtn"
                onClick={() => navigate(-1)}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Continue Shopping</span>
            </button>

            <div className="product-details-container">

                {/* LEFT COLUMN */}
                <div className="product-images">

                    <div className="discount-badge">
                        -{Math.round(product.discountPercentage)}%
                    </div>

                    <img
                        className="main-image"
                        src={selectedImage}
                        alt={product.title}
                    />

                    <div className="thumbnail-images">

                        {product.images.map((image) => (

                            <img
                                key={image}
                                src={image}
                                alt={`${product.title} Thumbnail`}
                                className={`thumbnail ${
                                    selectedImage === image ? "active" : ""
                                }`}
                                onClick={() => setSelectedImage(image)}
                            />

                        ))}

                    </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="product-content">

                    {/* Header */}
                    <section className="product-header">

                        <h1 className="product-title">
                            {product.title}
                        </h1>

                        <div className="product-rating">
                            <FontAwesomeIcon icon={faStar} />
                            <span>{product.rating.toFixed(1)} / 5</span>
                        </div>

                        <div className="product-meta">

                            <p>
                                <strong>Brand:</strong> {product.brand}
                            </p>

                            <p>
                                <strong>Category:</strong>{" "}
                                <span className="product-category">
                                    {product.category}
                                </span>
                            </p>

                            <p>
                                <strong>SKU:</strong> {product.sku}
                            </p>

                        </div>

                    </section>

                    {/* Pricing */}
                    <section className="product-pricing">

                        <div className="price-section">

                            <h2 className="product-price">
                                ${product.price}
                            </h2>

                            <span className="old-price">
                                ${originalPrice.toFixed(2)}
                            </span>

                            <span className="save-price">
                                Save {Math.round(product.discountPercentage)}%
                            </span>

                        </div>

                        <div
                            className={`product-stock-info ${
                                product.stock === 0
                                    ? "out-of-stock"
                                    : product.stock <= 10
                                    ? "low-stock"
                                    : ""
                            }`}
                        >

                            <span className="stock-dot"></span>

                            <span>

                                {product.stock === 0
                                    ? "Out of Stock"
                                    : product.stock <= 10
                                    ? `Only ${product.stock} left`
                                    : `In Stock (${product.stock} available)`}

                            </span>

                        </div>

                    </section>


                    {/* Purchase */}
                    <section className="product-purchase">

                        <div className="quantity-section">

                            <span>Quantity</span>

                            <div className="quantity-controls">

                                <button onClick={decreaseQuantity}>
                                    −
                                </button>

                                <span>{quantity}</span>

                                <button onClick={increaseQuantity}>
                                    +
                                </button>

                            </div>

                        </div>

                        <div className="product-buttons">

                            <button
                                className="cartBtn"
                                onClick={() => addToCart(product)}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Add to Cart</span>
                            </button>

                            <button
                                className="buyBtn"
                                onClick={() => handleBuyNow(product)}
                            >
                                <FontAwesomeIcon icon={faBolt} />
                                <span>Buy Now</span>
                            </button>

                        </div>

                    </section>

                </div>

            </div>


            {/* Description */}
                
            <section className="details-card product-information">
                
                <h2 className="details-title">Description</h2>

                <p className="product-description">
                    {product.description}
                </p>

            </section>
            

            {/* Card Shipping */}

            <section className="details-card shipping-card">
                
                <h2 className="details-title">Shipping & Returns</h2>

                <div className="shipping-item">

                    <span className="shipping-icon">
                        <FontAwesomeIcon icon={faTruckFast}/>
                    </span>

                    <div>
                        <h4>Free Delivery</h4>
                        <p>Estimated delivery: 2–5 business days</p>
                    </div>

                </div>

                <div className="shipping-item">

                    <span className="shipping-icon">
                        <FontAwesomeIcon icon={faRotateLeft}/>
                    </span>

                    <div>
                        <h4>Free Returns</h4>
                        <p>30-day return policy</p>
                    </div>

                </div>

                <div className="shipping-item">

                    <span className="shipping-icon">
                        <FontAwesomeIcon icon={faShieldHalved}/>
                    </span>

                    <div>
                        <h4>Secure Checkout</h4>
                        <p>100% protected payments</p>
                    </div>

                </div>

            </section>
            

            {/* Specifications */}

            <section className="details-card specifications-card">

                <h2 className="details-title">
                    Specifications
                </h2>

                <div className="specifications-grid">

                    <div className="spec-item">
                        <span>Brand</span>
                        <strong>{product.brand}</strong>
                    </div>

                    <div className="spec-item">
                        <span>Category</span>
                        <strong>{product.category}</strong>
                    </div>

                    <div className="spec-item">
                        <span>SKU</span>
                        <strong>{product.sku}</strong>
                    </div>

                    <div className="spec-item">
                        <span>Weight</span>
                        <strong>{product.weight} g</strong>
                    </div>

                    <div className="spec-item">
                        <span>Dimensions</span>
                        <strong>
                            {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} mm
                        </strong>
                    </div>

                    <div className="spec-item">
                        <span>Warranty</span>
                        <strong>{product.warrantyInformation}</strong>
                    </div>

                    <div className="spec-item">
                        <span>Shipping</span>
                        <strong>{product.shippingInformation}</strong>
                    </div>

                    <div className="spec-item">
                        <span>Availability</span>
                        <strong>{product.availabilityStatus}</strong>
                    </div>

                </div>

            </section>

            {/* Reviews */}

            <section className="details-card reviews-card">

                <h2 className="details-title">
                    Customer Reviews
                </h2>
                
                {product.reviews.length > 0? (
                    
                    <div className="reviews-list">

                        {product.reviews.map((review) => (

                            <div
                                key={`${review.reviewerEmail}-${review.date}`}
                                className="review-item"
                            >

                                <div className="review-header">

                                    <div>

                                        <h4>{review.reviewerName}</h4>

                                        <small>
                                            {new Date(review.date).toLocaleDateString()}
                                        </small>

                                    </div>

                                    <div className="review-rating">

                                        <FontAwesomeIcon icon={faStar} />

                                        <span>{review.rating} / 5</span>

                                    </div>

                                </div>

                                <p className="review-comment">
                                    {review.comment}
                                </p>

                            </div>

                        ))}

                    </div>
                ) : (
                    <p>No reviews yet</p>
                )}
                

            </section>

        </div>
    );
}