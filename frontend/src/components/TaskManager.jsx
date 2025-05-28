import React, { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';

export default function TaskManager({ token, onLogout, onInvalidate }) {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const { authRequest, error: apiError } = useApi('http://localhost:3001', token);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInvalidate = () => {
    onInvalidate(); // set token to invalid
    setError('Token inválido. Redirigiendo al login…');
    // After 2 seconds, perform logout
    setTimeout(() => {
      onLogout();
    }, 2000);
  };

  // Fetch inicial de tareas
  useEffect(() => {
    async function fetchTasks() {
      setLoadingTasks(true);
      try {
        const data = await authRequest('/api/tasks');
        setTasks(data);
      } catch (err) {
        setError(err.message || 'Error al cargar tareas');
      } finally {
        setLoadingTasks(false);
      }
    }
    fetchTasks();
  }, []); // Only run once on mount

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await authRequest('/api/tasks', { method: 'POST', body: JSON.stringify(form) });
      setForm({ title:'', description:'' });
      const data = await authRequest('/api/tasks');
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Error al crear tarea');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      
      <button onClick={onLogout} style={{ float: 'right', margin: '0.5rem' }}>
        Cerrar Sesión
      </button>
      <button onClick={handleInvalidate}>
  Simular Token Inválido
</button>
      <h2>Gestor de Tareas</h2>

      {/* Formulario de creación */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label><br/>
          <input name="title" value={form.title} onChange={handleChange} />
        </div>
        <div>
          <label>Descripción:</label><br/>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Creando...' : 'Crear Tarea'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Lista de tareas */}
      {loadingTasks
        ? <p>Cargando tareas…</p>
        : (
            <ul>
              {tasks.map(t => (
                <li key={t.id}>
                  <strong>{t.title}</strong> — {t.description} ({t.status})
                </li>
              ))}
            </ul>
          )
      }
    </div>
  );
}