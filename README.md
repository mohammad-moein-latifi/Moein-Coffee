<p align="center">
  <img src="./public/img/app-logo.png" alt="Moein Coffee Logo" width="220" />
  <img src="./public/img/logo-type.png" alt="Moein Coffee Logo" width="300" />
</p>

<h1 align="center">☕ Moein Coffee — E-commerce Store with Next.js 15</h1>

<p align="center">
  <a href="./README.fa.md">
    <img src="https://img.shields.io/badge/-View%20Persian%20Version-7F3FBF?style=flat-square&logo=google" alt="View Persian README"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/mohammad-moein-latifi/Moein-Coffee?style=flat-square&color=brightgreen" alt="License"/>
  <img src="https://img.shields.io/github/stars/mohammad-moein-latifi/Moein-Coffee?style=flat-square&color=yellow" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/mohammad-moein-latifi/Moein-Coffee?style=flat-square&color=blue" alt="Forks"/>
</p>

---

## 🚀 Project Overview
A modern, responsive e-commerce store built with **Next.js 15**, **React 19** and **TailwindCSS 4**.  
The project follows a modular architecture and features minimalist 3D-ish UI and developer-friendly patterns.

---

## ✨ Features

- 🔐 Secure authentication with JWT (signup, signin, signout, me)  
- 🧺 Guest cart with automatic merge after login  
- ⚡ Fast, seamless UI with optimistic updates  
- 🧩 Clean modular architecture (components, templates, modules, hooks, contexts)  
- ♻️ Shared validation between Frontend and Backend  
- 🌐 Full RTL support and Persian messages  
- 🧪 Seed data for quick local development  
- 🎨 Minimal / modern UI using TailwindCSS  
- 📱 Fully responsive (mobile, tablet, desktop)

---

## 🛠 Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/React%20Query-5.85.5-FF4154?style=plastic&logo=reactquery" alt="React Query 5.85.5">
  <img src="https://img.shields.io/badge/bcryptjs-3.0.2-5A29E4?style=plastic" alt="bcryptjs 3.0.2">
  <img src="https://img.shields.io/badge/jsonwebtoken-9.0.2-FF9900?style=plastic&logo=jsonwebtokens" alt="jsonwebtoken 9.0.2">
  <img src="https://img.shields.io/badge/Mongoose-8.18.0-880000?style=plastic&logo=mongoose" alt="Mongoose 8.18.0">
  <img src="https://img.shields.io/badge/Next.js-15.5.0-000000?style=plastic&logo=next.js" alt="Next.js 15.5.0">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=plastic&logo=react" alt="React 19.1.0">
  <img src="https://img.shields.io/badge/React%20DOM-19.1.0-61DAFB?style=plastic&logo=react" alt="React DOM 19.1.0">
  <img src="https://img.shields.io/badge/React%20Icons-5.5.0-61DAFB?style=plastic&logo=react" alt="React Icons 5.5.0">
  <img src="https://img.shields.io/badge/React%20Toastify-11.0.5-00CFFF?style=plastic&logo=react" alt="React Toastify 11.0.5">
  <img src="https://img.shields.io/badge/Swiper-11.2.10-007AFF?style=plastic&logo=swiper" alt="Swiper 11.2.10">
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=plastic&logo=tailwindcss" alt="TailwindCSS 4">
</div>

---

## 🖼️ Screenshots
<p align="center">
  <img src="./public/img/screenshot-home.png" width="600" alt="Home Page Screenshot"/>
</p>

<p align="center">
  <img src="./public/img/screenshot-cart.png" width="600" alt="Cart Page Screenshot"/>
</p>

---

## 🌐 Live Demo
🔗 [moein-coffee.vercel.app](http://moein-coffee.vercel.app/)

---

## 📚 API Documentation
Full API documentation: [Project_API_Documentation](./docs/Project_API_Documentation.md) 

---

## ⚡ Installation & Run (Backend + Frontend)

```bash
# Install dependencies
npm install
```

### Environment variables
Create a `.env` file in the project root with these values:

```env
MONGO_URL=mongodb://localhost:27017/moein-coffee
AccessTokenSecretKey=test
RefreshTokenSecretKey=test
```

> **Note:** `AccessTokenSecretKey` and `RefreshTokenSecretKey` above are sample/test values. Use strong, secret values in production.

### Import seed data
Import the two JSON files located in `configs/data` into your MongoDB database:

- `moein-coffee.articles.json`
- `moein-coffee.products.json`

Example using `mongoimport` (local MongoDB):
```bash
mongoimport --uri="mongodb://localhost:27017/moein-coffee" --collection=articles --file=./configs/data/moein-coffee.articles.json --jsonArray
mongoimport --uri="mongodb://localhost:27017/moein-coffee" --collection=products --file=./configs/data/moein-coffee.products.json --jsonArray
```

(You can also import via MongoDB Compass or Atlas UI if you prefer.)

### Run in development
```bash
npm run dev
```

### Build for production
```bash
npm run build
npm start
```

---

## 📜 License

This project is published under a custom license: **All Rights Reserved © 2025 Moein Coffee**.  
Any personal, educational or commercial use, distribution or publication without written permission is **prohibited**.

