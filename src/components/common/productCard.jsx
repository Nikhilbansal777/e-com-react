import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setWishlist } from "../../redux/reducers/getProductsReducer";

const ProductCard = ({ products }) => {
    const allProducts = products;
    console.log(allProducts);
    const dispatch = useDispatch();
    const { signinInfo } = useSelector(state => state.signin);

    const setWishlistf = (product) => {
        console.log(product);
        const updatedProduct = { ...product, email: signinInfo.email };
        dispatch(setWishlist(updatedProduct));
    };
    
    return (
        <>
            {allProducts.map((product) => {
                return (<div className="container m-4" key={product.id}>
                    <div className="card border-0 rounded-0 shadow" style={{ width: "18rem" }}>
                        <img src={product.productImage} className="card-img-top rounded-0" alt="..." />
                        <div className="card-body mt-3 mb-3">
                            <div className="row">
                                <div className="col-10">
                                    <h4 className="card-title">{product.productName}</h4>
                                    <a className="btn btn-link"><i onClick={() => setWishlistf(product)} className="fa fa-bookmark" style={{ fontSize: '23px' }}></i></a>
                                    <p className="card-text">
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        {product.description}
                                    </p>
                                </div>
                                <div className="col-2" onClick={() => setWishlistf(product)}>
                                    {/* <i className="bi bi-bookmark-plus fs-2"></i> */}
                                    {/* <a onClick={() => setWishlist(product)}>Save</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center text-center g-0">
                            <div className="col-4">
                                <h5>{product.price}</h5>
                            </div>
                            <div className="col-8">
                                <NavLink className="btn btn-dark w-100 p-3 rounded-0 text-warning">ADD TO CART</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                );
            })}
        </>
    );
};

export default ProductCard;