# 🚀 Member Management System

A modern full-stack **Member Management & Administration Dashboard** built to manage member records through a clean, responsive web interface.

This project was developed during an **8-week Web Development Training program accredited by Skill India / NSDC** and was later enhanced with a modern SaaS-style dashboard, dynamic department management, search, filtering, CSV export, dark mode, and a responsive user interface.

---

## 🌐 Project Overview

The Member Management System provides administrators with a centralized dashboard to manage organizational member records.

The application supports complete **CRUD operations** along with dashboard analytics, member search, department filtering, CSV export, and a modern responsive interface.

### Core workflow

```text
Admin Login
     ↓
Dashboard
     ↓
Member Directory
     ↓
Add / Edit / Delete Members
     ↓
Search & Department Filtering
     ↓
Export Member Data
```

---

## ✨ Key Features

### 🔐 Admin Authentication

* Secure admin login interface
* Logout functionality
* Protected dashboard access

### 📊 Dashboard

* Total member count
* Total department count
* Department overview
* Department-wise member statistics
* Clean SaaS-style dashboard interface

### 👥 Member Management

Complete CRUD functionality:

* Add new members
* View members
* Edit member information
* Delete members
* Membership ID management
* Department management
* Contact information
* Company information

### 🔎 Search & Filtering

* Real-time member search
* Search by:

  * Name
  * Membership ID
  * Department
  * Contact number
  * Company
* Dynamic department filtering
* Search and department filters work together

### 🏢 Dynamic Departments

Departments are generated dynamically from the member data.

For example:

```text
CSE
AIML
Mec
Mechanical
ECE
```

Adding a member from a new department automatically makes that department available in the department filters.

No frontend code changes are required to add a new department.

### 📥 CSV Export

Administrators can export the member directory into a downloadable CSV file for external use and data analysis.

### 🌙 Dark / Light Mode

* Light mode
* Dark mode
* Theme persistence using browser local storage
* Smooth UI transitions

### 📱 Responsive Design

The dashboard is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile screens

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Responsive UI
* Dynamic DOM manipulation

### Backend

* Python
* Flask
* REST-style API endpoints

### Database

* MySQL
* SQL / DBMS

### Development Tools

* PyCharm
* Git
* GitHub
* Python Virtual Environment

---

## 🏗️ Architecture

```text
┌───────────────────────────────┐
│           Frontend            │
│                               │
│ HTML + CSS + JavaScript       │
│ Dashboard / Forms / Search    │
└───────────────┬───────────────┘
                │
                │ HTTP Requests
                ▼
┌───────────────────────────────┐
│          Flask API            │
│                               │
│ Authentication               │
│ Member CRUD                  │
│ Dashboard Statistics         │
│ Filtering / Data Processing  │
└───────────────┬───────────────┘
                │
                │ SQL Queries
                ▼
┌───────────────────────────────┐
│            MySQL              │
│                               │
│ Member Records               │
│ Department Data              │
│ Administrative Data          │
└───────────────────────────────┘
```

---

## 📁 Project Structure

```text
my_app/
│
├── app/
│   │
│   ├── main.py
│   ├── services.py
│   ├── ...
│   │
│   ├── static/
│   │   ├── script.js
│   │   └── style.css
│   │
│   └── templates/
│       ├── index.html
│       └── ...
│
├── requirements.txt
├── README.md
└── ...
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/jagdeep2208/my_app.git
cd my_app
```

### 2. Create a virtual environment

Windows:

```bash
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure the database

Create a MySQL database and configure the required database credentials according to the application's configuration.

> Never commit database passwords, API keys, or other credentials to a public repository.

### 5. Run the application

From the project root:

```bash
python -m app.main
```

Then open the local application in your browser.

---

## 📊 Dashboard Capabilities

The dashboard provides administrators with an overview of the organization's members.

Example:

```text
┌────────────────────────────────────────────┐
│ Member Management                          │
│ Manage your organization's members         │
├──────────────┬──────────────┬──────────────┤
│ Total Members│ Departments  │              │
│     25       │      3       │              │
├──────────────┴──────────────┴──────────────┤
│ Department Overview                         │
│                                             │
│ CSE                                  12     │
│ AIML                                  8     │
│ Mechanical                            5     │
└────────────────────────────────────────────┘
```

---

## 🔍 Smart Filtering

The department system is dynamically generated from existing member data.

For example, if the database contains:

```text
Rahul      → CSE
Aman       → AIML
Riya       → CSE
Karan      → Mechanical
```

The department filter automatically becomes:

```text
All Departments
CSE
AIML
Mechanical
```

Selecting **CSE** displays only CSE members.

Search can then be performed within the selected department.

---

## 💾 Data Management

The application provides administrators with:

| Operation            | Supported |
| -------------------- | --------- |
| Create Member        | ✅         |
| View Members         | ✅         |
| Update Member        | ✅         |
| Delete Member        | ✅         |
| Search Members       | ✅         |
| Department Filtering | ✅         |
| CSV Export           | ✅         |
| Dashboard Statistics | ✅         |
| Dark Mode            | ✅         |

---

## 🔮 Future Enhancements

Potential future improvements include:

* Profile picture upload
* Server-side pagination
* Advanced analytics with interactive charts
* Role-based access control
* Password hashing and stronger authentication
* Member profile pages
* Excel export
* Email notifications
* Activity / audit logs
* Cloud deployment
* Automated testing
* API documentation

---

## 🎓 Training Project

This project was originally developed during an:

**8-Week Web Development Training Program**

Accredited by:

**Skill India / NSDC**

The project was subsequently enhanced to demonstrate additional full-stack development, UI/UX, data management, filtering, export, and dashboard capabilities.

---

## 👨‍💻 Developer

**Jagdeep Dhiman**

B.Tech — Artificial Intelligence & Machine Learning

Ambala College of Engineering and Applied Research

---

## 📌 Project Highlights

> A full-stack CRUD-based member management platform featuring a modern administrative dashboard, dynamic department filtering, search, CSV data export, responsive UI, and dark/light theme support.

---

## ⭐ If you find this project useful

Consider giving the repository a ⭐ on GitHub.
