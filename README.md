# 🚀 Customer Management System

A full-stack web application for managing customer data with authentication, built with React, Node.js, Express, and MongoDB.

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Deployment](#-deployment)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure password hashing with bcrypt

### 👥 Customer Management
- Create, read, update, and delete customers
- Search and filter customers
- Pagination support
- Responsive design

### 🎨 User Interface
- Modern, clean design with Tailwind CSS
- Loading states and animations
- Toast notifications
- Mobile-responsive layout

### 🚀 Performance
- Optimized loading states
- Efficient API calls
- Real-time feedback
- Error handling

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (or local MongoDB instance)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mdtrycursor/iqud-pracicaltest.git
   cd iqud-pracicaltest
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## 🔧 Environment Variables

### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database-name?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration (comma-separated origins)
CORS_ORIGINS=https://your-frontend-domain.com,http://localhost:5173
```

### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Customer Management System
VITE_APP_VERSION=1.0.0
```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   The client will start on `http://localhost:5173`

### Production Mode

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Start the server**
   ```bash
   cd server
   npm start
   ```

## 🌐 Deployment

### Deploy Backend to Render.com

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Web Service**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Add Environment Variables in Render**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key
   - `JWT_EXPIRES_IN`: `7d`
   - `NODE_ENV`: `production`
   - `CORS_ORIGINS`: Your frontend URL

4. **MongoDB Atlas Setup**
   - Create a database user
   - Whitelist IP addresses (use `0.0.0.0/0` for development)
   - Get your connection string

### Deploy Frontend to Vercel/Netlify

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_BASE_URL=https://your-api.onrender.com/api`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Customers
- `GET /api/customers` - Get all customers (protected)
- `POST /api/customers` - Create a new customer (protected)
- `GET /api/customers/:id` - Get a specific customer (protected)
- `PUT /api/customers/:id` - Update a customer (protected)
- `DELETE /api/customers/:id` - Delete a customer (protected)

### Health Check
- `GET /api/health` - Server health check

## 📁 Project Structure

```
customer-management-system/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   └── package.json
├── DEPLOYMENT.md          # Detailed deployment guide
└── README.md
```

## 🚨 Troubleshooting

### Common Deployment Issues

#### 1. **Permission Denied Error**
```
sh: 1: nodemon: Permission denied
```
**Solution**: Make sure `nodemon` is in `dependencies`, not `devDependencies`

#### 2. **Database Connection Failed**
```
❌ Database connection failed: Could not connect to any servers
```
**Solutions**:
- Check your MongoDB Atlas connection string
- Ensure your IP is whitelisted (use `0.0.0.0/0` for development)
- Verify database credentials

#### 3. **CORS Errors**
```
Access to fetch at 'https://your-api.onrender.com' from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solution**: Add your frontend URL to `CORS_ORIGINS` environment variable

#### 4. **Build Failures**
```
Build failed: npm install
```
**Solutions**:
- Check that `Root Directory` is set to `server`
- Ensure all dependencies are in `package.json`
- Check for any syntax errors in your code

### Local Development Issues

1. **Port already in use**
   ```bash
   # Kill process using port 5000
   npx kill-port 5000
   ```

2. **Module not found**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**MD Try Cursor**
- GitHub: [@mdtrycursor](https://github.com/mdtrycursor)
- Repository: [iqud-pracicaltest](https://github.com/mdtrycursor/iqud-pracicaltest)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Express.js](https://expressjs.com/) - The web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - The database used
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework used
- [Render](https://render.com/) - For hosting the backend
- [Vercel](https://vercel.com/) - For hosting the frontend

---

⭐ **Star this repository if you found it helpful!**

## 🔗 Quick Links

- [Live Demo](https://your-app.onrender.com) (Backend)
- [Frontend Demo](https://your-frontend.vercel.app) (Frontend)
- [API Documentation](https://your-app.onrender.com/api/health)
- [Deployment Guide](DEPLOYMENT.md)
