import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/address.css';

const AddProduct = () => {

    const [inputFields, setInputFields] = useState({
        productName: "",
        productImage: "",
        category: "",
        description: "",
        price: "0"
    });
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "productImage" && files) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setInputFields((prevFields) => ({
                    ...prevFields,
                    productImage: reader.result // This is the base64 string
                }));
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[name];
                    return newErrors;
                });
            };
            reader.readAsDataURL(file);
        } else {
            setInputFields({ ...inputFields, [name]: value });
            if (value.trim() !== "") {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        }
    };

    const addProduct = (e) => {
        e.preventDefault();
        setErrors(validateFields(inputFields));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (isSubmit && Object.keys(errors).length === 0) {
            console.log(inputFields);
            axios.post("http://localhost:5000/api/addNewProduct", inputFields).then((res) => {
                console.log(res);
                toast.success(res.data.message);
                navigate('/admin-dashboard');
            }).catch((err) => {
                toast.error(err.response.data.message);
            });
            setIsSubmit(false);
        }
    }, [isSubmit]);

    const validateFields = (values) => {
        const error = {};
        if (!values.productName) {
            error['productName'] = 'Product Name is required';
        }
        if (!values.productImage) {
            error['productImage'] = 'Product Image is required';
        }
        if (!values.category) {
            error['category'] = 'Category is required';
        }
        if (!values.description) {
            error['description'] = 'Description is required';
        }
        if (!values.price) {
            error['price'] = 'Price is required';
        }
        return error;
    };

    return (<>
        <div className="container-checkout">
            <h1>Shipping</h1>
            <p>Please enter your shipping details.</p>
            <hr />
            <form className="form-checkout" onSubmit={addProduct}>
                <div className="fields-checkout">
                    <label className="field-checkout">
                        <span className="field__label" htmlFor="productName">Product Name</span>
                        <input
                            className="field__input-checkout"
                            type="text"
                            name="productName"
                            onChange={handleChange}
                            value={inputFields.productName}
                            placeholder='Product Name'
                        />
                    </label>
                    <p className='error-message'> {errors['productName']} </p>
                </div>
                <label className="field-checkout">
                    <span className="field__label" htmlFor="productImage">Product Image</span>
                    <input
                        className="field__input-checkout"
                        type="file"
                        name="productImage"
                        onChange={handleChange}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </label>
                <p className='error-message'> {errors['productImage']} </p>
                <label className="field-checkout">
                    <span className="field__label" htmlFor="category">Category</span>
                    <select
                        className="field__input-checkout"
                        name="category"
                        onChange={handleChange}
                        value={inputFields.category}
                    >
                        <option value="">Choose Category</option>
                        <option value="United States">Electronic</option>
                        <option value="Mobiles">Mobiles</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Others">Others</option>
                    </select>
                </label>
                <p className='error-message'> {errors['category']} </p>

                <label className="field-checkout">
                    <span className="field__label" htmlFor="price">Price In INR</span>
                    <input
                        className="field__input-checkout"
                        type="number"
                        name="price"
                        onChange={handleChange}
                        value={inputFields.price}
                        placeholder='Price'
                    />
                </label>
                <p className='error-message'> {errors['price']} </p>

                <label className="field-checkout">
                    <span className="field__label" htmlFor="description">Description</span>
                    <textarea
                        className="field__input-checkout"
                        name="description"
                        onChange={handleChange}
                        value={inputFields.description}
                    />
                </label>
                <p className='error-message'> {errors['description']} </p>
                <hr />
                <button className="button" type='submit'>Add Product</button>
            </form>
        </div>
    </>);
};

export default AddProduct;