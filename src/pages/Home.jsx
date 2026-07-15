import Header from "../components/Header";
import Products from '../components/Products';
import Footer from "../components/Footer";
import CartSidebar from '../components/CartSidebar';
import CheckoutModal from '../components/CheckoutModal';
import OrderSuccessModal from '../components/OrderSuccessModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';


export default function Home({

    loading,
    error,

    search,
    setSearch,

    cart,
    totalItems,
    cartTotal,

    filteredProducts,

    isCartOpen,
    openCart,
    closeCart,

    increaseQuantity,
    decreaseQuantity,
    removeFromCart,

    openCheckout,

    isCheckoutOpen,
    closeCheckout,

    checkoutData,
    handleCheckoutChange,
    isFormValid,
    placeOrder,

    checkoutItems,
    checkoutTotal,
    checkoutTotalItems,

    isOrderSuccessOpen,
    closeSuccessModal,
    customerName,

    addToCart,
    handleBuyNow,
    handleCartBuyNow,

    headerRef,
    footerRef

}) {

    return (

        <>
            <Header
                ref={headerRef}
                search={search}
                setSearch={setSearch}
                cart={cart}
                openCart={openCart}
                totalItems={totalItems}
            />

            <CartSidebar 
                cart={cart}
                isCartOpen={isCartOpen}
                closeCart={closeCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                totalItems={totalItems}
                cartTotal={cartTotal}
                removeFromCart={removeFromCart}
                openCheckout={openCheckout}
                handleCartBuyNow={handleCartBuyNow}
            />

            <CheckoutModal
                isCheckoutOpen={isCheckoutOpen}
                closeCheckout={closeCheckout}
                cart={cart}
                totalItems={totalItems}
                cartTotal={cartTotal}
                checkoutData={checkoutData}
                handleCheckoutChange={handleCheckoutChange}
                isFormValid={isFormValid}
                placeOrder={placeOrder}
                checkoutItems={checkoutItems}
                checkoutTotal={checkoutTotal}
                checkoutTotalItems={checkoutTotalItems}
            />


            <OrderSuccessModal 
                isOrderSuccessOpen={isOrderSuccessOpen}
                closeSuccessModal={closeSuccessModal}
                customerName={customerName}
            />

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
                <h2 className="error">{error}</h2> 
            ) : (
                <Products 
                products={filteredProducts} 
                cart={cart}
                addToCart={addToCart}
                handleBuyNow={handleBuyNow}
                />
            )}

            <Footer ref={footerRef} />
        </>

    );

}