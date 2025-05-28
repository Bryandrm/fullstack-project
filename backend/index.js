const express = require('express');
const cors    = require('cors');
const app     = express();
const port    = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const Joi = require('joi');

const schema = Joi.object({
  name:  Joi.string().required(),
  email: Joi.string().email().required(),
  age:   Joi.number().integer().min(18).required()
});

app.post('/api/validate-user', (req, res) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).json({
      valid: false,
      errors: error.details.map(d => d.message)
    });
  }
  res.json({ valid: true });
});

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mi_clave_secreta_123';

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son obligatorios' });
  }
  // En producción verificarías credenciales en BD; aquí aceptamos todo
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No autorizado' });
    const token = header.split(' ')[1];
    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }

  let tasks = [];

// Crear tarea
app.post('/api/tasks', authenticate, (req, res) => {
  const { title, description, status } = req.body;
  if (!title) return res.status(422).json({ message: 'Title es obligatorio' });
  const task = { id: tasks.length + 1, title, description, status: status || 'pendiente' };
  tasks.push(task);
  res.status(201).json(task);
});

// Listar tareas (opción de filtrar por status)
app.get('/api/tasks', authenticate, (req, res) => {
  const { status } = req.query;
  const list = status ? tasks.filter(t => t.status === status) : tasks;
  res.json(list);
});

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
