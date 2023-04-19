import React, { useContext, useState } from 'react';
import "./Login.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const [error, setError] = useState('');
    const from = location.state?.from?.pathname || "/";
    const [show, setShow] = useState(false);
    const handleLogIn = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                form.reset();
                navigate(from, {replace: true});
            })
            .catch(error => {
                // console.log(error);
                setError(error.message);
            })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogIn} >
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text": "password"} name="password" id="" required />
                </div>
                <p><small className='pointer' onClick={() => setShow(!show)}>{
                    show? "Hide Password" : "Show Password"}</small></p>
                <input type="submit" value="Login" className='btn-submit' />
            </form>
            <p><small>New to ema john? <Link to="/signup">Sign Up</Link></small></p>
            <p className="text-error">{error}</p>
        </div>
    );
};

export default Login;