// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import api from '../../api';

function Login({ onSwitchToRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const history = useHistory();
  
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5036/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      const resultText = await response.text();
  
      if (!response.ok) {
        console.error('Login error:', resultText);
        setMessage('Login failed: ' + resultText);
        return;
      }
  
      console.log('Login success:', resultText);
      setMessage(resultText); // now this only sets if success
      history.push('/product');
  
    } catch (error) {
      console.error('Could not post data: ', error);
      setMessage('Could not post data: ' + error.message);
    }
  };

 
  

  return (
    <div className="auth-container">
    <h2 className="auth-title">Login</h2>
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        className="auth-input"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        className="auth-input"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button className="auth-button" type="submit">Login</button>
      <p className="auth-message">{message}</p>
    </form>
    <div className="auth-footer">
        <p>Don't have an account?</p>
        <button className="auth-link-button" onClick={onSwitchToRegister}>
        Register
        </button>
        {/* <Link to="/register">Register</Link> */}
       
      </div>
  </div>
  );
}

export default Login;
