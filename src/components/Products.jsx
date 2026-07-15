import ProductCard from "./ProductCard";


export default function Products({
    products,
    cart,
    addToCart,
    handleBuyNow
    
}) {

    return (

        <main className="products">
            {
                products.map((product) => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                        cart={cart}
                        addToCart={addToCart}
                        handleBuyNow={handleBuyNow}
                    />
                ))
            }
        </main>
    );
}