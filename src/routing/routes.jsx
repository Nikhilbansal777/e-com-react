import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Navbar from "../components/common/navbar";
import Home from "../components/products/home";
import Products from "../components/products/products";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} ></Route>
        </Route>
    )
);