# 🚀 Deployment Guide - Render.com

This guide will help you deploy your Customer Management System backend to Render.com.

## 📋 Prerequisites

1. **GitHub Repository** - Your code should be pushed to GitHub
2. **MongoDB Atlas Account** - For database hosting
3. **Render Account** - Sign up at [render.com](https://render.com)

## 🔧 Step 1: Prepare Your Repository

### 1.1 Update package.json
Make sure your `server/package.json` has the correct scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'No build step required'"
  }
}
```

### 1.2 Environment Variables
Create a `.env.example` file in your `server` directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
CORS_ORIGINS=https://your-frontend-domain.com,http://localhost:5173
```

## 🌐 Step 2: Deploy to Render

### 2.1 Create New Web Service

1. **Login to Render**
   - Go to [render.com](https://render.com)
   - Sign in with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository: `iqud-pracicaltest`

### 2.2 Configure Build Settings

**Basic Settings:**
- **Name**: `customer-management-api` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`

**Build & Deploy:**
- **Root Directory**: `server` (IMPORTANT!)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 2.3 Environment Variables

Add these environment variables in Render dashboard:

| Key | Value | Description |
|-----|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `your-secret-key` | A strong secret key for JWT |
| `JWT_EXPIRES_IN` | `7d` | JWT expiration time |
| `PORT` | `10000` | Render will set this automatically |
| `NODE_ENV` | `production` | Environment setting |
| `CORS_ORIGINS` | `https://your-frontend.com` | Allowed origins |

## 🗄️ Step 3: MongoDB Atlas Setup

### 3.1 Create Database User
1. Go to MongoDB Atlas
2. Navigate to "Database Access"
3. Click "Add New Database User"
4. Create a user with read/write permissions

### 3.2 Whitelist IP Addresses
1. Go to "Network Access"
2. Click "Add IP Address"
3. Add `0.0.0.0/0` for development (or specific IPs for production)

### 3.3 Get Connection String
1. Go to "Clusters"
2. Click "Connect" → "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with your database name

## 🔍 Step 4: Troubleshooting

### Common Issues:

#### 1. **Permission Denied Error**
```
sh: 1: nodemon: Permission denied
```

**Solution:**
- Make sure `nodemon` is in `dependencies`, not `devDependencies`
- Use `npm start` instead of `npm run dev` for production

#### 2. **Database Connection Failed**
```
❌ Database connection failed: Could not connect to any servers
```

**Solutions:**
- Check your MongoDB Atlas connection string
- Ensure your IP is whitelisted (use `0.0.0.0/0` for development)
- Verify database credentials

#### 3. **CORS Errors**
```
Access to fetch at 'https://your-api.onrender.com' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
- Add your frontend URL to `CORS_ORIGINS` environment variable
- Include both development and production URLs

#### 4. **Build Failures**
```
Build failed: npm install
```

**Solutions:**
- Check that `Root Directory` is set to `server`
- Ensure all dependencies are in `package.json`
- Check for any syntax errors in your code

## 📊 Step 5: Monitor Your Deployment

### 5.1 Health Check
Your API includes a health check endpoint:
```
GET https://your-app.onrender.com/api/health
```

### 5.2 Logs
- View logs in Render dashboard
- Check for any error messages
- Monitor performance metrics

### 5.3 Testing
Test your deployed API:
```bash
# Health check
curl https://your-app.onrender.com/api/health

# Test registration
curl -X POST https://your-app.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## 🔄 Step 6: Auto-Deploy

Render automatically deploys when you push to your main branch. To deploy:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update for deployment"
   git push origin main
   ```
3. Render will automatically build and deploy

## 🌍 Step 7: Frontend Configuration

Update your frontend to use the deployed API:

```env
# client/.env
VITE_API_BASE_URL=https://your-app.onrender.com/api
```

## 📝 Environment Variables Reference

### Required Variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time
- `NODE_ENV` - Environment (production/development)

### Optional Variables:
- `PORT` - Server port (Render sets this automatically)
- `CORS_ORIGINS` - Allowed CORS origins

## 🎉 Success!

Once deployed, your API will be available at:
```
https://your-app-name.onrender.com
```

Your endpoints will be:
- `https://your-app-name.onrender.com/api/health`
- `https://your-app-name.onrender.com/api/auth/register`
- `https://your-app-name.onrender.com/api/auth/login`
- `https://your-app-name.onrender.com/api/customers`

## 🆘 Need Help?

If you encounter issues:
1. Check Render logs in the dashboard
2. Verify all environment variables are set
3. Test your MongoDB connection
4. Check the health endpoint
5. Review this guide for common solutions

---

**Happy Deploying! 🚀**
