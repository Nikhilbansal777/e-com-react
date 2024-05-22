import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { isAdminLoggedIn } from "../../redux/reducers/adminloginReducer";
import { isUserSigninSuccessfull } from "../../redux/reducers/userSigninReducer";
import { isUserSignup } from "../../redux/reducers/userSignupReducer";
import "../../styles/navbar.css";
const Navbar = () => {
    const [subNav] = useState(['All', 'Electronic', 'Mobiles', 'Accessories', 'Fashion']);
    const { isAdminSignedIn } = useSelector(state => state.adminCred);
    const { isSignup } = useSelector(state => state.signup);
    const { isUserSignin } = useSelector(state => state.signin);
    console.log(isAdminSignedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        if (isAdminLoggedIn) {
            dispatch(isAdminLoggedIn(false));
            navigate('/admin-auth');
        }
        if (isSignup) {
            dispatch(isUserSignup(false));
            navigate('/signin');
        }
        if (isUserSignin) {
            dispatch(isUserSigninSuccessfull(false));
            navigate('/signin');
        }
    };
    console.log(isSignup);
    return (
        <>
            {!isAdminSignedIn && <div className="utility-nav d-none d-md-block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="small">logo@example.com | <i className="bx bx-phone"></i> +91-9876543210
                            </p>
                        </div>

                        <div className="col-12 col-md-6 text-right">
                            <p className="small">Free shipping on total of $99 of all products</p>
                        </div>
                    </div>
                </div>
            </div>
            }
            <nav className="navbar navbar-expand-md navbar-light bg-light main-menu" >
                <div className="container">

                    <button type="button" id="sidebarCollapse" className="btn btn-link d-block d-md-none">
                        <i className="bx bx-menu icon-single"></i>
                    </button>

                    <NavLink className="navbar-brand" to="/"> <h4 className="font-weight-bold">Logo</h4> </NavLink>

                    <ul className="navbar-nav ml-auto d-block d-md-none">
                        <li className="nav-item">
                            <NavLink to="/" className="btn btn-link"><i className="fa-cart-shopping"></i><span className="badge badge-danger">3</span></NavLink>
                        </li>
                    </ul>

                    <div className="collapse navbar-collapse">
                        <form className="form-inline my-2 my-lg-0 mx-auto">
                            <input className="form-control" type="search" placeholder="Search for products..." aria-label="Search" />
                            <button className="btn btn-success my-2 my-sm-0" type="submit"><i className="fa fa-search"></i></button>
                        </form>

                        <ul className="navbar-nav">
                            {!isAdminSignedIn && <li className="nav-item">
                                <NavLink to="/cart" className="btn"><i className="fa fa-shopping-cart" style={{ fontSize: '25px' }}></i> <span className="badge badge-danger">3</span></NavLink>
                            </li>}
                            {!isAdminSignedIn && <li className="nav-item ml-md-3">
                                <NavLink to="/fav" className="btn btn-link"><i className="fa fa-bookmark" style={{ fontSize: '23px' }}></i></NavLink>
                            </li>}
                            {!isAdminSignedIn ? (isSignup || isUserSignin && <li className="nav-item ml-md-3">
                                <NavLink to="/orders" className="btn btn-secondary"> <i className="fa fa-shopping-bag"></i> Orders</NavLink>
                            </li>) :
                                <li className="nav-item ml-md-3">
                                    <NavLink to="/addNewProduct" className="btn btn-secondary">Add new Product</NavLink>
                                </li>
                            }
                            {isAdminSignedIn || isSignup || isUserSignin
                                ?
                                <li className="nav-item ml-md-3">
                                    <button onClick={logout} className="btn btn-primary"><i className="fa fa-user"></i> Log out</button>
                                </li>
                                :
                                <li className="nav-item ml-md-3">
                                    <NavLink to="/signin" className="btn btn-primary"><i className="fa fa-user"></i> Log In</NavLink>
                                </li>
                            }
                        </ul>
                    </div>

                </div>
            </nav>

            {!isAdminSignedIn && <nav className="navbar navbar-expand-md navbar-light bg-light sub-menu">
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav mx-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        {subNav.map((nav, index) => {
                            if (nav === 'All') {
                                return (
                                    <li className="nav-item active" key={index}>
                                        <NavLink className="nav-link" to={"/products"}> All </NavLink>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="nav-item" key={index}>
                                        <NavLink className="nav-link" to={`/category/${nav}`}>{nav}</NavLink>
                                    </li>
                                );
                            }
                        })}

                    </ul>
                </div>
            </nav>}
            <Outlet></Outlet>
        </>
    );
};

export default Navbar;