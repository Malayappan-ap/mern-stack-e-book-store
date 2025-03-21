// src/components/ProductList.js

import React, { useContext, useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { itemContext } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { products } = useContext(itemContext);
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [selectedType, setSelectedType] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    setSortedProducts([...products]);
  }, [products]);

  const handleSortByPrice = () => {
    const sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  const handleFilterByPriceRange = () => {
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setSortedProducts(filtered);
  };

  const handleFilterByType = () => {
    if (selectedType === "all") {
      setSortedProducts([...products]);
    } else {
      const filtered = products.filter(
        (product) => product.genre === selectedType
      );
      setSortedProducts(filtered);
    }
  };

  const handleBuyNow = () => {
    navigate("/payment");
  };

  return (
    <div className="prdt-list">
      <h2 style={{ color: "green" }}>Book List</h2>
      <div className="filter-btn">
        <button onClick={handleSortByPrice}>Sort by Price</button>
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        <button onClick={handleFilterByPriceRange}>Filter by Price Range</button>
        <label>
          Filter by Genre:
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="History">History</option>
            <option value="Dystopian">Dystopian</option>
          </select>
        </label>
        <button onClick={handleFilterByType}>Filter by Genre</button>
      </div>

      <div className="book-cards">
        {sortedProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      
      <button className="buy-now-btn" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

export default ProductList;
