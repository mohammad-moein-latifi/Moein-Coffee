<p align="center">
  <img src="./public/img/app-logo.png" alt="Moein Coffee Logo" width="220" />
  <img src="./public/img/logo-type.png" alt="Moein Coffee Logo" width="300" />
</p>

<h1 align="center">☕ فروشگاه اینترنتی Moein Coffee — ساخته‌شده با Next.js 15</h1>

<p align="center">
  <a href="./README.md">
    <img src="https://img.shields.io/badge/-View%20English%20Version-7F3FBF?style=flat-square&logo=google" alt="View English README"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/mohammad-moein-latifi/Moein-Coffee?style=flat-square&color=brightgreen" alt="License"/>
  <img src="https://img.shields.io/github/stars/mohammad-moein-latifi/Moein-Coffee?style=flat-square&color=yellow" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/mohammad-moein-latifi/Moein-Coffee?style=flat-square&color=blue" alt="Forks"/>
</p>

---

## 🚀 معرفی پروژه
یک فروشگاه اینترنتی مدرن و ریسپانسیو ساخته‌شده با **Next.js 15**، **React 19** و **TailwindCSS 4**.  
این پروژه از معماری ماژولار پیروی می‌کند و دارای رابط کاربری مینیمال با جلوه‌های سه‌بعدی سبک و الگوهای توسعه‌پذیر است.

---

## ✨ ویژگی‌ها

- 🔐 احراز هویت امن با JWT (ثبت‌نام، ورود، خروج، استعلام کاربر)  
- 🧺 سبد خرید برای مهمان‌ها و ادغام خودکار پس از ورود  
- ⚡ رابط سریع و یکپارچه با آپدیت‌های خوشبینانه (Optimistic UI)  
- 🧩 معماری تمیز و ماژولار (components, templates, modules, hooks, contexts)  
- ♻️ اعتبارسنجی مشترک بین فرانت‌اند و بک‌اند  
- 🌐 پشتیبانی کامل از RTL و پیام‌های فارسی  
- 🧪 داده‌های Seed برای شروع سریع توسعه محلی  
- 🎨 رابط کاربری مینیمال/مدرن با TailwindCSS + Shadcn/UI  
- 📱 کاملاً ریسپانسیو برای موبایل، تبلت و دسکتاپ

---

## 🛠 تکنولوژی‌ها

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

## 🖼️ اسکرین‌شات‌ها
<p align="center">
  <img src="./public/img/screenshot-home.png" width="600" alt="Home Page Screenshot"/>
</p>

<p align="center">
  <img src="./public/img/screenshot-cart.png" width="600" alt="Cart Page Screenshot"/>
</p>

---

## 🌐 دمو آنلاین
🔗 [مشاهده دمو](https://your-demo-link.com)

---

## ⚡ نصب و اجرا (Backend + Frontend)

```bash
# نصب وابستگی‌ها
npm install
```

### متغیرهای محیطی
یک فایل `.env` در ریشه پروژه ایجاد کنید و مقادیر زیر را وارد نمایید:

```env
MONGO_URL=mongodb://localhost:27017/moein-coffee
AccessTokenSecretKey=test
RefreshTokenSecretKey=test
```

> **تذکر:** مقادیر `AccessTokenSecretKey` و `RefreshTokenSecretKey` نمونه و تستی هستند. در محیط تولید از مقادیر قوی و امن استفاده کنید.

### ایمپورت داده‌های Seed
دو فایل JSON موجود در `configs/data` را به دیتابیس MongoDB وارد کنید:

- `moein-coffee.articles.json`
- `moein-coffee.products.json`

مثال با استفاده از `mongoimport` (برای MongoDB محلی):
```bash
mongoimport --uri="mongodb://localhost:27017/moein-coffee" --collection=articles --file=./configs/data/moein-coffee.articles.json --jsonArray
mongoimport --uri="mongodb://localhost:27017/moein-coffee" --collection=products --file=./configs/data/moein-coffee.products.json --jsonArray
```

(همچنین می‌توانید از MongoDB Compass یا رابط Atlas برای ایمپورت استفاده کنید.)

### اجرای پروژه در حالت توسعه
```bash
npm run dev
```

### ساخت و اجرای Production
```bash
npm run build
npm start
```

---

## 📜 لایسنس

این پروژه تحت لایسنس اختصاصی **"All Rights Reserved © 2025 Moein Coffee"** منتشر شده است.  
-هرگونه استفاده شخصی ، اموزشی ، تجاری و یا انتشار بدون مجوز کتبی **ممنوع** است.  
