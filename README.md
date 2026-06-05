# Full Stack Expense Tracker

A complete MERN stack Expense Tracker application built for learning and demonstration purposes.
It features a React frontend (Vite) and an Express + MongoDB backend.

## Features Implemented
- **User Authentication**: Register, Login, JWT Token Authentication, Protected Routes.
- **Expense Management**: Add, Edit, Delete, View Expenses.
- **Search & Filter**: Search expenses by title, filter by category.
- **Dashboard**: View Total Expenses, Current Month Expenses, Recent Transactions, and Expense Charts (Pie & Bar charts using Recharts).
- **Dark Mode**: Toggle Dark/Light Mode with preference persisted in Local Storage.
- **Responsive Design**: Works on mobile and desktop.

## Prerequisites
- Node.js (v16+)
- MongoDB (running locally or a MongoDB Atlas URI)

## Project Setup

1. **Clone/Download** the repository.
2. **Setup Environment Variables**:
   In `backend/.env`, configure:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=supersecretkey123
   NODE_ENV=development
   ```

### Running the Backend

Open a terminal in the `backend` directory:

```bash
cd backend
npm install
node server.js
```

The backend server should start on `http://localhost:5000`.

### Running the Frontend

Open another terminal in the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

The React app should start on `http://localhost:5173`.

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Expenses
- `GET /api/expenses` (Query params: `search`, `category`)
- `POST /api/expenses`
- `GET /api/expenses/:id`
- `PUT /api/expenses/:id`
- `DELETE /api/expenses/:id`

### Dashboard
- `GET /api/dashboard`
