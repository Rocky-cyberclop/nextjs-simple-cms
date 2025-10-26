# 🧩 Simple CMS Demo

A simple CMS built with **Next.js**, **Supabase**, and **TypeScript**.  
This project demonstrates authentication, protected routes, and a minimal CMS-style dashboard.

---

## 🚀 Features

- 🔐 Authentication with email/password  
- 🗄️ Supabase as the backend (PostgreSQL)  
- ⚛️ Built on Next.js App Router  
- 🧱 Clean and modular structure  
- 🧩 Ready for local or production deployment

---

## 🧰 Prerequisites

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) (v18+)
- [Yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) account and project

---

## ⚙️ 1. Clone the Repository

```bash
git clone https://github.com/your-username/simple-cms-demo.git
cd simple-cms-demo
```

## 📦 2. Install Dependencies
Use Yarn to install all required packages:
```bash
yarn install
```

## 🔑 3. Environment Variables
Create a file named .env in the project root with the following contents:
```bash
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-SUPABASE-PROJECT-URL.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-SUPABASE-ANON-KEY
```

## 🧑‍💻 4. Run the Development Server
Start your local dev server:
```bash
yarn dev
```
Then open your browser and visit:

👉 http://localhost:3000


## 🏗️ 5. Build for Production
To build an optimized production version:
```bash
yarn build
```

## 🚀 6. Start the Production Server
After building, run:
```bash
yarn start
```

🧩 Project Structure

```bash
📦 simple-cms-demo/
 ┣ 📂 app/                  # App router pages and layouts
 ┣ 📂 libs/                 # Supabase client and helpers
 ┣ 📂 components/           # Reusable UI components
 ┣ 📂 public/               # Static assets (favicon, images, etc.)
 ┣ 📜 .env                  # Environment variables
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┣ 📜 README.md
```

🧪 Testing the Authentication Flow

1. Go to /auth/signup → Create a new user

2. Log in at /auth/login using your credentials

3. You’ll be redirected to / if successful

4. Middleware protects all routes except /auth/*