// 111
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const AuthForm = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [role, setRole] = useState('user');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/user/login', { login, password });
			if (response.data.token) {
				localStorage.setItem('token', response.data.token);
			}
			navigate('/user/dashboard');
		} catch (err) {
			setError(err.response?.data?.error || 'Login failed');
		}
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/user/register', { login:email, password ,role,name});
			navigate('/user/dashboard');
		} catch (err) {
			setError(err.response?.data?.error || 'Sign-up failed');
		}
	};
  console.log(role);
	return (
		<div
			className={`container ${isSignUp ? 'right-panel-active' : ''}`}
			id='container'
		>
			<div className='form-container sign-up-container'>
				<form onSubmit={handleSignUp}>
					<h1>Create Account</h1>
					<div className='signup-options'>
						<label>
							<input
								type='radio'
								name='signup-option'
								value='gym'
								onChange={(e) => setRole(e.target.value)}
							/>
							<img src='https://i.ibb.co/cNxbLbQ/gym.webp' alt='Gym Icon' /> Gym
						</label>
						<label>
							<input
								type='radio'
								name='signup-option'
								value='user'
								onChange={(e) => setRole(e.target.value)}
							/>
							<img src='https://i.ibb.co/k9Kj97Q/user.jpg' alt='User Icon' />{' '}
							User
						</label>
						<label>
							<input
								type='radio'
								name='signup-option'
								value='admin'
								onChange={(e) => setRole(e.target.value)}
							/>
							<img src='https://i.ibb.co/D8xFDTP/admin.webp' alt='Admin Icon' />{' '}
							Admin
						</label>
					</div>
					<span>or use your email for registration</span>
					<input
						type='text'
						placeholder='Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type='submit'>Sign Up</button>
				</form>
			</div>
			<div className='form-container sign-in-container'>
				<form onSubmit={handleLogin}>
					<h1>Sign in</h1>
					<span>Here</span>
					<input
						type='email'
						placeholder='Email'
						value={login}
						onChange={(e) => setLogin(e.target.value)}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<a href='#'>Forgot your password?</a>
					<button type='submit'>Sign In</button>
				</form>
			</div>
			<div className='overlay-container'>
				<div className='overlay'>
					<div className='overlay-panel overlay-left'>
						<h1>Welcome Back!</h1>
						<p>
							To keep connected with us please login with your personal info
						</p>
						<button className='ghost' onClick={() => setIsSignUp(false)}>
							Sign In
						</button>
					</div>
					<div className='overlay-panel overlay-right'>
						<h1>Welcome to fitness world</h1>
						<p>Enter your personal details and start journey with us</p>
						<button className='ghost' onClick={() => setIsSignUp(true)}>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;