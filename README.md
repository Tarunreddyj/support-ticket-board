# Support Ticket Triage Board

A client-side web application built for the MTX Junior Associate Consultant practical exercise.  
This application allows users to view, search, filter, and sort a simulated dataset of support tickets in real-time.

---

## 🌐 Live Demo
🔗 https://tarunreddyj.github.io/support-ticket-board/

---

## ✨ Features
- View a list of support tickets
- Search tickets by keyword
- Filter tickets by status or category
- Sort tickets by priority or date
- Responsive and clean UI
- Real-time updates on user interaction

---

## 🛠️ Tech Stack & Rationale
- **React + Vite**  
  Used for fast development, hot module replacement (HMR), and optimized production builds.

- **Tailwind CSS**  
  Used for fast UI development with utility-first styling and reduced custom CSS.

---

## 📦 Local Setup & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

---
### Steps to run locally

1. Clone the repository:

```bash
git clone https://github.com/Tarunreddyj/support-ticket-board.git
```

2. Go into the project folder:

```bash
cd support-ticket-board
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open in your browser:

```text
http://localhost:5173/
```

---

## 💡 Development Insights

- **Approximate Hours Spent:** 4 hours

- **AI Tool Usage:**  
  I used ChatGPT to assist with development setup, optimizing client-side sorting and filtering logic, and troubleshooting static asset configuration paths for GitHub Pages deployment.

- **Known Limitations:**  
  As a purely client-side application, changes to ticket states do not persist across page refreshes because no backend database or localStorage persistence layer has been integrated.