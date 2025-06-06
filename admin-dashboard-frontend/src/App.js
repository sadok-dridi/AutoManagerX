import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import './App.css';






const App = () => {
  const [token, setToken] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [showForm, setShowForm] = useState(true); // Controls fade in/out
    const switchForm = () => {
        setShowForm(false); // Trigger fade-out
        setTimeout(() => {
            setIsRegister((prev) => !prev); // Switch form
            setShowForm(true); // Trigger fade-in
        }, 300); // Must match the fade-out duration
    };

    return (
        <div className="auth-container">
            {isRegister ? (
                <RegisterPage setToken={setToken} setIsRegister={() => setIsRegister(false)}/>
            ) : (
                <LoginPage setToken={setToken} setIsRegister={() => setIsRegister(true)}/>
            )}
        </div>
    );
};

export default App;
