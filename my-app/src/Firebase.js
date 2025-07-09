// src/Firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDkjqoXeenX8AuAh_lBZyGQunXDthz-FuE",
  authDomain: "right-road-e35db.firebaseapp.com",
  projectId: "right-road-e35db",
  storageBucket: "right-road-e35db.firebasestorage.app",
  messagingSenderId: "273173073466",
  appId: "1:273173073466:web:c303cce977a675bae16f03",
  measurementId: "G-T9G47MZT80",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth to use in Form.jsx
export const auth = getAuth(app);
