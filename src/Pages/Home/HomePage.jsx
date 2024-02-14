import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const searchProducts = async () => {};

  const handleChange = (newText) => {
    setText(newText);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <input
        placeholder="Search"
        type="text"
        onChange={(e) => handleChange(e.target.value)}
      />
      <button onClick={searchProducts}>Search</button>
      <div className="container ">
        {products.map((t) => (
          <Link to="/productPage" key={t.id} className="product_box">
            {t.brand} {t.name} {t.description} {t.amount} {t.storage} {t.price}
          </Link>
        ))}
        <Link to="/loginPage">LoginPage</Link>
      </div>
    </div>
  );
}
