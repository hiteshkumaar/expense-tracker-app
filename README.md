# Expense Tracker App

Hello! Welcome to my Expense Tracker project. I built this app to help people easily track their daily expenses, categorize where their money goes, and view their spending habits through visual charts.

This project is built using the MERN stack (MongoDB, Express, React, and Node.js). 

## What can you do with this app?
- **Create an account & log in**: Everything is securely protected using JWT authentication.
- **Log your expenses**: You can add new expenses with a title, amount (in ₹), category, payment mode (Cash, UPI, Card), and a date.
- **Dashboard insights**: When you log in, you get a clean dashboard showing your total spending, a breakdown of categories using pie and bar charts, and your most recent transactions.
- **Manage history**: You can view your entire expense history, edit past mistakes, or delete records you no longer need.
- **Dark mode**: There's a built-in toggle for dark/light mode depending on your preference!

## Tech Stack
- **Frontend**: React.js (via Vite) + pure CSS for a clean, custom design. I used the `recharts` library for the dashboard charts.
- **Backend**: Node.js and Express.js.
- **Database**: MongoDB (using Mongoose to define the database structure).

---

## How to run this on your own machine

To get this app running on your computer, you'll need to start both the backend server and the frontend React app at the same time.

### 1. Set up the Backend
First, open your terminal and go into the `backend` folder:
```bash
cd backend
npm install
```

Next, you need to tell the server how to connect to a database. Check the `backend/.env` file and make sure it has your MongoDB connection string. It should look something like this:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0.zed3eq5.mongodb.net/ExpenseTracker?retryWrites=true&w=majority
JWT_SECRET=supersecretkey123
NODE_ENV=development
```
*(Note: If you are using MongoDB Atlas in the cloud, just replace the MONGO_URI with your Atlas URL).*

Finally, start the backend server:
```bash
node server.js
```
You should see a message saying "MongoDB connected" and "Server running on port 5000".

### 2. Set up the Frontend
Open a **new** terminal window and go into the `frontend` folder:
```bash
cd frontend
npm install
```

Start the React app:
```bash
npm run dev
```
The terminal will give you a local URL (usually `http://localhost:5173`). Open that link in your browser and you're ready to start tracking your expenses!

---
