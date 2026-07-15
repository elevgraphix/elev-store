import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


import { forwardRef } from "react";

const Header = forwardRef(function Header(
    { 
        search,
        setSearch,
        cart,
        openCart,
        totalItems
    },
    ref
) {

    return (
        <header ref={ref} className="header">

            <h1 className="logo" onClick={() => (window.location = "http://localhost:5173")}>Elev Store</h1>
            
            <div className="header-right">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    className="cart-icon"
                    onClick={openCart}
                >

                    <FontAwesomeIcon icon={faCartShopping} />

                    {cart.length > 0 && (
                        <span className="cart-count">
                            {totalItems}
                        </span>
                    )}

                </button>

            </div>

        </header>
    )

})


export default Header;  