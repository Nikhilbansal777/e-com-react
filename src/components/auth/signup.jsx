import { NavLink } from 'react-router-dom';
import '../../styles/signin.css'
const Signup = () => {
    return (<>
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                <input type="text" placeholder="name" />
                    <input type="password" placeholder="password" />
                    <input type="text" placeholder="email address" />
                    <button>create</button>
                    <p className="message">Already registered? <NavLink to="/signin">Sign In</NavLink></p>
                </form>
            </div>
        </div></>);
};

export default Signup;