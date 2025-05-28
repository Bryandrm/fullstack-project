import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ProductTable from './components/ProductTable';
import './App.css';
import UserForm from './components/UserForm';
import TaskManager from './components/TaskManager';
import logo from './logo.svg';

function App() {
  const [token, setToken] = useState(null);
  const [stage, setStage] = useState('validate');  // 'validate' | 'login' | 'app'

  const sampleProducts = [
    { name: 'Producto A', price: 12.5 },
    { name: 'Producto B', price: 8.75 },
    { name: 'Producto C', price: 5.0 },
  ];

  return (
    <div className="App">
      {stage === 'validate' && (
        <>
          <h2>Validación del Usuario</h2>
          <UserForm onSuccess={() => setStage('login')} />
        </>
      )}

      {stage === 'login' && !token && (
        <>
          <h2>Login</h2>
          <LoginForm onLogin={t => { setToken(t); setStage('app'); }} />
        </>
      )}

      {stage === 'app' && token && (
        <>
          <TaskManager
            token={token}
            onLogout={() => { setToken(null); setStage('login'); }}
            onInvalidate={() => setToken('invalid.token.value')}
          />
          <ProductTable products={sampleProducts} />
        </>
      )}
    </div>
  );
}

export default App;