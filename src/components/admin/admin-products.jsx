import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductsForAdmin, getProductsForAdmin } from '../../redux/reducers/adminDashboardReducer';
import Table from "../common/table";

const AdminProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsForAdmin());
    }, [dispatch]);

    const { products } = useSelector(state => state.admin);
    
    const deleteProduct = (id) => {
        dispatch(deleteProductsForAdmin(id));
    };
    return (<>
        {
            <Table products={products} deleteProduct={deleteProduct}></Table>
        }
    </>);
};

export default AdminProducts;