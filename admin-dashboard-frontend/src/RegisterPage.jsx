import React , {useState } from 'react';
import axios from 'axios';
import {FaLock, FaUser} from "react-icons/fa";
import './LoginPage.css'
import { MdEmail } from "react-icons/md";


const API_URL = 'http://localhost:5000/api';

const RegisterPage = ({ setToken, setIsRegister }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Register function triggered');

        try {
            const res = await axios.post(`${API_URL}/auth/register`, { username, email, password });
            setToken(res.data.token);
            setError('');
            setSuccess('Registration successful! You can now login.');
            setTimeout(() => setIsRegister(false), 1000);
        } catch (err) {
            console.error('Registration error:', err.response || err);
            setError(err.response?.data?.message || 'Registration failed');
            setSuccess('');
        }
    };
    return (
        <div className="wrapper">
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className="input-box">
                    <input
                        type="Text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <MdEmail className="icon"/>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className="icon"/>
                </div>

                {error && <p className="error-message">{error}</p>}
                <button type="submit">Register</button>

                <div className="register-link">
                    <p>
                        Already have an account?{' '}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsRegister();
                            }}
                        >
                            Login
                        </a>
                    </p>
                </div>
            </form>

        </div>

    );
};

export default RegisterPage;