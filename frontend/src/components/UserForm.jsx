import React, { useState } from 'react';

export default function UserForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    try {
      const res = await fetch('http://localhost:3001/api/validate-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          age: Number(form.age),
        }),
      });

      const data = await res.json();

      if (res.status === 422) {
        setErrors(data.errors);
      } else if (data.valid) {
        setSuccess(true);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setErrors(['Error de conexión con el servidor']);
    }
  };

  return (
    <div>
      <h2>Validación del Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br/>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label><br/>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Edad:</label><br/>
          <input name="age" type="number" value={form.age} onChange={handleChange} />
        </div>
        <button type="submit">Validar</button>
      </form>

      {errors.length > 0 && (
        <div style={{ color: 'red' }}>
          <h4>Errores:</h4>
          <ul>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      {success && <div style={{ color: 'green' }}>¡Datos válidos!</div>}
    </div>
  );
}