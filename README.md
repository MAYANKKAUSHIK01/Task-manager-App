# Task Manager - Fullstack Web Application


https://github.com/user-attachments/assets/77210b1d-1b96-4432-b7c3-07bd113a7d05


A modern, scalable web application with authentication and CRUD functionality built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: JWT-based registration and login
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Task Management**: Full CRUD operations on tasks
- **Search & Filter**: Real-time search and filter by status/priority
- **Responsive Design**: Beautiful UI with TailwindCSS
- **Security**: Password hashing with bcrypt, JWT token validation
- **RESTful API**: Well-structured backend API

## 📋 Tech Stack

### Frontend
- React 18 with Vite
- React Router v6 for routing
- Axios for API calls
- TailwindCSS for styling
- Context API for state management

### Backend
- Node.js & Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas connection)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file in backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
```

3. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
task-manager-app/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── tasks.js
│   │   │   └── users.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users (Protected)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Tasks (Protected)
- `GET /api/tasks` - Get all tasks (supports filtering)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Register a new account
4. Login with your credentials
5. Create, edit, filter, and delete tasks

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Frontend routes protected with authentication checks
- **Token Validation**: Backend middleware validates JWT tokens
- **CORS Configuration**: Proper CORS setup for API security
- **Input Validation**: Server-side validation for all inputs

## 📈 Scalability Considerations

### Frontend
- Component-based architecture for easy maintenance
- Context API for global state management (can be upgraded to Redux/Zustand)
- Modular service layer for API calls
- Lazy loading can be implemented for route-based code splitting

### Backend
- MVC-like architecture with routes, controllers, and models
- Middleware pattern for authentication
- Database indexing can be added for better query performance
- Can be easily deployed to cloud platforms (AWS, Heroku, Vercel)

### Database
- MongoDB for flexible, scalable document storage
- Mongoose for schema validation and ORM functionality
- Easy to add database replication and sharding as needed

## 🚀 Deployment

### Backend
- Can be deployed to: Heroku, Railway, Render, AWS EC2
- MongoDB: Use MongoDB Atlas for production database

### Frontend
- Can be deployed to: Vercel, Netlify, AWS S3 + CloudFront
- Build for production: `npm run build`

## 📝 Future Enhancements

- Email verification
- Password reset functionality
- Real-time updates using WebSockets
- File attachments for tasks
- Team collaboration features
- Mobile app using React Native
- Advanced analytics dashboard

## 👨‍💻 Developer

Developed as part of Frontend Developer Internship assignment.

## 📄 License

MIT License - feel free to use this project for learning and development.
