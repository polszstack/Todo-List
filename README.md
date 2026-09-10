# 📝 Modern Todo Application

A sleek, fast, and secure To-Do List web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Firebase Authentication**.

![Next.js](https://img.shields.io/badge/Next.js-14%2B-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4%2B-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

---

## ✨ Features

- **🔐 Authentication & Security:**
  - **Google (Gmail) Single Sign-On (SSO):** Quick one-click authentication.
  - **Email & Password Authentication:** Standard account registration and login.
  - **Password Reset:** Automated password reset emails powered by Firebase Auth.
  - **Protected Routes:** Dashboard route guards ensuring private task access.

- **⚡ Core App Features:**
  - **Task Management:** Create, toggle, edit, and delete tasks in real-time.
  - **Dashboard Overview:** Track daily focus items, active tasks, and completed items.
  - **Responsive UI:** Glassmorphic design built with custom Tailwind CSS gradients and animations.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend / Services:** [Firebase](https://firebase.google.com/)
  - **Firebase Authentication** (Google Provider, Email/Password, Password Reset)
  - **Cloud Firestore** (Database for storing user tasks)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm, yarn, or pnpm
- A Firebase project ([Firebase Console](https://console.firebase.google.com/))

---

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/todo-list-app.git](https://github.com/your-username/todo-list-app.git)
cd todo-list-app
