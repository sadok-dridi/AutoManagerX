import React , {useState } from 'react';
import axios from 'axios';

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
            setTimeout(() => setIsRegister(false), 2000);
        } catch (err) {
            console.error('Registration error:', err.response || err);
            setError(err.response?.data?.message || 'Registration failed');
            setSuccess('');
        }
    };
    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Register</h1>
            <form onSubmit={handleRegister} className="space-y-3">
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2 border rounded" required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
            </form>
            <p className="mt-4 text-center">
                Already have an account?{' '}
                <button onClick={() => setIsRegister(false)} className="text-blue-500 underline">Login</button>
            </p>
        </div>
    );
};

export default RegisterPage;