import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isUserSigninSuccessfull, setSigninInfo } from '../../redux/reducers/userSigninReducer';
import '../../styles/signin.css';
const Signin = () => {
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState({
        email: "",
        password: ""
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setError] = useState({});
    const navigate = useNavigate();

    const validateFields = (fields) => {
        let tempErrors = {};
        if (!fields.email) {
            tempErrors['email'] = "Email is required";
        }
        if (!fields.password) {
            tempErrors['password'] = "Password is required";
        }
        return tempErrors;
    };

    const login = (e) => {
        e.preventDefault();
        console.log(inputFields);
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
            axios.post('http://localhost:5000/api/signin', inputFields).then((res) => {
                console.log(res);
                dispatch(isUserSigninSuccessfull(true));
                dispatch(setSigninInfo(inputFields))
                toast.success("Sign in Successfull!");
                navigate("/products");
            }).catch((err) => {
                toast.error(err.response.data.message);

                dispatch(isUserSigninSuccessfull(false));
                console.log(err);
            });
            setIsSubmit(false);
        }
    }, [isSubmit, setError, dispatch, inputFields, navigate, errors]);

    return (<>
        <div className="login-page">
            <div className="form">
                <h3> Login</h3>
                <form className="login-form">
                    <input type="text" onChange={handleChange} name="email" placeholder="Email" required />
                    <p className="error-message">{errors['email']} </p>
                    <input type="password" onChange={handleChange} name="password" placeholder="password" required />
                    <p className="error-message">{errors['password']} </p>
                    <button onClick={login}>login</button>

                </form>
            </div>
        </div>
    </>);
};

export default Signin;