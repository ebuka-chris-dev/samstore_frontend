# SamStore Backend API

A RESTful backend service for an e-commerce platform, built with **Node.js, Express and MongoDB**.

The API provides the core backend functionality required for managing users, products and categories, including authentication, product discovery, filtering, pagination, account management and password recovery.

> **Repository:** [samstore_backend](https://github.com/ebuka-chris-dev/samstore_backend)

---

## Overview

SamStore Backend is designed as the server-side foundation of an e-commerce application.

The API separates business domains into dedicated models and route modules:

```text
Users
Products
Categories
```

These resources are exposed through RESTful endpoints and persisted using MongoDB through Mongoose.

The backend also provides authentication and account-management functionality using JWT and bcrypt.

---

## Core Features

### 🔐 Authentication & Account Management

The API supports:

* User/admin registration
* Username/password authentication
* JWT-based authentication tokens
* Password hashing with bcrypt
* Account activation state
* User profile management
* Password changes
* Forgot-password workflow
* Password reset using secure reset tokens

During login, the API creates a JWT containing the user's identity and role with a one-day expiration. Passwords are hashed with bcrypt before being persisted.

---

### 🛍️ Product Management

The product API supports:

* Create product
* Retrieve products
* Retrieve individual product
* Update product
* Delete product
* Product search
* Category filtering
* User filtering
* Pagination
* Product/category population
* Product quantity management
* Featured images
* Multiple product images

The product listing endpoint supports query-based searching and filtering while returning pagination metadata.

---

### 🔎 Product Search & Filtering

Products can be queried using:

```text
q
categoryId
userId
page
perPage
```

Example:

```http
GET /products?q=phone&categoryId=64abc123&page=1&perPage=20
```

Search is performed against product titles using case-insensitive matching.

Category and user filters are validated as MongoDB ObjectIds before being applied.

---

### 📄 Pagination

The product API provides structured pagination information:

```json
{
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 120,
    "totalPages": 6
  }
}
```

The API also limits the maximum number of records returned per request to help prevent unnecessarily large queries.

---

### 🗂️ Category Management

Categories have their own MongoDB model and REST endpoints.

Supported functionality includes:

* Create category
* Retrieve categories
* Duplicate category validation

The API exposes category data through:

```http
GET /category
POST /category
```

---

### 👤 User Management

The backend provides endpoints for:

* Registering users/admin users
* Login
* Listing users
* Searching users
* Retrieving individual users
* Updating user information
* Activating/deactivating accounts
* Changing passwords
* Deleting users
* Password recovery
* Password reset

User listing also supports pagination and username-based search. Sensitive password and password-reset fields are excluded from returned user records.

---

## API Endpoints

### Authentication

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | `/register-admin-user` | Register a user/admin account |
| POST   | `/login`               | Authenticate a user           |
| POST   | `/forgot-password`     | Request password reset        |
| POST   | `/reset-password`      | Reset password                |

### Products

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| POST   | `/product`      | Create product     |
| GET    | `/products`     | Get products       |
| GET    | `/products/:id` | Get single product |
| PUT    | `/products/:id` | Update product     |
| DELETE | `/products/:id` | Delete product     |

The product endpoints include validation for IDs, prices, quantities and categories. Product updates intentionally restrict which fields can be modified, preventing the product owner from being changed through the update payload.

### Categories

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| POST   | `/category` | Create category |
| GET    | `/category` | Get categories  |

### Users

| Method | Endpoint              | Description     |
| ------ | --------------------- | --------------- |
| GET    | `/users`              | Get users       |
| GET    | `/users/:id`          | Get user        |
| PUT    | `/users/:id`          | Update user     |
| PUT    | `/users/:id/password` | Change password |
| DELETE | `/users/:id`          | Delete user     |

---

## Example API Response

Successful product requests return a consistent response structure:

```json
{
  "status": "ok",
  "data": {
    "_id": "64abc123...",
    "title": "Product Name",
    "price": 50000
  }
}
```

Paginated endpoints additionally return:

```json
{
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

## Data Models

### User

The user model supports account information such as:

```text
username
phone
email
password
role
active
passwordResetToken
passwordResetExpires
```

Passwords are stored as bcrypt hashes rather than plaintext values.

---

### Product

Products contain information including:

```text
title
description
price
category
user
featured_image
images
quantity
```

Product records can be populated with their associated user and category.

---

### Category

Categories provide a separate domain model for organizing products.

---

## Project Architecture

```text
samstore_backend/
│
├── models/
│   ├── category.js
│   ├── product.js
│   └── user.js
│
├── routes/
│   ├── index.js
│   └── endpoints/
│       ├── category.js
│       ├── product.js
│       └── user.js
│
├── server.js
├── package.json
├── .gitignore
└── .env
```

The route aggregator keeps resource-specific endpoints separated while exposing them through a single Express router.

---

## Technology Stack

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | JavaScript runtime        |
| Express.js | REST API framework        |
| MongoDB    | Database                  |
| Mongoose   | MongoDB ODM               |
| JWT        | Authentication            |
| bcryptjs   | Password hashing          |
| Nodemailer | Email delivery            |
| dotenv     | Environment configuration |
| CORS       | Cross-origin API access   |

These dependencies are defined in the project's package configuration.

---

## Validation & Error Handling

The API performs server-side validation for important operations.

Examples include:

* Required fields
* Invalid MongoDB ObjectIds
* Invalid product prices
* Invalid quantities
* Duplicate usernames/emails/phone numbers
* Missing authentication credentials
* Invalid passwords
* Missing products/users
* Invalid password-reset requests

The API also returns appropriate HTTP status codes such as:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
409 Conflict
500 Internal Server Error
```

---

## Security Considerations

The backend implements several security-related practices:

* Password hashing using bcrypt
* JWT-based authentication
* JWT expiration
* Sensitive user fields excluded from API responses
* Password reset tokens
* Input validation
* MongoDB ObjectId validation
* Restricted product update fields

For example, user responses explicitly omit password and password-reset fields.

---

## Environment Variables

Create a `.env` file locally:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_username
EMAIL_PASSWORD=your_email_password
```

Use your actual environment variable names when configuring the deployed application.

**Never commit real credentials or secrets to GitHub.**

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ebuka-chris-dev/samstore_backend.git

cd samstore_backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file containing the required configuration.

### 4. Start the server

```bash
npm start
```

---

## API Architecture

The API follows a resource-oriented structure:

```text
Client
  │
  ▼
Express Server
  │
  ├── Authentication
  │
  ├── User Routes
  │
  ├── Product Routes
  │
  └── Category Routes
          │
          ▼
       Mongoose
          │
          ▼
       MongoDB
```

This separation makes it easier to add additional resources and business functionality without placing the entire API inside a single route file.

---

## Engineering Highlights

This project demonstrates practical backend development experience with:

* RESTful API design
* Express.js routing
* MongoDB data modeling
* Mongoose relationships/population
* JWT authentication
* Password hashing
* Password recovery
* Server-side validation
* Search and filtering
* Pagination
* CRUD operations
* Error handling
* Environment-based configuration
* Modular route architecture
* Separation of data models and API routes

---

## What This Project Demonstrates

Rather than being a simple CRUD demonstration, this project covers several concerns commonly encountered when developing production-style APIs:

**Authentication → Authorization concerns → Data modeling → Validation → Search → Filtering → Pagination → Account management → Password recovery → API error handling**

It provides the backend foundation required for a full e-commerce application and can be extended with features such as orders, payments, carts, reviews, inventory management and role-based authorization.

---

## Frontend

The corresponding frontend application can consume this API to provide the user-facing e-commerce experience.

---

## Author

**Ebuka Chris**

Full-Stack JavaScript Developer specializing in:

* React
* Node.js
* Express
* MongoDB
* REST APIs
* Modern JavaScript applications

---

## License

This project is maintained for development and portfolio purposes.
