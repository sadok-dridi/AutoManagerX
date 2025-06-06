import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';






const App = () => {
  const [token, setToken] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

    return (
        <div className="font-sans">
            {isRegister ? (
                <RegisterPage setToken={setToken} setIsRegister={setIsRegister} />
            ) : (
                <LoginPage setToken={setToken} setIsRegister={setIsRegister} />
            )}
        </div>
    );
};

export default App;
