import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Signin from "../components/auth/signin";
import Navbar from "../components/common/navbar";
import Categories from "../components/products/categories";
import Home from "../components/products/home";
import Products from "../components/products/products";
import Cart from "../components/user-info/cart";
import Orders from "../components/user-info/orders";
import Fav from "../components/user-info/fav";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} ></Route>
            <Route path="category/:category" element={<Categories />} ></Route>
            <Route path="signin" element={<Signin />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="fav" element={<Fav />} />
        </Route>
    )
);