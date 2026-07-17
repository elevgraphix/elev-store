import Products from '../components/Products';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleNotch, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


export default function Home({

    loading,
    error,
    filteredProducts,
    cart,
    addToCart,
    handleBuyNow

}) {

    return (

        <>
            { loading ? (

                <div className='loading'>

                    <h3>Preparing your shopping experience...</h3>
                    
                    <div className="loader">

                        <span className="loader-dot"></span>
                        <span className="loader-dot"></span>
                        <span className="loader-dot"></span>

                    </div>
                
                </div>

            ) : error ? (

                <div className="error">    

                    <div className="error-icon">
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                    </div>

                    <h2>Oops! We couldn't load the products.</h2>

                    <p>
                        Something went wrong while trying to load our products.
                        Please check your internet connection and try again.
                    </p>

                    <button
                        className="retryBtn"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>

                </div>


            ) : (
                <Products 
                products={filteredProducts} 
                cart={cart}
                addToCart={addToCart}
                handleBuyNow={handleBuyNow}
                />
            )}
        </>

    );

}