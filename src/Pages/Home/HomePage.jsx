import { useEffect, useState } from "react";

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
        <div>
            {products.map((t) => (
                <div key={t.id}>
                    {t.brand} {t.name} {t.description} {t.amount} {t.storage} {t.price}
                </div>
            ))}
        </div>
    </div>

}
