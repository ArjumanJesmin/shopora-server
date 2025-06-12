# 🛍️ Shopora Server

**Shopora Server** is the backend service for the Shopora E-commerce platform. This project is built using modern web technologies to manage products, sellers, categories, and more, delivering a seamless shopping experience.

## 🌐 GitHub Repository

👉 [Shopora Server GitHub](https://github.com/ArjumanJesmin/shopora-server)

---

## 🗺️ Schema Diagram

The visual representation of the database schema is available here:

📄 **[View Schema Diagram (PDF)](https://drive.google.com/file/d/1mp_stZOq9kXhoI1cK1FmwDDBaV0Z-R9V/view?usp=sharing)**

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Technologies Used](#-technologies-used)
- [⚙️ Installation](#-installation)
- [▶️ Usage](#️-usage)
- [📌 Environment Variables](#-environment-variables)
- [📡 API Endpoints](#-api-endpoints)
- [🧩 Prisma Schema](#-prisma-schema)
- [🗺️ Schema Diagram](#-schema-diagram)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Features

- ✅ **Product Management**: Add, update, delete, and fetch product data.
- ✅ **Category Management**: Create and organize products under categories.
- ✅ **Seller Management**: Register, manage, and retrieve seller information.
- ✅ **Customer & Admin Profiles**: Manage user roles and associated data.
- ✅ **Authentication & Authorization**: Secure endpoints using JWT.
- ✅ **Role-Based Access Control (RBAC)**: Super Admin, Admin, Seller, Customer.
- ✅ **Order & Payment Processing**: Track status and transactions.
- ✅ **Wishlist & Reviews**: Track user favorites and feedback.
- ✅ **Blog & Reporting System**: Seller/customer blogs, and generate reports.
- ✅ **Prisma ORM with PostgreSQL**: Type-safe database interactions.

---

## 🛠️ Technologies Used

| Technology | Description                    |
| ---------- | ------------------------------ |
| Node.js    | JavaScript runtime environment |
| Express.js | Lightweight web framework      |
| PostgreSQL | Relational database            |
| Prisma ORM | Type-safe database access      |
| TypeScript | Strongly-typed JavaScript      |
| JWT        | Secure authentication          |
| Zod        | Request body validation        |
| Dotenv     | Environment configuration      |

---

## ⚙️ Installation

### ✅ Prerequisites

- **Node.js** >= 18.18.0
- **npm** >= 10.8.2
- **PostgreSQL** (local or hosted, e.g., Supabase)

### 🧪 Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/ArjumanJesmin/shopora-server.git
cd shopora-server

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your DATABASE_URL and JWT_SECRET

# 4. Generate Prisma client and migrate DB
npx prisma generate
npx prisma migrate dev --name init

# 5. Start the development server
npm run dev

```
