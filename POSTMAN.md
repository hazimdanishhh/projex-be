Register User -> POST http://localhost:5000/api/auth/register

```json
{
  "name": "Hazim Danish",
  "username": "hazim",
  "email": "hazim@example.com",
  "password": "password123"
}
```

Login User -> POST http://localhost:5000/api/auth/login

```json
{
  "email": "hazim@example.com",
  "password": "password123"
}
```

Update Logged In User -> PATCH http://localhost:5000/api/users/me

```json
{
  "username": "hazimdanish"
}
```

Delete Logged In User -> DELETE http://localhost:5000/api/users/me

Logout Logged In User -> POST http://localhost:5000/api/logout

---

### ▶ **POST** `/api/projects`

**Create a new project**

```json
{
  "name": "Website Redesign",
  "description": "Redesign the company website with new branding and UX improvements.",
  "status": "active",
  "dueDate": "2025-12-31"
}
```

---

### ▶ **GET** `/api/projects`

**Get all projects for logged-in user**
_(no body needed)_

---

### ▶ **PATCH** `/api/projects/:id`

**Update a project**

```json
{
  "name": "Website Redesign Phase 2",
  "status": "on_hold",
  "dueDate": "2026-01-15"
}
```

---

### ▶ **DELETE** `/api/projects/:id`

**Delete a project**
_(no body needed)_

---

---

## ✅ Task Endpoints

### ▶ **POST** `/api/tasks`

**Create a task under a project**

📌 Must include a valid existing `projectId`.

```json
{
  "projectId": "0aedddea-db13-4f30-91e6-02b083d55b27",
  "title": "Design project logo",
  "description": "Create multiple logo drafts for the client review.",
  "priority": "high",
  "status": "pending",
  "dueDate": "2025-12-01"
}
```

> 🔸 `assignedTo` is optional — you can leave it out if you don’t want to assign it to anyone yet.

---

### ▶ **GET** `/api/tasks`

**Get all tasks (for user's projects)**
_(no body needed)_

---

### ▶ **GET** `/api/tasks/:id`

**Get one specific task by ID**
_(no body needed)_

---

### ▶ **PATCH** `/api/tasks/:id`

**Update a task**

```json
{
  "title": "Design project logo v2",
  "status": "in_progress",
  "priority": "medium",
  "assignedTo": null
}
```

---

### ▶ **DELETE** `/api/tasks/:id`

**Delete a task**
_(no body needed)_

---
