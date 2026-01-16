# Todo App

A full-stack Todo application built with Node.js, Express, React, and MySQL. Users can register, login, and manage their personal todo tasks with full CRUD operations.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete todo tasks
- **Protected Routes**: Frontend routes protected by authentication
- **Responsive UI**: Modern React interface with Tailwind CSS
- **State Management**: Redux Toolkit for efficient state handling
- **Database Integration**: MySQL database with Sequelize ORM

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL2** - MySQL database driver
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Notification system

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Todo App"
   ```

2. **Set up the Backend**

   ```bash
   cd Backend
   npm install
   ```

   Create a `.env` file in the Backend directory with the following variables:
   ```
   PORT=3000
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=todo_app
   DB_DIALECT=mysql
   JWT_SECRET=your_jwt_secret_key
   ```

   Create the MySQL database:
   ```sql
   CREATE DATABASE todo_app;
   ```

3. **Set up the Frontend**

   ```bash
   cd ../Frontend
   npm install
   ```

## Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npx nodemon app.js
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## API Endpoints

### Authentication
- `POST /user/register` - Register a new user
- `POST /user/login` - Login user
- `POST /user/logout` - Logout user
- `GET /user/getUser` - Get current user info (protected)
- `DELETE /user/delete` - Delete user account (protected)

### Tasks (All protected routes)
- `GET /task` - Get all tasks for the authenticated user
- `POST /task/create` - Create a new task
- `PUT /task/edit/:taskId` - Update a task
- `GET /task/getDetails/:taskId` - Get task details
- `DELETE /task/delete/:taskId` - Delete a task

## Project Structure

```
Todo App/
├── Backend/
│   ├── app.js                 # Main server file
│   ├── package.json
│   ├── config/
│   │   ├── config.json        # Sequelize config
│   │   └── db.js              # Database connection
│   ├── controllers/           # Route controllers
│   ├── middlewares/           # Authentication middleware
│   ├── models/                # Sequelize models
│   ├── routes/                # API routes
│   └── services/              # Business logic services
├── Frontend/
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── main.jsx           # App entry point
│   │   ├── components/        # Reusable components
│   │   ├── features/          # Redux slices
│   │   ├── pages/             # Page components
│   │   └── store/             # Redux store
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## Usage

1. Open the application in your browser
2. Register a new account or login with existing credentials
3. Create, edit, and manage your todo tasks
4. Logout when done