<img width="472" height="500" alt="login" src="https://github.com/user-attachments/assets/75e9e0b5-3d77-4338-8520-e65403a0f0a1" />
<img width="460" height="587" alt="register" src="https://github.com/user-attachments/assets/7eb2d2dc-96ea-415d-8fab-7ae8d42d3500" />
<img width="1882" height="977" alt="dashboard" src="https://github.com/user-attachments/assets/8cba836f-545b-4a34-b62a-07127b8d4414" />
<img width="1875" height="977" alt="project" src="https://github.com/user-attachments/assets/b5dfabfd-6fe4-4280-aa0f-42bdba7771ed" />
<img width="1877" height="982" alt="tasks" src="https://github.com/user-attachments/assets/0a5ee232-42c7-4bc0-ad21-a846b08efcce" />




# TaskFlow – MERN Stack Project Management Application

TaskFlow is a project and task management application built using the MERN stack. It allows users to manage projects, organize tasks, track progress and monitor deadlines.

## Tech Stack

- Frontend: React.js, Vite
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JWT, bcryptjs
- API Testing: Postman
- Version Control: Git and GitHub

## Features

### Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Logout functionality

### Project Management
- Create projects
- View all personal projects
- Update and delete projects
- Delete associated tasks when a project is deleted

### Task Management
- Create tasks inside projects
- Edit and delete tasks
- Update task status
- Set task priority
- Set due dates

### Task Filters
- Filter tasks by status
- Filter tasks by priority
- Search tasks by title

### Dashboard
- Total projects
- Total tasks
- Completed tasks
- Overdue tasks

## Project Structure

```text
TaskFlow/
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       └── pages/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd TaskFlow
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL provided by Vite.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/projects | Get projects |
| POST | /api/projects | Create project |
| GET | /api/projects/:id | Get single project |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |
| GET | /api/projects/:id/tasks | Get project tasks |
| POST | /api/projects/:id/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| PATCH | /api/tasks/:id/status | Update task status |
| DELETE | /api/tasks/:id | Delete task |
| GET | /api/dashboard/stats | Dashboard statistics |

## Environment Variables

Never upload the actual `.env` file or database credentials to GitHub. Use `.env.example` as a reference.

## Known Bugs

Add any remaining bugs or limitations identified during testing here.

## AI & Resources Used

- ChatGPT: Used for coding guidance, debugging assistance and understanding MERN stack concepts.
- MongoDB documentation and Express/React documentation: Used as learning references.

AI-generated suggestions were reviewed and tested before implementation. One API response-handling suggestion initially assumed a nested response object; after checking the controller response, the code was adjusted to support the actual response structure.

## Author

TaskFlow – MERN Stack Intern Assignment
