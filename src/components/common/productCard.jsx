import { NavLink } from "react-router-dom";

const ProductCard = () => {
    return (
        <>
            <div className="container m-4">
                <div className="card border-0 rounded-0 shadow" style={{ width: "18rem" }}>
                    <img src="https://codingyaar.com/wp-content/uploads/bag-scaled.jpg" className="card-img-top rounded-0" alt="..." />
                    <div className="card-body mt-3 mb-3">
                        <div className="row">
                            <div className="col-10">
                                <h4 className="card-title">Product title</h4>
                                <p className="card-text">
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    (123)
                                </p>
                            </div>
                            <div className="col-2">
                                <i className="bi bi-bookmark-plus fs-2"></i>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center text-center g-0">
                        <div className="col-4">
                            <h5>$129</h5>
                        </div>
                        <div className="col-8">
                            <NavLink to="/cart" className="btn btn-dark w-100 p-3 rounded-0 text-warning">ADD TO CART</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;