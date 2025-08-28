# Football Fantasy – Backend API

API backend para una plataforma de Fantasy Football, construida con **Flask** y Firestore (Firebase).

---

## 🚀 Tecnologías principales
- **Python 3.10+**
- **Flask** – framework web ligero
- **Firestore (Firebase)** – base de datos NoSQL en la nube
- **JWT (JSON Web Tokens)** – autenticación segura
- **Werkzeug** – hashing de contraseñas
- **Pytest / Unittest** – pruebas unitarias

---

## ⚡ Funcionalidades clave
- Registro de usuario (sign-up)
- Inicio de sesión (login)
- Autenticación basada en JWT
- Operaciones protegidas:
  - Consultar y editar información de usuario
  - Editar equipo propio (añadir, remover, sustituir jugadores)
  - Consultar jugadores disponibles y equipo armado

---

## 📦 Requisitos
- Python 3.10 o superior
- Proyecto Firebase con **Firestore habilitado**
- Clave de servicio de Firebase (`.json`)
- Variables de entorno configuradas:

```bash
FIREBASE_KEY_PATH=path/a/tu/firebase_key.json
JWT_SECRET_KEY=tu_clave_secreta_para_JWT
```

---

## 🛠️ Instalación y configuración
1. Clona este repositorio  
   ```bash
   git clone https://github.com/DaniGomAris/football_fantasy-back.git
   cd football_fantasy-back
   ```

2. Crea y activa un entorno virtual  
   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   venv\Scripts\activate     # Windows
   ```

## 📌 Endpoints principales

### 🔹 Registro (Sign-Up)

```
POST /signup
Headers: Content-Type: application/json
Body:
{
  "name": "Tu Nombre",
  "email": "ejemplo@correo.com",
  "password": "tu_contraseña",
  "username": "usuario123"
}
```

### 🔹 Inicio de sesión (Login)
```
POST /login
Body:
{
  "userOrEmail": "usuario123 o ejemplo@correo.com",
  "password": "tu_contraseña"
}
```
➡️ Devuelve un **JWT** en una cookie de autenticación.

### 🔹 Consultar usuario
```
GET /user
Headers: Authorization: Bearer <tu_JWT>
```

### 🔹 Editar usuario
```
PUT /user
Body:
{
  "info": "Enum {Password, UserName, Name}",
  "currentPassword": "contraseña_actual",
  "newValue": "nuevo_valor"
}
```

### 🔹 Obtener jugadores
```
POST /players
Body:
{
  "sortType": "Enum {Default, PointSort, CostSort, NameSort, WebName}",
  "sortOrder": "Enum {Descending, Ascending}",
  "position": "Enum {Default, Goalkeepers, Defenders, Midfielders, Forwards}",
  "search": "nombre_a_buscar",
  "paginationPage": número,
  "paginationLength": número,
  "teamID": número (0 para todos los equipos)
}
```

### 🔹 Editar equipo
```
PUT /team
Body:
{
  "action": "Enum {Add, Remove, Substitution}",
  "id_1": id_jugador1,
  "id_2": id_jugador2 // solo para 'Substitution'
}
```

### 🔹 Consultar equipo
```
POST /team
Body:
{
  "type": "Enum {Any, Fixed, Substitutes}",
  "position": "Enum {Default, Goalkeepers, Defenders, Midfielders, Forwards}"
}
```

---

## 🧪 Testing
Ejecuta las pruebas unitarias con:

```bash
pytest
# o
python -m unittest discover tests
```

---

## 📌 Buenas prácticas de Git
- Ignorar archivos sensibles en `.gitignore` (`.env`, claves Firebase, etc.)
- Crear ramas para nuevas funcionalidades
- Abrir Pull Requests hacia `main` para revisión

---

## 🚀 Futuras mejoras
- Migración a **Argon2 o bcrypt** para hashing de contraseñas
- Documentación con **Swagger / OpenAPI**
- Validación de datos con **Pydantic o Marshmallow**
- Integración continua (CI/CD) para despliegues automáticos

---

## 👨‍💻 Autor
Proyecto desarrollado por **[@DaniGomAris](https://github.com/DaniGomAris)**  
Uso educativo y libre adaptación.

---
