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
