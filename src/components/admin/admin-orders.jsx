import { useDispatch, useSelector } from "react-redux";
import { deleteProductsForAdmin, getProductsForAdmin } from "../../redux/reducers/adminDashboardReducer";
import Table from "../common/table";
import { useEffect } from "react";

const AdminOrders = () => {
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

export default AdminOrders;