import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";

export default function HomePage() {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        try {
            const {data} = await axios.get("http://localhost:3000/products");
            setProducts(data);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return <div>
        <input placeholder="Search" type="text" />
        <button>Search</button>
        <div className="container ">
            {products.map((t) => (
                <link to="/ProductPage" key={t.id} className="product_box">
                    {t.brand} {t.name} {t.description} {t.amount} {t.storage} {t.price}
                </link>
            ))}
        </div>
    </div>

}
