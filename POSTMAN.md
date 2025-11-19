# POSTMAN Test Cases

---

## AUTHENTICATION API

### Register User -> **POST** `/api/auth/register`

```json
{
  "name": "Hazim Danish",
  "username": "hazim",
  "email": "hazim@example.com",
  "password": "password123"
}
```

### Login User -> **POST** `/api/auth/login`

```json
{
  "email": "hazim@example.com",
  "password": "password123"
}
```

### Update Logged In User -> **PATCH** `/api/users/me`

```json
{
  "username": "hazimdanish"
}
```

### Delete Logged In User -> **DELETE** `/api/users/me`

### Logout Logged In User -> **POST** `/api/logout`

---

## PROJECTS API

### Create Project -> **POST** `/api/projects`

```json
{
  "name": "Website Redesign",
  "description": "Redesign the company website with new branding and UX improvements.",
  "status": "active",
  "dueDate": "2025-12-31"
}
```

### Get All Projects -> **GET** `/api/projects`

### Update Project -> **PATCH** `/api/projects/:id`

```json
{
  "name": "Website Redesign Phase 2",
  "status": "on_hold",
  "dueDate": "2026-01-15"
}
```

### Delete Project -> **DELETE** `/api/projects/:id`

---

## TASKS API

### Create Task **POST** `/api/tasks`

Must include a valid existing `projectId`.

```json
{
  "projectId": "insertProjectId",
  "title": "Design project logo",
  "description": "Create multiple logo drafts for the client review.",
  "priority": "high",
  "status": "pending",
  "dueDate": "2025-12-01"
}
```

### Get All Tasks -> **GET** `/api/tasks`

### Get Task **GET** `/api/tasks/:id`

### Update Task **PATCH** `/api/tasks/:id`

```json
{
  "title": "Design project logo v2",
  "status": "in_progress",
  "priority": "medium"
}
```

### Delete Task -> **DELETE** `/api/tasks/:id`

---
