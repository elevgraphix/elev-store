import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

import { Routes, Route } from 'react-router-dom';

import { useState, useEffect, useMemo, useRef } from 'react'

import './App.css'


const url = "https://dummyjson.com/products?limit=60&skip=20";

function App() {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];

  });


  const [checkoutMode, setCheckoutMode] = useState("cart");


  const [isCartOpen, setIsCartOPen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOPen] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  const [checkoutItems, setCheckoutItems] = useState([]);

  const isFormValid = 
    checkoutData.fullName.trim() &&
    checkoutData.email.trim() &&
    checkoutData.phone.trim() &&
    checkoutData.address.trim();
  
  
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");

  function handleCheckoutChange(e) {
    
    const {name, value} = e.target;

    setCheckoutData(prev => ({
      ...prev,
      [name]: value
    }));

  }

  function placeOrder() {

    setCustomerName(checkoutData.fullName);

    if (checkoutMode === "cart") {

      setCart([]);

    } else {

      setCart(prevCart => 
       
        prevCart.filter(item => item.id !== checkoutItems[0].id)

      );

    }

    setCheckoutData({
      fullName: "",
      email: "",
      phone: "",
      address: ""
    })

    closeCheckout();

    setIsOrderSuccessOpen(true);

    setTimeout(() => {

      setIsOrderSuccessOpen(false);
      setCustomerName(" ");

    }, 5000);

  }

  function closeSuccessModal() {

    setIsOrderSuccessOpen(false);
    setCustomerName("");

  }
  

  function openCart() {
    setIsCartOPen(true);
  }
  
  function closeCart() {
    setIsCartOPen(false);
  }

  function openCheckout() {

    if(cart.length === 0) return;

    setCheckoutMode("cart");
    
    setCheckoutItems(cart);

    closeCart();

    setIsCheckoutOPen(true);
  }

  function closeCheckout() {
    setIsCheckoutOPen(false);
  }


  // Handle Buy Now function
  function handleBuyNow(product) {

    // console.log("BUY NOW CLICKED", product);
    
    if (product.stock === 0) return;

    const cartItem = cart.find(item => item.id === product.id);

    setCheckoutMode("buyNow");

    setCheckoutItems([
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        stock: product.stock,
        quantity: cartItem ? cartItem.quantity : 1
      }
    ]);

    closeCart();
    setIsCheckoutOPen(true);
  }

  function handleCartBuyNow(item) {

    setCheckoutMode("buyNow");

    setCheckoutItems([item]);

    closeCart();

    setIsCheckoutOPen(true);

  }

  const headerRef = useRef(null);
  const footerRef = useRef(null);


  useEffect(() => {

    if(isCartOpen || isCheckoutOpen || isOrderSuccessOpen) {
      
      document.body.style.overflow = "hidden";

    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [isCartOpen, isCheckoutOpen, isOrderSuccessOpen])
  

  function addToCart(product) {

    if (product.stock === 0) return;

    setCart((prevCart) => {

      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {

        return prevCart.map(item => {
          
          if (item.id !== product.id) return item;

          if (item.quantity >= item.stock) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity + 1
          }

        });

      }

      return [

        ...prevCart,

        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          stock: product.stock,
          quantity: 1
        }

      ];

    });

  }

  function increaseQuantity(id) {

    setCart(prevCart => 
      
      prevCart.map(item => {

        if (item.id !== id) return item;

        if (item.quantity >= item.stock) {
          return item;
        }
          
        return  {
          ...item,
          quantity: item.quantity + 1
        };
        
      })

    );

  }

  function decreaseQuantity(id) {

    setCart((prevCart) => 
      
      prevCart.map((item) =>
        
        item.id === id
        ? {
          ...item,
          quantity: item.quantity - 1
        }
        : item

      )
      .filter((item) => item.quantity > 0)

    );

  }

  function removeFromCart(id) {

    setCart((prevCart) =>

      prevCart.filter((item) => item.id !== id)

    );

  }

  async function getProducts() {
    
    try {

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to load products. Please try again later.")
      }

      const data = await response.json();
      
      setProducts(data.products);
      // console.log(data.products);

    } catch (err) {

      console.error(err);

      setError("Unable to load products. Please try again later.");
      
    } finally {

      setLoading(false);

    }
  
  }

  useEffect(() => {

    getProducts();

  }, [])


  useEffect(() => {

    function handleScroll() {

      if (!headerRef.current) return;
      
      if (window.scrollY > 100) {
        headerRef.current.classList.add("active");
      } else {
        headerRef.current.classList.remove("active");
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }

  }, []);


  useEffect(() => {

    if (!headerRef.current || !footerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      
      if(entries[0].isIntersecting && window.scrollY > 100) {
        headerRef.current.style.opacity ="0";
        headerRef.current.style.pointerEvents = "none";
      } else {
        headerRef.current.style.opacity = "1";
        headerRef.current.style.pointerEvents = "auto";
      }

    });

    observer.observe(footerRef.current);

    return () => observer.disconnect();
    
  }, []);
  

  useEffect(() => {

    if (!isCartOpen) return;

    function handleKeyDown(event) {
      
      if(event.key === "Escape") {
        closeCart();
      }

    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }

  }, [isCartOpen]);


  useEffect(() => {

    localStorage.setItem("cart", JSON.stringify(cart));

  }, [cart]);


  const filteredProducts = useMemo(() =>  {

    if(!search.trim()) return products;

    return products.filter((product) => {

      const searchableText = `
        ${product.title}
        ${product.description}
        ${product.category}
      `.toLowerCase();

      console.log(searchableText);

      const keywords = search
        .toLowerCase()
        .trim()
        .split(/\s+/);

      return keywords.every(word => 
        searchableText.includes(word)
      );

    });

  }, [products, search]);
  

  // Cart Calculations
  const totalItems = cart.reduce((total, item) => {

    return total + item.quantity;

  }, 0);

  const cartTotal = cart.reduce((total, item) => {
    
    const price = item.price;
    const quantity = item.quantity;

    return total + (quantity * price)

  }, 0);
  
  // Checkout Calculations
  const checkoutTotal = checkoutItems.reduce((total, item) => {
   
    return total + item.price * item.quantity;

  }, 0);

  const checkoutTotalItems = checkoutItems.reduce((total, item) => {

    return total + item.quantity;

  }, 0);


  return (
    <Routes>

      <Route
        path='/'
        element={

          <Home
      
            loading={loading}
            error={error}
      
            search={search}
            setSearch={setSearch}
      
            cart={cart}
            totalItems={totalItems}
            cartTotal={cartTotal}
      
            filteredProducts={filteredProducts}
      
            isCartOpen={isCartOpen}
            openCart={openCart}
            closeCart={closeCart}
      
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
      
            openCheckout={openCheckout}
      
            isCheckoutOpen={isCheckoutOpen}
            closeCheckout={closeCheckout}
      
            checkoutData={checkoutData}
            handleCheckoutChange={handleCheckoutChange}
            isFormValid={isFormValid}
            placeOrder={placeOrder}
      
            checkoutItems={checkoutItems}
            checkoutTotal={checkoutTotal}
            checkoutTotalItems={checkoutTotalItems}
      
            isOrderSuccessOpen={isOrderSuccessOpen}
            closeSuccessModal={closeSuccessModal}
            customerName={customerName}
      
            addToCart={addToCart}
            handleBuyNow={handleBuyNow}
            handleCartBuyNow={handleCartBuyNow}
      
            headerRef={headerRef}
            footerRef={footerRef}
      
          />

        }
      />
        
      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

    </Routes>

);

}


export default App;