# MediAid – Emergency Medical Assistance Platform

## 🚑 About MediAid
MediAid is a web-based emergency medical assistance platform built using Django and React. It helps individuals connect with nearby medical professionals, pharmacies, and first-aid guides during emergencies. The platform also features real-time ambulance tracking and doctor assistance to ensure timely medical support.

## 🌟 Features
- **Real-Time Ambulance Tracking** – Track ambulances in real-time for quicker emergency responses.
- **Real-Time Doctor Assistance** – Connect with doctors via video/audio calls for immediate medical consultation.
- **Nearby Medical Professionals & Pharmacies** – Locate the nearest healthcare providers and pharmacies.
- **First-Aid Guides** – Access a library of first-aid instructions for various medical emergencies.
- **User Authentication** – Secure login and registration using JWT authentication.
- **Emergency Alerts** – Notify nearby healthcare professionals in case of a medical emergency.

## 🛠️ Tech Stack
- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Django, Django REST Framework
- **Database:** SQLite
- **Real-Time Features:** WebSockets




## 🚀 Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 16+
- Docker (optional, for deployment)

### Backend Setup
```sh
cd server
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```sh
cd client
npm install
npm run dev
```

## Usage

- Open http://localhost:5173/ to access the frontend.

- The Django backend runs at  http://127.0.0.1:8000/.




## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributing
Contributions are welcome! Fork the repository and submit a pull request.

## 📧 Contact
For queries or support, contact: **harsh.warghade22@spit.ac.in**

## Video Link of Protoype:
https://drive.google.com/file/d/1QzXH3AtVPhff1h-FifcOK-NHUrKvdNv0/view?usp=drive_link
