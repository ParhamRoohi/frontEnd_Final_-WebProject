import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductPage from "./Pages/Product/ProductPage"
import HomePage from './Pages/Home/HomePage';
import LoginPage from './Pages/Login/LoginPage'
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/productPage",
    element: <ProductPage />
  },
  {
    path: "/loginPage",
  element: <LoginPage />
}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
