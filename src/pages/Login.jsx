import { useState } from "react";
import { useAuth } from "../hooks/index";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/auth/operations";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { isAuthError } = useAuth();
  
    const handleLogin = () => {
        dispatch(logIn({ email, password }));
        navigate('/contacts');
    };

    return (
        <div style={{margin: 50}}>
            <div>Login</div>
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
            {isAuthError && <div>Error occurred while logging in</div>} <br />
            <button onClick={handleLogin}>Login</button> <br />
        </div>
    )
}

export default LoginPage;