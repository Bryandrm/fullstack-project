Este repositorio contiene la solución de la prueba técnica Fullstack, implementada con Node.js/Express en el backend y React en el frontend.

Contenido
- backend/
  - index.js – API REST con validación, JWT y CRUD de tareas
  Endpoints:
    - POST /api/validate-user – valida name, email, age (Joi)
    - POST /api/login – genera JWT
    - POST /api/tasks – crea tarea (protegido)
    - GET  /api/tasks – lista tareas (protegido)
- frontend/
  - src/components/
    - UserForm.jsx – formulario y validación de usuario
    - LoginForm.jsx – formulario de login y gestión de JWT
    - TaskManager.jsx – CRUD de tareas con hook useApi
    - ProductTable.jsx – tabla de productos y sumatoria
  - src/hooks/useApi.js – hook centralizado para llamadas HTTP
  - src/index.css – estilos globales y para la tabla de productos

Instalación y arranque
1. Clona el repositorio:
   git clone [<url-del-repo>](https://github.com/Bryandrm/fullstack-project.git)
   cd proyecto-fullstack

2. Instala dependencias en la raíz y levanta ambos servicios:
   npm install
   npm run dev
   - Backend en http://localhost:3001
   - Frontend en http://localhost:3000

Flujo de uso
1. Validación de usuario
   - Ruta /api/validate-user desde UserForm.jsx, muestra errores de Joi.
2. Login & Sesión
   - LoginForm.jsx envía a /api/login, guarda JWT.
3. Gestión de Tareas
   - TaskManager.jsx crea y lista tareas protegidas por JWT.
4. Listado de Productos
   - ProductTable.jsx muestra productos de ejemplo y sumatoria.

