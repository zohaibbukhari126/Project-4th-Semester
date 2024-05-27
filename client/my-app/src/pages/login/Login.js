  import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/login', { login, password });
        console.log(response.data); // Assuming server returns user data upon successful login
        console.log('Logging in...');

        // Store token (if any) and navigate to dashboard
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        
        navigate('/user/dashboard');
      } catch (err) {
        setError(err.response?.data?.error || 'Login failed');
      }
    };

    return (
      <div>
        <h2>Login</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Login:</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  export default Login;
