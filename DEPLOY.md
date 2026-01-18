# Deployment Guide for Render.com

Your application is built with a Node.js/Express backend and a React frontend (Vite), using a PostgreSQL database. **Render.com** is the recommended free hosting provider for this stack.

## Prerequisites
1.  **GitHub Account**: Your code must be pushed to a GitHub repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).

## Step 1: Create Database on Render
1.  Go to your Render Dashboard.
2.  Click **New +** -> **PostgreSQL**.
3.  **Name**: `genai-guru-db` (or any name).
4.  **Region**: Choose the one closest to you (e.g., Ohio, Frankfurt).
5.  **Plan**: Select **Free**.
6.  Click **Create Database**.
7.  Wait for it to be created. Then, copy the **Internal Database URL** (we will use this later).

## Step 2: Deploy Web Service
1.  Go to your Render Dashboard.
2.  Click **New +** -> **Web Service**.
3.  Select **Build and deploy from a Git repository**.
4.  Connect your GitHub repository.
5.  **Name**: `genai-guru-web`.
6.  **Region**: Same as your database.
7.  **Branch**: `main` (or `master`).
8.  **Root Directory**: Leave empty (defaults to root).
9.  **Runtime**: **Node**.
10. **Build Command**: `npm install && npm run build`
    *(Render will run this to build your frontend and backend)*
11. **Start Command**: `npm run start`
    *(This runs `NODE_ENV=production node dist/index.cjs`)*
12. **Plan**: Select **Free**.

## Step 3: Configure Environment Variables
Scroll down to the **Environment Variables** section and click **Add Environment Variable**. Add the following:

| Key | Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | *(Paste Internal DB URL)* | The URL from Step 1. |
| `NODE_ENV` | `production` | Tells app to run in prod mode. |
| `SESSION_SECRET` | *(Random String)* | e.g. `complex-secret-key-1234` |
| `CONTACT_EMAIL` | `firstlinkconsultingllc@gmail.com` | Where you receive messages. |
| `EMAIL_USER` | `firstlinkconsultingllc@gmail.com` | Your Gmail address. |
| `EMAIL_PASSWORD` | *(Your App Password)* | Logic from Google Account. |
| `EMAIL_HOST` | `smtp.gmail.com` | Gmail SMTP host. |
| `EMAIL_PORT` | `587` | Gmail SMTP port. |
| `ADMIN_PASSWORD` | *(Your Strong Password)* | Initial admin password. |

> **Note on `ADMIN_PASSWORD`**: This is only used ONCE to create the first admin user. If you change it later in valid admin dashboard, this env var is ignored.

## Step 4: Finish & Deploy
1.  Click **Create Web Service**.
2.  Render will verify your code, build it, and deploy.
3.  This may take 5-10 minutes.
4.  Once live, you will get a URL like `https://genai-guru-web.onrender.com`.

## Accessing Admin Dashboard
1.  Visit `https://your-app-url.onrender.com/admin`
2.  Login with:
    - **Username**: `firstlinkconsultingllc@gmail.com`
    - **Password**: The value you set for `ADMIN_PASSWORD`.
3.  **Recommended**: Go to `/admin/reset-password` (or click Forgot Password) to set a personal secure password immediately.
