import { useDispatch, useSelector } from "react-redux";
import { deleteProductsForAdmin, deleteUsersForAdmin, getProductsForAdmin, getUsersForAdmin } from "../../redux/reducers/adminDashboardReducer";
import { useEffect } from "react";
import Table from "../common/table";

const AdminUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersForAdmin());
    }, [dispatch]);

    const { products } = useSelector(state => state.admin);

    const deleteProduct = (id) => {
        dispatch(deleteUsersForAdmin(id));
    };
    return (<>
        {
            <Table products={products} deleteProduct={deleteProduct}></Table>
        }
    </>);
};

export default AdminUsers;