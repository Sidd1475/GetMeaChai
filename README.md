# ☕ GetMeAChai

A modern full-stack platform where creators can receive small contributions of appreciation from others — with a cup of chai. Built using **Next.js App Router**, integrated with **PayPal** and **GitHub OAuth authentication** via Auth.js.

---

## 🚀 Live Demo
> 🔗 **Coming soon...**  
> *(Deployment in progress — clone and run locally to explore the project)*

---

## ✨ Features

- 🔐 **Authentication via GitHub OAuth** using Auth.js (NextAuth)
- 💸 **PayPal Integration** for secure, one-time contributions
- 🧑‍💻 **Public Creator Pages** with custom URL (`/username`)
- 📊 **Dashboard for Creators** to manage profile and view contributions
- 📁 **MongoDB Database** with Mongoose for storing users and donations
- 🧭 **Next.js App Router** with full SSR support and API routing
- 🎨 **Responsive and Clean UI** built with Tailwind CSS

---

## 🖼️ Preview

*<img width="1900" height="922" alt="download" src="https://github.com/user-attachments/assets/86cdaf23-b0f2-4139-9b02-76b05fe51606" />
<img width="1896" height="922" alt="download" src="https://github.com/user-attachments/assets/26b4dbfe-39ff-4535-a999-4c421823e9aa" />
<img width="1895" height="846" alt="download" src="https://github.com/user-attachments/assets/22d753ef-24f1-4579-9b29-f1de80e0c653" />
<img width="1895" height="911" alt="download" src="https://github.com/user-attachments/assets/93c71ad7-6b7f-444e-a1ad-3f2c48d8a194" />
<img width="1891" height="811" alt="download" src="https://github.com/user-attachments/assets/f27f1cc3-ba15-4489-a607-aeac514ccd4b" />



*

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Auth:** Auth.js (NextAuth) with GitHub provider
- **Payments:** PayPal JS SDK (Client-side)
- **Database:** MongoDB Atlas + Mongoose
- **Styling:** Tailwind CSS
- **Deployment Target:** Vercel (planned)

---

## 🧪 Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_uri

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_auth_secret

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_MODE=sandbox   # or 'live'

 
 
