import { useState } from "react";
import ProductCard from "./ProductCard";

function ProductSection() {
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: "boAt Airdopes 141",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300"
    },
    {
      id: 2,
      name: "Samsung Galaxy M34",
      price: 17499,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: 24990,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
    }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <section>
      <h2>Best Sellers</h2>

      <div className="products">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            addToCart={addToCart}
          />
        ))}
      </div>

      <h3>Cart Items: {cart.length}</h3>
    </section>
  );
}

export default ProductSection;