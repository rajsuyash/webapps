# Deployment Guide

This guide will help you deploy your AI-powered Todo app to Render.

## Prerequisites

1. A GitHub account
2. A Render account (free tier available)
3. Your Neon database connection string

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI-powered Todo app"
   ```

2. Create a new repository on GitHub
3. Connect your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/yourusername/todo-app.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Render

### Option A: Using Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `todo-app`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm start`

5. Add Environment Variables:
   - `DATABASE_URL`: Your Neon database connection string
   - `NODE_ENV`: `production`

6. Click "Create Web Service"

### Option B: Using render.yaml (Blueprint)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Blueprint"
3. Connect your GitHub repository
4. Render will automatically use the `render.yaml` file
5. Configure environment variables as needed

## Step 3: Configure Database

Make sure your Neon database is accessible:

1. In your Neon dashboard, ensure your database allows connections
2. Copy the connection string from Neon
3. Add it to Render's environment variables as `DATABASE_URL`

## Step 4: Deploy and Test

1. Render will automatically build and deploy your app
2. Once deployed, visit your app URL
3. Test the functionality:
   - Add new todos
   - Mark todos as complete
   - Delete todos
   - Search and filter functionality

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in package.json
2. **Database connection fails**: Verify your DATABASE_URL is correct
3. **App doesn't start**: Check the logs in Render dashboard

### Environment Variables:

Make sure these are set in Render:
- `DATABASE_URL`: Your Neon database connection string
- `NODE_ENV`: `production`

## Features Included

✅ Modern Todoist-style UI
✅ Priority levels with visual indicators
✅ Search and filter functionality
✅ Progress tracking
✅ Responsive design
✅ Database persistence with Neon
✅ Smooth animations and transitions

## Support

If you encounter any issues:
1. Check the Render deployment logs
2. Verify your database connection
3. Ensure all environment variables are set correctly