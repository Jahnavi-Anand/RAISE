This is the backend** for *RAISE**, a platform designed to connect **startups** and **investors**.  
Built using Node.js, *Express*, and **MongoDB**, it provides a secure and scalable API with authentication, data management, and role-based access.

---

## ⚙️ Tech Stack
- **Node.js + Express** — REST API framework  
- **MongoDB (Mongoose)** — Database  
- **JWT Authentication** — Secure user login  
- **dotenv & bcrypt** — Config & password hashing  

---

## 📂 Features
- Startup and Investor registration & login  
- Role-based authentication using JWT  
- CRUD operations for startups and investors  
- API endpoints for listing and profile management  

---

## 🧠 Setup
```bash
git clone https://github.com/Jahnavi-Anand/RAISE.git
cd RAISE
npm install
Create a .env file:

env
Copy code
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
Start the server:

bash
Copy code
npm run dev
The backend runs at http://localhost:5000

🧾 API Overview
Method	Endpoint	Description
POST	/api/auth/signup	Register startup/investor
POST	/api/auth/login	Login user
GET	/api/startups	Get all startups
GET	/api/startups/me	Get logged-in startup data
