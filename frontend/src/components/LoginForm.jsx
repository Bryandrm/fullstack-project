import React, { useState } from 'react';
import useApi from '../hooks/useApi';

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { request, error: apiError } = useApi('http://localhost:3001');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const data = await request('/api/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      onLogin(data.token);
    } catch {
      setError(apiError || 'No se pudo conectar al servidor');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {(error || apiError) && (
        <p style={{ color: 'red' }}>{error || apiError}</p>
      )}
    </div>
  );
}