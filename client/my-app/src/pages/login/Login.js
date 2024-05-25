// src/pages/login/Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { login, password }, { withCredentials: true });
    //   hello in console
        
      console.log(response.data); // Assuming server returns user data upon successful login
      // Redirect or do something upon successful login
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Login:</label>
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
