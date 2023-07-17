import { useState } from "react";
import { useAuth } from "../hooks/index";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/operations";
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate ();
    const { isAuthError } = useAuth();

    const handleRegister = () => {
        dispatch(register({ email, password, name }));
        navigate('/contacts');
    };

    return (
        <div style={{margin: 50}}>
            <div>Register</div>
            <input 
                type="text" 
                placeholder="Please enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            /> <br/>
            <input 
                type="email" 
                placeholder="Please enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            /> <br/>
            <input 
                type="password" 
                placeholder="Please enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            /> <br/>
            <div style={{width: 150}}><PasswordStrengthBar password={password} /></div>
            {isAuthError && <div>Error occurred while register</div>} <br />
            <button onClick={handleRegister}>Register</button> <br />
        </div>
    )
}

export default RegisterPage;