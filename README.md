# RightRoad 🎓

RightRoad is a career guidance platform that helps students discover their most suitable stream — Science, Commerce, or Arts — after 10th grade through a structured questionnaire and intelligent evaluation.

---

## 👥 Team Contributions

| Name           | Role                | GitHub/Email               |
|----------------|---------------------|---------------------------|
| Shraddha Desai | Backend Developer   | shraddhadesai332@gmail.com |
| Isha Samant    | Frontend Developer  | ishasmnt06@gmail.com       |

**Responsibilities:**

- **Shraddha Desai** (Backend):
  - Developed Express.js API
  - Integrated MongoDB with auto-delete logic for limited free cluster space
  - Stream evaluation algorithm based on responses
  - Backend testing and optimization
  - Feedback submission and retrieval logic

- **Isha Samant** (Frontend):
  - Designed and built the complete React UI (Test Page, Feedback, Results)
  - Implemented navigation and routing using React Router
  - Integrated user rating and feedback display

---

## 🔧 Tech Stack

- **Frontend**: React, Vite  
- **Backend**: Node.js, Express.js, Firebase Authentication  
- **Database**: MongoDB Atlas  

---

## 📁 Project Structure

RightRoad/
├── frontend/ # React Vite app
│ ├── .env # Firebase credentials (not pushed to GitHub)
│ └── ...
├── backend/ # Express API server
│ ├── .env # MongoDB + Firebase secrets (not pushed to GitHub)
│ └── ...
├── README.md
└── ...

---

## 🚀 How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/RightRoad.git
cd RightRoad

### 2. Setup and Run Frontend

cd frontend
npm install
### 3.Create .env file in the frontend folder with your Firebase credentials:

Edit
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id

### 4.Run frontend dev server:
npm run dev

Setup and Run Backend
Open a new terminal window/tab:

cd backend
npm install

Create .env file in the backend folder with your MongoDB and Firebase keys:

PORT=5000
MONGODB_URI=your_mongodb_connection_string



Start backend server:
nodemon server.js
(If nodemon is not installed globally, run npm install -g nodemon)


To download your Result PDF
npm install html2pdf.js
