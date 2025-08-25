# 📚 API Documentation

------------------------------------------------------------------------

## 📂 Articles API

### GET /api/articles

-   **Description**: دریافت لیست مقالات
-   **Response Example (200)**:

``` json
[
  {
    "_id": "64f123...",
    "title": "Next.js Best Practices",
    "author": "Ali Rezaei",
    "summary": "An overview of Next.js practices",
    "body": "Full content of the article"
  }
]
```

### POST /api/articles

-   **Description**: ایجاد مقاله جدید
-   **Validation**:
    -   `title`: required, string ≤ 200 chars
    -   `author`: required, string ≤ 100 chars
    -   `summary`: required, string ≤ 500 chars
    -   `body`: required, string
-   **Request Example**:

``` json
{
  "title": "Introduction to MongoDB",
  "author": "Sara Ahmadi",
  "summary": "Learn basics of MongoDB",
  "body": "MongoDB is a NoSQL database..."
}
```

-   **Response Example (201)**:

``` json
{
  "message": "Article created successfully",
  "data": {
    "_id": "64f234...",
    "title": "Introduction to MongoDB",
    "author": "Sara Ahmadi",
    "summary": "Learn basics of MongoDB",
    "body": "MongoDB is a NoSQL database..."
  }
}
```

------------------------------------------------------------------------

## 📂 Products API

### GET /api/products

-   **Description**: دریافت لیست محصولات
-   **Response Example (200)**:

``` json
[
  {
    "_id": "650aaa...",
    "name": "Perfume X",
    "price": 250000,
    "shortDescription": "Fresh scent",
    "tags": ["perfume", "men"],
    "isNew": true
  }
]
```

### POST /api/products

-   **Validation**:
    -   `name`, `shortDescription`, `longDescription`, `suitableFor`,
        `smell`, `img`: required, string
    -   `price`, `weight`, `stock`: number ≥ 0
    -   `discount`: number 0--100
    -   `tags`: array of strings
-   **Request Example**:

``` json
{
  "name": "Rose Perfume",
  "price": 300000,
  "shortDescription": "Sweet rose fragrance",
  "longDescription": "Best for daily use",
  "weight": 500,
  "suitableFor": "Women",
  "smell": "Rose",
  "tags": ["perfume", "rose", "women"],
  "img": "/images/rose.png",
  "isNew": true,
  "discount": 10,
  "stock": 100
}
```

-   **Response Example (201)**:

``` json
{
  "message": "Product created successfully",
  "data": {
    "_id": "650bbb...",
    "name": "Rose Perfume",
    "price": 300000
  }
}
```

------------------------------------------------------------------------

## 📂 Users API

### POST /api/users

-   **Description**: ویرایش اطلاعات کاربر (نیازمند لاگین)
-   **Validation**:
    -   `name`: max 50 chars
    -   `email`: valid email
    -   `phone`: Iranian format
-   **Request Example**:

``` json
{
  "name": "Ali Ahmadi",
  "email": "ali@test.com",
  "phone": "09123456789"
}
```

-   **Response Example (200)**:

``` json
{
  "message": "User updated successfully :))"
}
```

------------------------------------------------------------------------

## 📂 Comments API

### GET /api/comments

-   **Description**: دریافت همه نظرات

### POST /api/comments

-   **Validation**:
    -   `username`: required, ≤ 50 chars
    -   `body`: required, ≥ 5 chars
    -   `email`: valid email
    -   `score`: number 1--5
    -   `productID`: required
-   **Request Example**:

``` json
{
  "username": "Mehdi",
  "body": "Very good product",
  "email": "mehdi@test.com",
  "score": 5,
  "productID": "650aaa..."
}
```

-   **Response Example (201)**:

``` json
{
  "message": "Comment created successfully :))",
  "data": {
    "_id": "650ccc...",
    "username": "Mehdi",
    "score": 5
  }
}
```

------------------------------------------------------------------------

## 📂 Auth API

### POST /api/auth/signup

-   **Validation**:
    -   `firstName`, `lastName`: max 50 chars
    -   `username`: starts with letter, 3--30 chars
    -   `email`: valid email
    -   `phone`: Iranian format
    -   `password`: strong password (min 8, uppercase, lowercase,
        number, special char)
-   **Request Example**:

``` json
{
  "firstName": "Ali",
  "lastName": "Rezayi",
  "username": "alirezayi",
  "phone": "09123456789",
  "email": "ali@test.com",
  "password": "StrongPass1@"
}
```

-   **Response Example (201)**:

``` json
{
  "message": "User signed up successfully"
}
```

### POST /api/auth/signin

-   **Request Example**:

``` json
{
  "email": "ali@test.com",
  "password": "StrongPass1@"
}
```

-   **Response Example (200)**:

``` json
{
  "message": "User logged in successfully"
}
```

### POST /api/auth/signout

-   **Response Example (200)**:

``` json
{
  "message": "User logged out successfully"
}
```

### GET /api/auth/me

-   **Response Example (200)**:

``` json
{
  "_id": "650ddd...",
  "firstName": "Ali",
  "email": "ali@test.com",
  "role": "USER"
}
```

------------------------------------------------------------------------

## ✅ Validation Summary

-   **Email**: `user@example.com`
-   **Username**: starts with letter, 3--30 chars (e.g., `ali_reza`)
-   **Name**: ≤ 50 chars
-   **Phone**: Iranian format (`09123456789` or `+989123456789`)
-   **Password**: min 8 chars, upper/lowercase, number, special char
