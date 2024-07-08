import { useSelector } from "react-redux";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AddProduct from "../components/admin/addProduct";
import AdminLogin from "../components/admin/admin-login";
import AdminProducts from "../components/admin/admin-products";
import AdminDashBoard from "../components/admin/dashboard";
import Signin from "../components/auth/signin";
import Signup from "../components/auth/signup";
import Navbar from "../components/common/navbar";
import Categories from "../components/products/categories";
import Home from "../components/products/home";
import Products from "../components/products/products";
import Cart from "../components/user-info/cart";
import Checkout from "../components/user-info/checkout";
import Fav from "../components/user-info/fav";
import Orders from "../components/user-info/orders";
import User from "../components/user-info/user";
import AdminUsers from "../components/admin/admin-users";
import AdminOrders from "../components/admin/admin-orders";

const ProtectedRoute = ({ element }) => {
    const { isAdminSignedIn } = useSelector(state => state.adminCred);
    return isAdminSignedIn ? element : <Navigate to="/admin-auth" replace />;
};

const AuthRedirect = ({ element }) => {
    const { isAdminSignedIn } = useSelector(state => state.adminCred);
    return isAdminSignedIn ? <Navigate to="/admin-dashboard" replace /> : element;
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} ></Route>
            <Route path="category/:category" element={<Categories />} ></Route>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="fav" element={<Fav />} />
            <Route path="admin-auth" element={<AuthRedirect element={<AdminLogin />} />} />
            <Route path="admin-dashboard" element={<ProtectedRoute element={<AdminDashBoard />} />} >
                <Route index element={<ProtectedRoute element={<AdminUsers />}></ProtectedRoute>}></Route>
                <Route path="products" element={<ProtectedRoute element={<AdminProducts />}></ProtectedRoute>}></Route>
                <Route path="orders" element={<ProtectedRoute element={<AdminOrders />}></ProtectedRoute>}></Route>
            </Route>
            <Route path="addNewProduct" element={<ProtectedRoute element={<AddProduct />} />} />
            <Route path="user" element={< User />}>
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Route>
    )
);
