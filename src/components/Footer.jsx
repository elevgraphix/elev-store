import { forwardRef } from "react"



const Footer = forwardRef(function Footer(props, ref) {
    
    return (
        <footer ref={ref} className="footer">

            <div className="footer-container">

                {/* Brand */}

                <div className="footer-column">

                    <h2 className="footer-logo">
                        ElevStore
                    </h2>

                    <p className="footer-text">
                        Discover quality products at unbeatable prices.
                        Shop smarter with our curated collections and
                        enjoy a seamless shopping experience.
                    </p>

                    <div className="social-icons">

                        <a href="#">
                            <i className="fab fa-facebook-f"></i>
                        </a>

                        <a href="#">
                            <i className="fab fa-instagram"></i>
                        </a>

                        <a href="#">
                            <i className="fab fa-x-twitter"></i>
                        </a>

                        <a href="#">
                            <i className="fab fa-linkedin-in"></i>
                        </a>

                    </div>

                </div>

                {/* Quick Links  */}

                <div className="footer-column">

                    <h3>Quick Links</h3>

                    <ul>

                        <li><a href="#">Home</a></li>

                        <li><a href="#">Shop</a></li>

                        <li><a href="#">Categories</a></li>

                        <li><a href="#">Best Sellers</a></li>

                        <li><a href="#">Contact</a></li>

                    </ul>

                </div>

                {/* Support  */}

                <div className="footer-column">

                    <h3>Support</h3>

                    <ul>

                        <li><a href="#">Help Center</a></li>

                        <li><a href="#">Returns</a></li>

                        <li><a href="#">Shipping</a></li>

                        <li><a href="#">Privacy Policy</a></li>

                        <li><a href="#">Terms of Service</a></li>

                    </ul>

                </div>

                {/* Newsletter */}

                <div className="footer-column">

                    <h3>Newsletter</h3>

                    <p className="newsletter-text">
                        Subscribe to receive updates, offers and product news.
                    </p>

                    <form className="newsletter-form">

                        <input
                            type="email"
                            placeholder="Enter your email" required
                        />

                        <button 
                            type="submit"
                            onClick={(e) => e.preventDefault()}
                        >

                            Subscribe

                        </button>

                    </form>

                </div>

            </div>

            <div className="footer-bottom">

                <p>

                    © 2026 ElevStore. Built with HTML, CSS & JavaScript.

                </p>

            </div>

        </footer>
    );

});


export default Footer;