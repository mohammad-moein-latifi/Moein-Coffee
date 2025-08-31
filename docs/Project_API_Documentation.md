# 📚 API Documentation

---

**Base URL:** `http://localhost:3000/api`

---

## 📂 Articles API

### GET `/articles`

- **Description**: دریافت لیست مقالات
- **Response Example (200)**

```json
[
  {
    "_id": "68aec83c414cc9de6175284c",
    "img": "/img/blogs/blog-2.png",
    "author": "محمّد معین لطیفی",
    "title": "6 روش دم‌آوری که هر قهوه‌دوستی باید بداند",
    "summary": "مروری دوستانه و عملی روی V60، فرنچ‌پرس، ایروپرس، کمکس و اسپرسو؛ هر روش چه ویژگی‌ای دارد و برای چه طعمی مناسب است؛ نکات کوتاه برای نتیجه بهتر در خانه . . .",
    "body": "در این مقاله به ۶ روش محبوب دم‌آوری قهوه می‌پردازیم: از V60 و کمکس گرفته تا اسپرسو و ایروپرس. هر روش شخصیت و ویژگی خاصی دارد؛ مثلاً فرنچ‌پرس بدنه و روغن بیشتری به فنجان شما می‌دهد، در حالی که V60 به شما طعمی شفاف و میوه‌ای ارائه می‌کند. دانستن ویژگی‌های هر روش کمک می‌کند تا بر اساس ذائقه و موقعیت، بهترین انتخاب را داشته باشید. همچنین نکاتی عملی برای بهبود کیفیت دم‌آوری در خانه مطرح می‌کنیم تا تجربه لذت‌بخش‌تری از قهوه داشته باشید."
  }
]
```

---

### POST `/articles`

- **Description**: ایجاد مقاله جدید
- **Validation**
  - `img`: required, string
  - `title`: required, string ≤ 200 chars
  - `author`: required, string ≤ 100 chars
  - `summary`: required, string ≤ 500 chars
  - `body`: required, string
- **Request Example**

```json
{
  "img": "/img/blogs/blog-2.png",
  "author": "محمّد معین لطیفی",
  "title": "6 روش دم‌آوری که هر قهوه‌دوستی باید بداند",
  "summary": "مروری دوستانه و عملی روی V60، فرنچ‌پرس، ایروپرس، کمکس و اسپرسو؛ هر روش چه ویژگی‌ای دارد و برای چه طعمی مناسب است؛ نکات کوتاه برای نتیجه بهتر در خانه . . .",
  "body": "این مقاله به بررسی روش‌های مختلف دم‌آوری قهوه و تأثیر آن‌ها بر طعم نهایی فنجان شما می‌پردازد."
}
```

- **Response Example (201)**

```json
{
  "message": "Article created successfully",
  "data": {
    "_id": "68aec83c414cc9de6175284c",
    "img": "/img/blogs/blog-2.png",
    "author": "محمّد معین لطیفی",
    "title": "6 روش دم‌آوری که هر قهوه‌دوستی باید بداند",
    "summary": "مروری دوستانه و عملی روی V60، فرنچ‌پرس، ایروپرس، کمکس و اسپرسو؛ هر روش چه ویژگی‌ای دارد و برای چه طعمی مناسب است؛ نکات کوتاه برای نتیجه بهتر در خانه . . .",
    "body": "این مقاله به بررسی روش‌های مختلف دم‌آوری قهوه و تأثیر آن‌ها بر طعم نهایی فنجان شما می‌پردازد."
  }
}
```

---

## 📂 Products API

### GET `/products`

- **Description**: دریافت لیست محصولات (همراه با جزئیات و نظرات)
- **Response Example (200)**

```json
[
  {
    "_id": "68aec83c414cc9de6175284b",
    "img": "/img/products/p1.png",
    "name": "Moein Coffee – Royal Espresso",
    "shortDescription": "اسپرسویی پرقدرت با عطر و طعمی عمیق، مناسب برای عاشقان قهوه‌های کلاسیک …",
    "longDescription": "Royal Espresso ترکیبی منحصر‌به‌فرد از دانه‌های عربیکا و روبوستا است که…",
    "price": 395000,
    "weight": 250,
    "smell": 9,
    "score": 3,
    "stock": 30,
    "discount": 0,
    "isSpecial": false,
    "isNew": true,
    "comments": [],
    "notes": ["chocolate", "caramel", "nutty"],
    "combinations": [
      {
        "type": "Top Notes",
        "percentage": 40,
        "origins": ["Brazil", "Ethiopia"]
      },
      {
        "type": "Base Notes",
        "percentage": 60,
        "origins": ["India", "Vietnam"]
      }
    ],
    "finalPrice": 395000,
    "createdAt": "2025-08-27T08:56:28.614+00:00",
    "updatedAt": "2025-08-27T08:56:28.614+00:00",
    "__v": 0
  }
]
```

