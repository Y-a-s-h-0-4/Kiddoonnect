# Kiddoonnect – Child Records Management App

*Kiddoonnect* is a secure and intuitive records management application designed for parents to organize their child's *medical, school, and extracurricular records* in one centralized place. Built using *React and Tailwind CSS, the app ensures a seamless user experience with **role-based access, authentication, and AI-powered insights*.

## ✨ Features

### 🔐 Authentication & User Management
- *Login & Signup* – Supports *Email/Password & OTP verification 
- *Role-Based Access* – Separate profiles for parents, hospitals.
- *Forgot Password* – Secure password reset functionality.

### 🏠 Dashboard
- *Overview of child profiles* – Displays cards for each child.
- *Quick Stats* – Upcoming vaccinations, school deadlines, and activities.
- *Navigation Menu* – Easy access to medical, school, and extracurricular records.

### 👶 Child Profile
- *Basic Info*: Name, age, school, blood type, emergency contacts.
- *Health Records*: Vaccinations, allergies, doctor visits.....,
- *School Records*: Report cards, certificates.
- *Extracurricular Activities*: Schedules and achievements.

### 🏥 Medical Records
- *Upload & Store PDFs/JPEGs* categorized as:
  - Vaccination Reports
  - Doctor Visits
  - Lab Test Results
  - Prescriptions
- *Emergency Access* – Quick access to vital health details.
- *Download & Filter* reports.

### 🏆 Extracurricular Activities
- *Calendar View* – Upcoming events and activity schedules.
- *Upload PDFs/JPEGs* categorized as:
  - Certificates
  - Participation Records
  - Performance Reports

### 🚨 Emergency Mode
- *One-Tap Access* to vital info:
  - Blood Type, Allergies, Emergency Contacts.
  - Recent Medical Reports (PDF/JPEG).

### 🤖 AI Insights
- *Health Trends Analysis* – Growth charts, vaccination tracking.
- *Academic Performance Insights* – AI-based recommendations.
- *Extracurricular Trends* – Participation frequency & impact analysis.

### ⚙ Settings
- *Profile Settings* – Update parent & child info.
- *Notifications* – Set reminders for health, school, and activities.
- *Security Settings* – Change password.

## 🛠 Tech Stack
| Feature               | Technology                  |
|----------------------|---------------------------|
| *Frontend*         | React, Tailwind CSS, TS       |
| *State Management* | React Context API     |
| *Routing*          | React Router              |
| *File Storage*     | PostgreSQL, Cloudinary (PDF/JPEG Uploads) |
| *Notifications*    | Toast Alerts (ShadCN/Headless UI) |
| *UI Components*    | ShadCN / Headless UI      |

## 🚀 Getting Started

### 1️⃣ Prerequisites
Make sure you have the following installed:
- *Node.js* (v16+ recommended)
- *Git*

### 2️⃣ Clone the Repository
sh
git clone https://github.com/Y-a-s-h-0-4/kiddoonnect.git
cd frontend
cd backend


### 3️⃣ Install Dependencies
sh
npm install


### 4️⃣ Start the Development Server
sh
npm run dev (for both frontend and backend)

Then, open *http://localhost:3000/* in your browser.


## 🙌 Contributing
Want to improve Kiddoonnect? Follow these steps:
1. *Fork the repository*
2. *Create a new branch* (feature-new)
3. *Commit changes* (git commit -m "Added new feature")
4. *Push your branch* (git push origin feature-new)
5. *Create a Pull Request*
