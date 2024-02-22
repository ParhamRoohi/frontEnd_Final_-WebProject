import { useEffect, useState } from "react";
import { get } from "../../utils/httpClient";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import Card from "@mui/material/Card";


export default function SalesPage() {
//   const [products, setProducts] = useState([]);
//   const [selectedProductId, getProductID] = useState([]);
const [product, setProducts] = useState([]); // Initially set to null
const [selectedProductId, setSelectedProductId] = React.useState([]);


// function fetchProductDetails(productId) {
//     // Replace with your actual product fetching logic
//     return fetch(`http://localhost:3000/products/${selectedProductId}`)
//       .then(response => response.json());
//   }
  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/products/${selectedProductId}`);
      setSelectedProductId();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

    
  return <div>{product && <Card product={product} ></Card>}
  <Link to = "/">HomePage</Link></div>;
// return(
//     <div></div>
// );

 };
