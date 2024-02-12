import { useState } from "react";
// import { Link } from "react-router-dom";

export default function ProductPage(){
    const [products, setProducts] = useState([]);
    const editProducts = async () => {
        try {
            const {data} = await axios.put("http://localhost:3000/products/:id");
            setProducts(data);
        }
        catch (error) {
            console.log(error);
        }
    };
    const handleSend = () => {
        post('/productsPage', { text })
      }
}