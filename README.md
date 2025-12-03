# MERN Task Management App

A full-stack Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). It features secure authentication, real-time task updates, and a modern UI.

## 🚀 Features

- **Authentication**: 
  - Username & Password Login/Signup.
  - **Email Verification**: Optional email verification using OTP (One-Time Password) via Nodemailer.
  - JWT-based session management.
- **Task Management**:
  - Create, Read, Update, and Delete (CRUD) tasks.
  - Mark tasks as completed/pending.
  - Real-time UI updates.
- **Modern UI/UX**:
  - Built with **React** and **Tailwind CSS**.
  - Uses **Shadcn UI** components for a polished look.
  - Fully responsive design.
  - Toast notifications for user feedback.
- **Local Network Access**: Configured to be accessible from other devices on the same Wi-Fi.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Shadcn UI, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Atlas).
- **Tools**: Nodemailer (Email), Dotenv (Config), Concurrently (Dev).

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js installed.
- MongoDB Atlas URI (or local MongoDB).
- Gmail Account (for email sending - requires App Password).

### 2. Clone the Repository
```bash
git clone <repository-url>
cd Notes-app
```

### 3. Backend Setup
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=*
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 4. Frontend Setup
Navigate to the `client` directory and install dependencies:
```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:
```env
# Point to your backend URL (use Local IP for mobile testing)
VITE_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Running the App

You need to run both the backend and frontend.

**Option 1: Separate Terminals**
Terminal 1 (Server):
```bash
cd server
npm run dev
```

Terminal 2 (Client):
```bash
cd client
npm run dev
```

**Access the App:**
- Web: `http://localhost:5173`
- API: `http://localhost:5000`

## 📱 Mobile App (Coming Soon)
A React Native (Expo) mobile application is currently in development to extend this functionality to iOS and Android devices.

## 🤝 Contributing
Feel free to submit issues and pull requests.

## 📄 License
MIT
