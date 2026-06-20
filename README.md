# Bitora - Compresor de Datos (Huffman y Shannon-Fano)

Este es un proyecto académico diseñado para la materia de Comunicación para analizar, comprimir y comparar textos utilizando los algoritmos de codificación de entropía **Huffman** y **Shannon-Fano**.

La aplicación está construida con una arquitectura desacoplada de Cliente-Servidor:
* **Frontend:** SPA en React estructurada con Vite, Tailwind CSS y componentes visuales interactivos.
* **Backend:** API REST construida con Node.js y Express para la computación teórica y lógica de los algoritmos.

---

## 🚀 Ejecución en Entorno Local

El proyecto está diseñado para funcionar de manera local de forma automática (Zero Config) ya que el cliente de frontend se conecta por defecto al puerto local del servidor si no se especifican variables de entorno.

### Requisitos previos
* Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### Paso 1: Levantar el Servidor (Backend)
1. Abrí una terminal en la raíz del proyecto.
2. Navegá a la carpeta del backend:
   ```bash
   cd backend
   ```
3. Instalá las dependencias:
   ```bash
   npm install
   ```
4. Iniciá el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   *El servidor se ejecutará en: `http://localhost:4000`*

### Paso 2: Levantar la Interfaz (Frontend)
1. Abrí **otra** terminal en la raíz del proyecto.
2. Navegá a la carpeta del frontend:
   ```bash
   cd frontend
   ```
3. Instalá las dependencias:
   ```bash
   npm install
   ```
4. Iniciá el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   *La interfaz se abrirá en tu navegador en: `http://localhost:5173`*

---

## 🛠️ Configuración para Producción (Deploy)

### Backend (Desplegado en Render)
* **Build Command:** `npm install`
* **Start Command:** `npm start`
* **Variables de entorno (Opcionales):**
  * `FRONTEND_URL`: URL del frontend desplegado en Vercel (para limitar accesos CORS de forma segura).

### Frontend (Desplegado en Vercel)
* **Root Directory:** `frontend`
* **Build Command:** `npm run build`
* **Output Directory:** `dist`
* **Variables de entorno (Obligatorias):**
  * `VITE_API_URL`: URL del backend desplegado en Render (ej. `https://tu-api-bitora.onrender.com`).
