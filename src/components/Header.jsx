import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { forwardRef } from "react";
import { Link } from "react-router-dom";


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

            <Link to="/" className="logo">
                Elev Store
            </Link>
            
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