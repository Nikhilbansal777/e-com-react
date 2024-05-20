import { useSelector } from "react-redux";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AdminLogin from "../components/admin/admin-login";
import AdminDashBoard from "../components/admin/dashboard";
import Signin from "../components/auth/signin";
import Signup from "../components/auth/signup";
import Navbar from "../components/common/navbar";
import Categories from "../components/products/categories";
import Home from "../components/products/home";
import Products from "../components/products/products";
import Cart from "../components/user-info/cart";
import Fav from "../components/user-info/fav";
import Orders from "../components/user-info/orders";

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
            <Route path="admin-dashboard" element={<ProtectedRoute element={<AdminDashBoard />} />} />
        </Route>
    )
);
