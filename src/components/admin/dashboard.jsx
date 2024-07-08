import { NavLink, Outlet } from 'react-router-dom';
import '../../styles/adminDashboard.css';
const AdminDashBoard = () => {


    return (
        <>
            <nav>
                <ul>
                    <li> <NavLink to="/admin-dashboard">Users</NavLink> </li>
                    <li> <NavLink to="products">Products</NavLink> </li>
                    <li> <NavLink to="orders">Orders</NavLink> </li>
                </ul>
            </nav>
            <Outlet></Outlet>

        </>
    );
};

export default AdminDashBoard;
