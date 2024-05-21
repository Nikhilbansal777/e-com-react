import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isUserSignup, setSignupInfo } from '../../redux/reducers/userSignupReducer';
import '../../styles/signin.css';
const Signup = () => {
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState({
        username: "",
        password: "",
        email: ""
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setError] = useState({});
    const navigate = useNavigate();

    const { signupInfo, isSignup } = useSelector(state => state.signup);

    const validateFields = (fields) => {
        let tempErrors = {};
        if (!fields.username) {
            tempErrors['username'] = "Username is required";
        }
        if (!fields.password) {
            tempErrors['password'] = "Password is required";
        }
        if (!fields.email) {
            tempErrors['email'] = "Email is required";
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
            axios.post("http://localhost:5000/api/signup", inputFields).then(res => {
                dispatch(isUserSignup(true));
                console.log(res);
                toast.success("Signup successfull.");
                dispatch(setSignupInfo(res.data));
                navigate('/products');
            }).catch((err) => {
                toast.error(err.response.data);
                dispatch(isUserSignup(false));
                console.log(err.response.data);

            });
            setIsSubmit(false);
        }
    }, [isSubmit, setError, dispatch, inputFields, navigate, errors]);

    return (<>
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <input type="text" onChange={handleChange} name="username" placeholder="username" required />
                    <p className="error-message">{errors['username']} </p>
                    <input type="password" onChange={handleChange} name="password" placeholder="password" required />
                    <p className="error-message">{errors['password']} </p>

                    <input type="text" onChange={handleChange} name="email" placeholder="email address" required />
                    <p className="error-message">{errors['email']} </p>

                    <button onClick={login}>create</button>
                    <p className="message">Already registered? <NavLink to="/signin">Sign In</NavLink></p>
                </form>
            </div>
        </div></>);
};

export default Signup;