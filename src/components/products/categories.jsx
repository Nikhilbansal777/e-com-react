import { useParams } from "react-router-dom";
import ProductCard from "../common/productCard";

const Categories = () => {
    const { category } = useParams();

    return (
        <>
            {category}
            <ProductCard></ProductCard>
        </>);
};

export default Categories;