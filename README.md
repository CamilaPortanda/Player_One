# Player One Frontend

Frontend desarrollado con React, Vite, React Router, Tailwind CSS y CSS personalizado.

---

# Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Tailwind CSS
- CSS
- JavaScript
- Axios

---

# Instalación del proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/CamilaPortanda/Player_One_Frontend.git
```

## 2. Entrar al proyecto

```bash
cd Player_One_Frontend
```

## 3. Instalar dependencias

```bash
npm install
```

---

# Dependencias instaladas

## Dependencias principales

```bash
npm i react-router-dom
```

## Dependencias de estilos y graficas 

```bash
npm i -D tailwindcss @tailwindcss/vite
npm install axios
npm install react-simple-maps --legacy-peer-deps
npm install chart.js react-chartjs-2 --legacy-peer-deps
```

## Dependencias para decodear token
```bash
npm install jwt-decode
```

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

## Ejemplo

```env
VITE_API_URL=http://localhost:2000
```

---

# Configuración de Tailwind

## vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

---

## Importar Tailwind en CSS principal

```css
@import "tailwindcss";
```

---

# Scripts

## Ejecutar proyecto en desarrollo

```bash
npm run dev
```

## Construir proyecto

```bash
npm run build
```

## Vista previa de producción

```bash
npm run preview
```

---

# Estructura del proyecto

```txt
Player_One_Frontend/
│
├── public/
│   ├── PhoneNumberMetadata.xml
│   └── unity/
│       └── game
│           ├── *.data
│           ├── *loader.js
│           ├── *.wasm
│           └── *.framework.js
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── output.jsx
│   └── index.css
│
├── .env
├── node_modules/
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── eslint.config.js
├── index.html
├── README.md
└── .gitignore
```

---

# Rutas del Frontend

| Ruta | Página | Descripción |
|---|---|---|
| / | MainPage | Página principal del proyecto |
| /signUp | SignUp | Registro de nuevos usuarios |
| /logIn | LogIn | Inicio de sesión |
| /gamePage | GamePage | Página principal del videojuego |
| /dashboard | Dashboard | Dashboard de gráficas para admin | 
| /profilePage | ProfilePage | Página de perfil del usuario |
| /contactPage | ContactPage | Página de contacto de la empresa |
| /productsPage | ProductsPage | Página de productos Rockwell |

---

# Configuración de React Router

```jsx
<Route path="/" element={<MainPage />} />
<Route path="/signUp" element={<SignUp />} />
<Route path="/logIn" element={<LogIn />} />
<Route path="/gamePage" element={<GamePage />} />
<Route path="/profilePage" element={<ProfilePage />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/productsPage" element={<ProductsPage />} />
<Route path="/contactPage" element={<ContactPage />} />
```
---

# Notas importantes

- React Router DOM maneja la navegación entre páginas.
- Tailwind CSS se utiliza para estilos rápidos y responsivos.
- Vite permite una compilación rápida y ligera.
- Las variables de entorno deben iniciar con `VITE_`.

---

# Autor

Player One Team
- Valeria Rosado
- Camila Portanda
- Anna Castro
- Carlos Arias
- Rodrigo Medina
