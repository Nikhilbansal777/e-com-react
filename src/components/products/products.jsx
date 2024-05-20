import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/reducers/getProductsReducer";
import ProductCard from "../common/productCard";

const Products = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    const { products } = useSelector(state => state.product);
    console.log(products);
    return (<>
        <ProductCard></ProductCard>
    </>);
};

export default Products;