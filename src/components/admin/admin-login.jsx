import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkValues, getAdminCred, isAdminLoggedIn } from "../../redux/reducers/adminloginReducer";
import "../../styles/signin.css";

const AdminLogin = () => {
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState({
        username: "",
        password: ""
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAdminCred());
    }, [dispatch]);

    const { adminCred, isValuesCorrect, errorMessage } = useSelector(state => state.adminCred);
    console.log(adminCred);

    const validateFields = (fields) => {
        let tempErrors = {};
        if (!fields.username) {
            tempErrors['username'] = "Username is required";
        }
        if (!fields.password) {
            tempErrors['password'] = "Password is required";
        }
        return tempErrors;
    };
    const login = (e) => {
        e.preventDefault();
        setError(validateFields(inputFields));
        setIsSubmit(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
        if (value.trim() !== "") {
            setError((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    useEffect(() => {
        if (isSubmit && Object.keys(errors).length === 0) {
            if (inputFields.username === adminCred[0].username && inputFields.password === adminCred[0].password) {
                dispatch(checkValues(false));
                toast.success("Sign in Successfull!");
                dispatch(isAdminLoggedIn(true));
                navigate('/admin-dashboard');
            } else {
                dispatch(checkValues(true));
            }

            setIsSubmit(false);
        }
    }, [isSubmit, setError, adminCred, dispatch, inputFields, navigate, errors]);
    return (<>
        <div className="login-page">
            <div className="form">
                <h3> Admin Login</h3>
                <form className="login-form">
                    <input type="text" onChange={handleChange} name="username" placeholder="username" required />
                    <p className="error-message">{errors['username']} </p>
                    <input type="password" onChange={handleChange} name="password" placeholder="password" required />
                    <p className="error-message">{errors['password']} </p>

                    {isValuesCorrect && <p className="error-message"> {errorMessage}</p>}
                    <button onClick={login}>login</button>

                </form>
            </div>
        </div>
    </>);
};

export default AdminLogin;