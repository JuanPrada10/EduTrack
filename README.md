# 📘 EduTrack

Plataforma web fullstack diseñada para gestionar información educativa mediante una arquitectura moderna basada en **React**, **NestJS** y **TypeScript**.

---

## 🚀 Descripción del Proyecto

**EduTrack** es una aplicación fullstack que integra un frontend en **React** con un backend en **NestJS**, construida con el objetivo de practicar arquitectura modular, consumo de APIs, organización de rutas, componentes reutilizables y buenas prácticas con TypeScript.  
El proyecto está enfocado en la gestión de datos educativos (o cualquier tipo de registros) como base para futuras funcionalidades más avanzadas.

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- React  
- TypeScript  
- Tailwind CSS  
- React Router  
- Vite  

### **Backend**
- NestJS  
- TypeScript  
- Arquitectura modular (controladores, servicios, módulos)

### **Herramientas**
- Git & GitHub  
- Node.js  
- npm  

---

## 📂 Estructura del Proyecto

EduTrack/
│
├── backend/
│ ├── src/
│ │ ├── app.controller.ts
│ │ ├── app.service.ts
│ │ └── app.module.ts
│ └── main.ts
│
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.tsx
│ └── main.tsx
└── index.html

yaml
Copiar código

---

## ⚙️ Instalación y Ejecución

### **1️⃣ Clonar el repositorio**
```bash
git clone https://github.com/JuanPrada10/EduTrack
cd EduTrack
2️⃣ Instalar dependencias del backend
bash
Copiar código
cd backend
npm install
```
#Para ejecutar:

```bash
Copiar código
npm run start:dev
http://localhost:3000
```
3️⃣ Instalar dependencias del frontend
```bash
Copiar código
cd ../frontend
npm install
```

```bash
Copiar código
npm run dev
```
## 🧩 Características Principales
- Arquitectura separada en frontend y backend.

- Backend con NestJS, usando controladores, servicios y módulos.

- Frontend en React con componentes reutilizables y rutas.

- Uso completo de TypeScript en ambos entornos.

- Comunicación entre frontend y backend mediante API REST.

- Estructura clara, preparada para añadir futuras funcionalidades
