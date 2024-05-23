import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryProducts } from "../../redux/reducers/getProductsReducer";
import ProductCard from "../common/productCard";

const Categories = () => {
    const { category } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoryProducts(category));
    }, [category]);
    const { categories } = useSelector(state => state.product);
    // console.log(products);
    return (
        <>
            {category}
            <ProductCard products={categories}></ProductCard>
        </>);
};

export default Categories;