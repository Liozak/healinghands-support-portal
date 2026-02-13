HealingHands Support Portal 🩺🤝

A mini healthcare support web app for NGOs to collect patient support requests, volunteer registrations, and contact messages — with AI-based request summarization + urgency detection.

📌 Project Overview

HealingHands Support Portal is a concept-level web application designed for NGOs and community healthcare groups.

It provides:

A Patient Support Form for healthcare requests

A Volunteer Registration Form for people who want to help

A Contact Form for general queries

An NGO Dashboard to view and manage all submitted entries

✨ AI / Automation Feature (Gemini)

This project integrates Google Gemini API to automatically analyze patient requests.

When a patient submits a request, the AI generates:

AI Summary (1–2 lines)

Urgency Level (Low / Medium / High) based on keywords and severity

This helps NGOs quickly prioritize urgent cases.



🧰 Tech Stack

Frontend

React + TypeScript

Vite

TailwindCSS

Backend / Database

Firebase Firestore (NoSQL database)

AI

Google Gemini API (Gemini Flash model)

Deployment

Vercel

🗂️ Features

👨‍⚕️ Patient Support

Collects patient details (name, age, phone, city)

Category-based request input

AI-powered urgency tagging

Stores data in Firestore

🙋 Volunteer Registration

Collects volunteer contact details + availability

Stores volunteer data in Firestore

📩 Contact Form

Stores NGO messages in Firestore

📊 NGO Dashboard

View patient requests, volunteers, and messages

Displays AI summary and urgency level for each request

Sorted by latest submissions

📌 Firestore Collections Used

patient_requests

volunteers

messages

🧪 How to Run Locally
1) Clone the repo
git clone https://github.com/YOUR_USERNAME/healinghands-support-portal.git
cd healinghands-support-portal
2) Install dependencies
npm install
3) Add environment variables

Create a file named .env.local in the root folder:

VITE_FIREBASE_API_KEY=YOUR_FIREBASE_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID

VITE_GEMINI_API_KEY=YOUR_GEMINI_KEY
4) Run the app
npm run dev

🔐 Security Note

This is a concept/demo project for internship evaluation.

Firestore rules may be set to open read/write for demo usage.

Gemini API key is stored in environment variables.

For production, Gemini calls should be handled through a backend/serverless function to avoid exposing API keys.


🌍 NGO Use Case

This app can help NGOs:

Collect and organize patient support requests in one place

Quickly identify urgent cases using AI

Recruit volunteers and track their availability

Maintain a lightweight dashboard for monitoring support activities



👤 Author

Mohammed Zakie
(B.Tech CSE AI/ML, 2026)

📄 License

This project is for educational/internship evaluation purposes.