---

### POST `/products`

- **Validation**
  - `name`, `shortDescription`, `longDescription`, `img`: required, string
  - `price`, `weight`, `stock`: number ≥ 0
  - `discount`: number 0–100
  - `score`: number 1–5
  - `smell`: number 1–10
  - `notes`: array of strings
  - `combinations`: array of objects `{ type, percentage, origins }`
- **Request Example**

```json
{
  "img": "/img/products/p1.png",
  "name": "Moein Coffee – Royal Espresso",
  "shortDescription": "اسپرسویی پرقدرت با عطر و طعمی عمیق، مناسب برای عاشقان قهوه‌های کلاسیک …",
  "longDescription": "Royal Espresso ترکیبی منحصر‌به‌فرد از دانه‌های عربیکا و روبوستا است که برای دم‌آوری اسپرسوی قوی طراحی شده است.",
  "price": 395000,
  "weight": 250,
  "smell": 9,
  "score": 3,
  "stock": 30,
  "discount": 0,
  "isSpecial": false,
  "isNew": true,
  "notes": ["chocolate", "caramel", "nutty"],
  "combinations": [
    {
      "type": "Top Notes",
      "percentage": 40,
      "origins": ["Brazil", "Ethiopia"]
    },
    {
      "type": "Base Notes",
      "percentage": 60,
      "origins": ["India", "Vietnam"]
    }
  ]
}
```

- **Response Example (201)**

```json
{
  "message": "Product created successfully",
  "data": {
    "_id": "68aec83c414cc9de6175284b",
    "name": "Moein Coffee – Royal Espresso",
    "price": 395000,
    "shortDescription": "اسپرسویی پرقدرت با عطر و طعمی عمیق، مناسب برای عاشقان قهوه‌های کلاسیک …"
  }
}
```

- **Notes**:
  - `finalPrice` به صورت خودکار بر اساس تخفیف محاسبه می‌شود.
  - `combinations` نشان‌دهنده درصد و منشأ دانه‌های قهوه است.

---

## 📂 Users API

### POST `/users`

- **Description**: ویرایش اطلاعات کاربر (نیازمند لاگین)
- **Validation**:
  - `name`: max 50 chars
  - `email`: valid email
  - `phone`: Iranian format
- **Request Example**

```json
{
  "name": "Ali Ahmadi",
  "email": "ali@test.com",
  "phone": "09123456789"
}
```

- **Response Example (200)**

```json
{
  "message": "User updated successfully :))"
}
```

---

## 📂 Comments API

### GET `/comments`

- **Description**: دریافت همه نظرات

### POST `/comments`

- **Validation**:
  - `username`: required, ≤ 50 chars
  - `body`: required, ≥ 5 chars
  - `email`: valid email
  - `score`: number 1–5
  - `productID`: required
- **Request Example**

```json
{
  "username": "Mehdi",
  "body": "Very good product",
  "email": "mehdi@test.com",
  "score": 5,
  "productID": "650aaa..."
}
```

- **Response Example (201)**

```json
{
  "message": "Comment created successfully :))",
  "data": {
    "_id": "650ccc...",
    "username": "Mehdi",
    "score": 5
  }
}
```

---

## 📂 Auth API

### POST `/auth/signup`

- **Validation**:
  - `firstName`, `lastName`: max 50 chars
  - `username`: starts with letter, 3–30 chars
  - `email`: valid email
  - `phone`: Iranian format
  - `password`: strong password (min 8, uppercase, lowercase, number, special char)
- **Request Example**

```json
{
  "firstName": "Ali",
  "lastName": "Rezayi",
  "username": "alirezayi",
  "phone": "09123456789",
  "email": "ali@test.com",
  "password": "StrongPass1@"
}
```

- **Response Example (201)**

```json
{
  "message": "User signed up successfully"
}
```

---

### POST `/auth/signin`

- **Request Example**

```json
{
  "email": "ali@test.com",
  "password": "StrongPass1@"
}
```

- **Response Example (200)**

```json
{
  "message": "User logged in successfully"
}
```

---

### POST `/auth/signout`

- **Response Example (200)**

```json
{
  "message": "User logged out successfully"
}
```

---

### GET `/auth/me`

- **Response Example (200)**

```json
{
  "_id": "650ddd...",
  "firstName": "Ali",
  "email": "ali@test.com",
  "role": "USER"
}
```

- **Notes**:
  - برای احراز هویت از JWT Token استفاده می‌شود.
  - توکن باید در هدر Authorization ارسال شود.

---

## ✅ Validation Summary

- **Email**: `user@example.com`
- **Username**: starts with letter, 3–30 chars (e.g., `ali_reza`)
- **Name**: ≤ 50 chars
- **Phone**: Iranian format (`09123456789` or `+989123456789`)
- **Password**: min 8 chars, upper/lowercase, number, special char
