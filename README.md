<p align="center">
  <img src="./public/img/app-logo.png" alt="Moein Coffee Logo" width="220" />
  <img src="./public/img/logo-type.png" alt="Moein Coffee Logo" width="300" />
</p>

<h1 align="center">☕ Moein Coffee — E-commerce Store with Next.js 15</h1>

<p align="center">
  <a href="./README.fa.md">
    <img src="https://badgen.net/badge/-/🔠%20مشاهده%20نسخه%20فارسی/purple?label=&scale=1.2" alt="مشاهده نسخه فارسی"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-All%20Rights%20Reserved-black?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/github/stars/mohammad-moein-latifi/Moein-Coffee?style=flat-square&color=yellow" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/mohammad-moein-latifi/Moein-Coffee?style=flat-square&color=blue" alt="Forks"/>
  <img src="https://img.shields.io/github/v/release/mohammad-moein-latifi/Moein-Coffee?style=flat-square&color=brightgreen" alt="Release"/>
</p>

---

## 🚀 Project Overview
A modern, responsive e-commerce store built with **Next.js 15**, **React 19** and **TailwindCSS 4**.  
The project follows a modular architecture and features minimalist 3D-ish UI and developer-friendly patterns.

---

## ✨ Features

- 🔐 Secure JWT-based authentication (signup, login, logout, session management with access/refresh tokens and httpOnly cookies)  
- 🧺 Guest cart with automatic, idempotent merge upon user login  
- ⚡ Fast UX using Optimistic UI patterns to reduce perceived latency  
- 🧩 Clean, modular architecture (components, templates, modules, hooks, contexts)  
- ♻️ Shared frontend/backend validation with reusable schemas (e.g., Zod/Joi)  
- 🌐 Full RTL support and Persian localization  
- 🧪 Seed data for rapid local development and testing  
- 🎨 Minimal/modern UI built with TailwindCSS; fully responsive  
- 🔗 Versioned private API with OpenAPI docs and auth/cart endpoints  
- 📱 Custom mobile navigation and custom 404 page with accessibility (a11y) and RTL support

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

### 🖥️ Desktop Screens
| Home Page | Products |
|-----------|---------|
| <img src="https://raw.githubusercontent.com/mohammad-moein-latifi/Moein-Coffee/master/screenshots/001-Home-page.png" alt="Home Page Screenshot" /> | <img src="https://raw.githubusercontent.com/mohammad-moein-latifi/Moein-Coffee/master/screenshots/002-Products.png" alt="Products Screenshot" /> | <img src="https://raw.githubusercontent.com/mohammad-moein-latifi/Moein-Coffee/master/screenshots/003-Articles.png" alt="Articles Screenshot" /> |

| Articles | Auth Page |
|---------|-----------|
| <img src="https://raw.githubusercontent.com/mohammad-moein-latifi/Moein-Coffee/master/screenshots/003-Articles.png" alt="Auth Page Screenshot" /> |<img src="https://raw.githubusercontent.com/mohammad-moein-latifi/Moein-Coffee/master/screenshots/004-Auth-page.png" alt="Auth Page Screenshot" /> |

### 📱 Mobile Screens
| Mobile | Mobile Cart | Mobile 404 Page |
|--------|------------|----------------|
| <img src="screenshots/005-Mobile.jpg" alt="Mobile Screenshot" width="250"/> | <img src="screenshots/006-Mobile-cart.jpg" alt="Mobile Cart Screenshot" width="250"/> | <img src="screenshots/007-Mobile-404-page.jpg" alt="Mobile 404 Screenshot" width="250"/> |


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

## 📜 License

© 2025 Moein Coffee — All Rights Reserved.

- This project is released under the proprietary license "All Rights Reserved © 2025 Moein Coffee".
- Any use, reproduction, distribution, modification, or exploitation of this project — whether personal, educational, or commercial — is prohibited without prior written permission from the copyright holder.
- The initial design of this project was inspired by a Figma design published by [Sabzlearn](https://sabzlearn.ir/). The final design has been significantly redesigned and developed by the author.


