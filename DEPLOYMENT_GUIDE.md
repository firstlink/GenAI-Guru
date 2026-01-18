# Deployment Guide

This guide explains how to deploy the **GenAI-Guru** application. The project is a full-stack application with a **Node.js/Express** backend and a **React/Vite** frontend.

## 🚀 Quick Summary

- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start` (Automatically runs database migrations)
- **Database:** PostgreSQL
- **Recommended Host:** Render.com (Free Tier compatible)

---

## 🛠️ Prerequisites

Before deploying, ensure you have:
1.  **A GitHub Repository**: This codebase should be pushed to GitHub.
2.  **A PostgreSQL Database**: Hosted in the cloud (e.g., Render, Neon, Supabase, or AWS RDS).

---

## 📦 Environment Variables

You must configure the following environment variables in your production environment.

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | **Required.** Connection string for your PostgreSQL DB. | `postgres://user:pass@host:5432/db` |
| `SESSION_SECRET` | **Required.** Secret key for signing session cookies. | `a-very-long-random-string` |
| `CONTACT_EMAIL` | Email to receive contact form submissions. | `admin@example.com` |
| `EMAIL_USER` | Gmail/SMTP user for sending emails. | `admin@example.com` |
| `EMAIL_PASSWORD` | App password for the email user. | `xxxx xxxx xxxx xxxx` |
| `EMAIL_HOST` | SMTP Host. | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP Port. | `587` |
| `ADMIN_PASSWORD` | **Initial** password for the admin account. | `ChangeMe123!` |

> **Security Note:** Never commit `.env` files to your repository.

---

## ☁️ Deploying to Render.com (Recommended)

Render is the easiest way to deploy this specific stack.

### 1. Create a Database
1.  Log in to [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** > **PostgreSQL**.
3.  Name it `genai-guru-db`.
4.  Copy the **Internal Database URL** once created.

### 2. Create the Web Service
1.  Click **New +** > **Web Service**.
2.  Connect your GitHub repository.
3.  **Settings**:
    - **Runtime**: `Node`
    - **Build Command**: `npm install && npm run build`
    - **Start Command**: `npm run start`
4.  **Environment Variables**:
    - Add all variables listed in the [Environment Variables](#-environment-variables) section above.
    - Paste your Database URL into `DATABASE_URL`.

### 3. Verify Deployment
- Wait for the build to finish.
- Render will start the server.
- Visit your URL (e.g., `https://your-app.onrender.com`).

---

## 🧪 Testing Production Build Locally

It is highly recommended to run the production build locally before deploying to catch any build-time errors.

1.  **Build the project:**
    ```bash
    npm run build
    ```
    *This creates a `dist/` folder containing the compiled backend and frontend.*

2.  **Run in production mode:**
    ```bash
    npm run start
    ```
    *This runs the server using `dist/index.cjs`.*

3.  **Verify:**
    Open `http://localhost:5000` (or the port shown in the logs) and verify the app works as expected.

---

## 🔧 Troubleshooting

- **Admin Login Fails:** Ensure `ADMIN_PASSWORD` matches what you are typing. If you already created an admin account, the env var is ignored; use the password currently in the database.
- **Missing Styles/Assets:** Ensure the `npm run build` command completed successfully and no errors were reported during the Vite build step.
- **Database Connection Error:** Verify `DATABASE_URL` is correct and the database is reachable from the hosting provider.
