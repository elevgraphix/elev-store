import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {

    faCartShopping,
    faSearch,
    faXmark

} from "@fortawesome/free-solid-svg-icons";

import { forwardRef } from "react";
import { Link } from "react-router-dom";

import { useState } from "react";


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

    
    const [searchOpen, setSearchOpen] = useState(false);


    return (
        <header ref={ref} className="header">

            <Link to="/" className="logo" aria-label="Elev Store home">
                <span className="logo-name">Elev</span>
                <span className="logo-type">Store</span>
            </Link>
            
            <div className={`header-right ${searchOpen ? "search-open" : ""}`}>

                <div className="search-wrapper">

                    <button
                        className="search-toggle"
                        onClick={() => setSearchOpen(prev => !prev)}
                        aria-label={searchOpen ? "Close search" : "Open search"}
                    >
                        <FontAwesomeIcon icon={searchOpen ? faXmark : faSearch} />
                    </button>

                    <input
                        type="search"
                        aria-label="Search products"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <button
                    className="cart-icon"
                    onClick={openCart}
                    aria-label={`Shopping cart, ${totalItems} items`}
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