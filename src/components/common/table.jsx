const Table = ({ products, deleteProduct }) => {
    return (
        <div className="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return (
                            <tr key={product.id}>
                                <td> <img className='image' src={product.productImage} alt="" /></td>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td><a> <i className='fa fa-edit'></i> </a></td>
                                <td><a onClick={() => deleteProduct(product.id)}> <i className='fa fa-trash'></i> </a></td>
                            </tr>
                        );
                    })}
                </tbody >

            </table>
        </div>
    );
};

export default Table;