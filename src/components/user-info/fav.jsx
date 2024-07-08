import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistProducts } from "../../redux/reducers/getProductsReducer";
import ProductCard from "../common/productCard";
const Fav = () => {
    const dispatch = useDispatch();
    const { signinInfo } = useSelector(state => state.signin);
    const { wishlist } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getWishlistProducts(signinInfo.email));
    }, []);
    return (<>
        <ProductCard products={wishlist}></ProductCard>
    </>);
};

export default Fav;