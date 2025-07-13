# SlotSphere – Smart Booking Platform 🗓️✨

**SlotSphere** is a full-stack web application designed to simplify service bookings using a modern tech stack including **Spring Boot**, **Microservices**, **Spring Security**, **React**, and **MySQL**. It empowers users to book appointments, providers to manage schedules and earnings, and admins to control the entire platform ecosystem.

---

## 🚀 Features

### 🔐 Authentication
- Secure JWT-based login and registration
- Role-based access control: **User**, **Provider**, **Admin**

### 👥 User Dashboard
- Search services & providers with filters
- Book slots by selecting time, service, and provider
- View booked appointments
- Integrated **Stripe** payment system
- Receive email notifications

### 🧑‍🔧 Provider Dashboard
- Manage service availability and booking schedule
- Track total earnings and upcoming meetings

### 🛠 Admin Dashboard
- View and manage users, providers, services, and bookings
- Add or delete services
- Monitor platform-wide booking statistics

---

## 🧱 Tech Stack

### Backend
- Java 17 + Spring Boot
- Spring Cloud (Gateway, Eureka)
- Spring Security + JWT
- MySQL
- Stripe API (Payments)
- Mail API (Email Notifications)

### Frontend
- React.js
- Axios (API calls)
- React Router DOM
- Tailwind CSS / Bootstrap (styling)

---

## 📦 Microservices Structure

SlotSphere/
├── gateway-service/
├── auth-service/
├── user-service/
├── booking-service/
├── provider-service/
├── notification-service/
└── frontend/ (React App)


Each service is self-contained and communicates via REST APIs.  
Service Discovery is handled using **Eureka**, and routing is managed by **Spring Cloud Gateway**.

---

## 🔐 Security

- Passwords encrypted using BCrypt
- JWT token generation and validation
- Role-based route protection (User / Provider / Admin)
- Secure communication between frontend and backend

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/slotsphere.git
cd slotsphere

### 2. Start Backend Services
- Ensure MySQL and Eureka Server are running
- Start each microservice (auth, user, booking, etc.) from your IDE or terminal

### 3. Start the Frontend

cd frontend
npm install
npm start

📧 Contact
Developer: Shivam Jaswal
Email: theshivamjaswal@gmail.com
LinkedIn: https://www.linkedin.com/in/shivamjaswal

📜 License
This project is licensed under the MIT License.
