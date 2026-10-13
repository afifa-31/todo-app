# To-Do List App (MERN + TypeScript)

A full-stack to-do list application built for the Full Stack Development Lab (Experiment 13 mini project).

Users can add tasks, mark them as done, delete them, and filter by All / Active / Done. All data is stored in MongoDB, so it stays after a page refresh.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Axios |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB with Mongoose |

## Features

- Add a new task (button or Enter key)
- Mark a task as completed or active (checkbox)
- Delete a task
- Filter tasks: All, Active, Done
- Remaining task counter
- Data saved in MongoDB (full CRUD through a REST API)

## Project Structure

```
todo-app/
├── client/                  # React frontend
│   ├── src/
│   │   ├── App.tsx
│   │   └── index.css
│   └── package.json
├── server/                  # Express backend
│   ├── src/
│   │   ├── models/Todo.ts
│   │   ├── routes/todos.ts
│   │   └── index.ts
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js (LTS) and npm
- MongoDB Community Server running locally, or a free MongoDB Atlas cluster
- Git (optional)

## How to Run Locally

### 1. Backend

```bash
cd server
npm install
```

Create a file named `.env` inside the `server` folder (copy `.env.example`):

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todo-db
```

Start the server:

```bash
npm run dev
```

You should see `MongoDB connected` and `Server running on http://localhost:5000`.

### 2. Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the link shown in the terminal (usually http://localhost:5173).

Both terminals must stay running.

## API Endpoints

Base URL: `http://localhost:5000/api/todos`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/todos` | Get all tasks |
| POST | `/api/todos` | Create a task (body: `{ "title": "..." }`) |
| PUT | `/api/todos/:id` | Update a task (body: `{ "completed": true }`) |
| DELETE | `/api/todos/:id` | Delete a task |

## How It Works

1. React sends a request to the backend with Axios.
2. Express receives the request and calls the matching route.
3. Mongoose reads or writes the data in MongoDB.
4. The response goes back to React, which updates the screen.

## Environment Variables

| File | Variable | Purpose |
|---|---|---|
| `server/.env` | `PORT` | Port for the Express server |
| `server/.env` | `MONGO_URI` | MongoDB connection string |
| `client/.env` (optional) | `VITE_API_URL` | Backend URL, used when the app is deployed |

## Author

Name: Afifa Afsar
Roll No: 24501A4203