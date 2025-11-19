# 🧮 Projex - Project & Task Management Web Application Backend

A backend system for Projex, a task and project management web application.

Frontend: [Projex FE](https://github.com/hazimdanishhh/projex-fe)

---

## 📚 Table of Contents

- [🧮 Projex - Project \& Task Management Web Application Backend](#-projex---project--task-management-web-application-backend)
  - [📚 Table of Contents](#-table-of-contents)
  - [📦 Tech Stack](#-tech-stack)
  - [🚀 Features](#-features)
  - [🧰 Installation \& Setup](#-installation--setup)
  - [🧪 API Overview](#-api-overview)
  - [📝 Test Cases](#-test-cases)
  - [🗂 Folder Structure](#-folder-structure)
  - [⚙️ Environment Variables](#️-environment-variables)
  - [� Authors](#-authors)
  - [📝 License](#-license)

---

## 📦 Tech Stack

- **Node.js** + **Express** (Backend API)
- **MySQL** with **Sequelize** (Database & ORM)
- **JWT Auth** (Access control)

---

## 🚀 Features

- User authentication (JWT-based)
- Role-based access control
- Create/Edit/Delete projects and tasks
- Full API structure for frontend integration
- Modular folder structure using services, controllers, models

---

## 🧰 Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/hazimdanishhh/projex-be
   cd projex-be
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment variables**

   Create a `.env` file:

   - Ensure `CLIENT_ORIGIN` does not have a trailing slash "/".

   ```env
   PORT=5000

   JWT_SECRET_ACCESS=your_secret_key
   JWT_SECRET_REFRESH=your_secret_key
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d

   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name

   NODE_ENV=development

   CLIENT_ORIGIN=front_end_url_without_trailing_slash
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

---

## 🧪 API Overview

**Main Endpoints:**

| Method | Route                     | Description         | Module         | Access         |
| ------ | ------------------------- | ------------------- | -------------- | -------------- |
| POST   | `/api/auth/register`      | Register a new user | Authentication | Public         |
| POST   | `/api/auth/login`         | Login user          | Authentication | Public         |
| POST   | `/api/auth/logout`        | Logout user         | Authentication | Logged In User |
| POST   | `/api/auth/refresh-token` | Verify Session      | Authentication | Public         |
| GET    | `/api/users`              | Get all users       | Users          | Admin          |
| POST   | `/api/admin/create-user`  | Create users        | Users          | Admin          |
| PATCH  | `/api/users/:id`          | Update user         | Users          | Admin          |
| DELETE | `/api/users/:id`          | Delete user         | Users          | Admin          |
| GET    | `/api/users/me`           | Get current user    | Users          | Logged In User |
| PATCH  | `/api/users/me`           | Update current user | Users          | Logged In User |
| DELETE | `/api/users/me`           | Delete current user | Users          | Logged In User |
| GET    | `/api/projects/`          | Get all projects    | Projects       | Logged In User |
| GET    | `/api/projects/:id`       | Get project         | Projects       | Logged In User |
| POST   | `/api/projects/`          | Create project      | Projects       | Logged In User |
| PATCH  | `/api/projects/:id`       | Update project      | Projects       | Logged In User |
| DELETE | `/api/projects/:id`       | Delete project      | Projects       | Logged In User |
| GET    | `/api/tasks/`             | Get all tasks       | Tasks          | Logged In User |
| GET    | `/api/tasks/:id`          | Get task            | Tasks          | Logged In User |
| POST   | `/api/tasks/`             | Create task         | Tasks          | Logged In User |
| PATCH  | `/api/tasks/:id`          | Update task         | Tasks          | Logged In User |
| DELETE | `/api/tasks/:id`          | Delete task         | Tasks          | Logged In User |

---

## 📝 Test Cases

> Full Postman Test Cases -> [test-cases](./POSTMAN.md)

---

## 🗂 Folder Structure

```bash
src/
├── controllers/        # Request handlers
├── services/           # Business logic
├── models/             # Mongoose schemas
├── routes/             # API route definitions
├── middleware/         # Auth, error handlers
├── utils/              # Helpers (e.g. token, validation)
├── config/             # DB and env config
├── index.js            # App entrypoint
```

---

## ⚙️ Environment Variables

| Variable                 | Required | Description                                                               |
| ------------------------ | -------- | ------------------------------------------------------------------------- |
| `PORT`                   | ✅       | Server port                                                               |
| `JWT_SECRET_ACCESS`      | ✅       | Your JWT Secret Key                                                       |
| `JWT_SECRET_REFRESH`     | ✅       | Your JWT Secret Key                                                       |
| `JWT_ACCESS_EXPIRES_IN`  | ✅       | JWT Expiry                                                                |
| `JWT_REFRESH_EXPIRES_IN` | ✅       | JWT Expiry                                                                |
| `DB_HOST`                | ✅       | Your Database Host                                                        |
| `DB_USER`                | ✅       | Your Database User                                                        |
| `DB_PASS`                | ✅       | Your Database Password                                                    |
| `DB_NAME`                | ✅       | Your Database Name                                                        |
| `NODE_ENV`               | ✅       | Node Environment                                                          |
| `CLIENT_ORIGIN`          | ✅       | Front End URL (Ensure `CLIENT_ORIGIN` does not have a trailing slash "/") |

---

## 👤 Authors

- [@danish](https://github.com/hazimdanishhh)

---

## 📝 License

MIT License
