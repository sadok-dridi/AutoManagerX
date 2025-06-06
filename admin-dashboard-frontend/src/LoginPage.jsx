import React, { useState } from 'react';
import axios from "axios";
import './LoginPage.css'

import { FaUser ,FaLock} from "react-icons/fa";




const API_URL = 'http://localhost:5000/api';

const LoginPage = ({ setToken, setIsRegister  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            setToken(res.data.token);
            setError('');
            alert('Login successful!');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="#">Forgot password ? </a>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>

                <div className="register-link">
                    <p>
                        Don't have an account?{' '}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsRegister(true);
                            }}
                        >
                            Register
                        </a>
                    </p>
                </div>
            </form>

        </div>
    );
};

export default LoginPage;
