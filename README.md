# 📸 Node Express React Simple File Upload

This repository — **/node-express-react-simple-fileupload** — is a **complete full-stack web application** demonstrating how to build a modern **React (Vite)** frontend and a **Node.js + Express** backend that work together to **upload and serve images**.

It’s a great starter project for developers learning **JavaScript full-stack development**, **file upload APIs**, and **frontend-backend integration** using REST.

---

## Project Overview

This project includes both backend and frontend components:

### Backend — Node.js + Express API
The backend is built using **Express.js** and provides REST API endpoints for handling image uploads:
- `POST /api/upload` — accepts image uploads and saves them to `/uploads`.
- `GET /api/images` — lists all uploaded image file paths.
- `GET /api/hello` — returns a simple “Hello World!” message for testing.
- Handles file storage using **Multer**.
- Responds with proper **HTTP status codes** and descriptive error messages.
- Supports **CORS** for cross-origin requests from React (port 5173).

### Frontend — React + Vite
The frontend is built using **React with Vite** for lightning-fast development and hot reloading.  
It includes:
- A **file picker** button for selecting images.
- A **read-only input** showing the selected filename.
- An **Upload** button that posts the file to `/api/upload`.
- Upload progress and success/error message handling.
- Clean, minimal UI powered by **React Hooks**.

---

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **Multer** — for file upload handling
- **CORS** — for enabling cross-origin access
- **JavaScript (ES Modules)**

### Frontend
- **React.js**
- **Vite**
- **Fetch API**
- **HTML5 + CSS3**
- **React Hooks (`useState`)**

---

## Getting Started

Follow these simple steps to clone, set up, and run the project locally.

### Clone the Repository & start the backend
```bash
git clone https://github.com/cptdanko/node-express-react-simple-fileupload.git
cd node-express-react-simple-fileupload
npm install
node server.js
```

Backend runs on: http://localhost:3000

### Start the Frontend (Vite)


```bash
npm run dev
```
Frontend runs on: http://localhost:5173

💡 Tip: The Vite proxy in vite.config.js forwards /api calls to http://localhost:3000 — no CORS errors during local development.

## API Endpoints

| Method | Endpoint      | Description                             |
| ------ | ------------- | --------------------------------------- |
| GET    | `/api/hello`  | Returns a “Hello World” JSON response.  |
| POST   | `/api/upload` | Uploads an image and stores it on disk. |
| GET    | `/api/images` | Lists all uploaded image file paths.    |

## About the Author

Built by Bhuman Soni
 —
Software Engineer • AI Enthusiast • Full Stack Developer

Explore more of my work:

🔗 GitHub: https://github.com/cptdanko

📝 Blog: https://mydaytodo.com/blog/

Popular articles on AI, JavaScript, and Machine Learning:

Building Neural Networks in JavaScript

Creating a Journey Planner App with ReactJS

Building Secure APIs with Spring Boot and JWT

# Summary

The /node-express-react-simple-fileupload repository is a beginner-friendly, SEO-optimized full stack project showcasing how to connect a React (Vite) frontend with a Node.js + Express backend to handle file uploads, static hosting, and API integration.

This project is perfect for developers who want to:

Learn REST API development in Express

Handle file uploads using Multer

Integrate React with a Node.js backend

Build deployable full stack applications

⭐ Star this repository if you found it useful!
👉 Follow me at https://github.com/cptdanko

Read more developer guides at 
- https://mydaytodo.com/blog/
- https://captaindanko.blogspot.com/