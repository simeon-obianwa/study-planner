# Study Planner

Live Web Application: https://study-planner-2qmo.onrender.com

# Overview
As a software engineer, my goal for this project is to build a production-ready, full-stack Study Planner application iteratively across three sprints—progressing from core JavaScript architecture to a live server-rendered web application and, ultimately, cloud database persistence.

## Sprint 1 — Core JavaScript Logic Module (Completed)
The foundation of the application is a modular backend engine built with Node.js and ES Modules. It features an encapsulated `TaskPlanner` class that manages study tasks, validates inputs, performs updates with native ES6 array methods, and enforces structural immutability through recursive freezing (`deepFreeze`). It integrates the `uuid` npm package for collision-proof system identifiers and implements defensive exception handling.

## Sprint 2 — Dynamic Express & EJS Web Application (Completed)
Sprint 2 connects the Sprint 1 `TaskPlanner` module to a full multi-page web application using Express and EJS templates, deployed as a live Web Service on Render. Key capabilities include:

**Dynamic Home Landing Page (`/`):** Server-rendered overview displaying live workspace metrics (Total, Active, Completed, and Overdue tasks) pulled directly from the active `TaskPlanner` session.**Interactive Task Dashboard (`/dashboard`):** Create study tasks with custom or auto-generated Task IDs (e.g., `SP-103`), priority levels, due dates, and Task Owner contact details (Name, Email, Mobile); filter tasks by status; trigger real-time validation error banners; and flag overdue items automatically.
**Task Detail & Status Notification Audit Log (`/tasks/:id`):** Dedicated view for each task displaying full metadata, owner contact records, inline status updates, and a timestamped **Status Notification History** logged both in the UI and server console on every status change.
**Task Analytics (`/analytics`):** Live progress reporting featuring an overall completion bar, status distribution counters, and an **Overdue Attention Required** action list.
**Production Frontend Standards:** Mobile-first responsive CSS architected with centralized design tokens (`:root`), a cohesive green and earth-tone palette, custom brand-matched SVG header logo, WCAG 2.1 AA `:focus-visible` keyboard navigation, reduced-motion support, and a sticky footer with social links.

### Software Demo Videos
Sprint 1 Demo (Core JS Module): https://www.loom.com/share/3b1a4d2af66d48cabb34b448aeb853b6

Sprint 2 Demo (Live Web Application): https://www.loom.com/share/5cfccd6cec884b7e99669eea6331465d

# Development Environment
**Runtime & Language:** Node.js (v18+ with ES Modules enabled via `"type": "module"` in `package.json`) and Vanilla JavaScript (ES2022+, featuring private class fields `#`, arrow functions, and `Intl` APIs)
**Backend Framework & Templating:** Express.js and EJS (Embedded JavaScript Templates)
**Frontend & Styling:** Semantic HTML5, CSS3 (centralized `:root` design tokens, CSS Grid, Flexbox, responsive breakpoints, WCAG 2.1 AA `:focus-visible` states), and custom SVG graphics
**Packages & Libraries:** `express`, `ejs`, and `uuid` (collision-proof task identifiers)
**Cloud Hosting & Deployment:** Render Web Service (`npm install` / `npm start`) with continuous auto-deployment from the GitHub `main` branch
**IDE, Terminal & Version Control:** Visual Studio Code (Windows 11), integrated PowerShell terminal, Git, and GitHub

# Useful Websites
MDN Web Docs — JavaScript Classes, Modules & CSS (https://developer.mozilla.org/)
Node.js Documentation (https://nodejs.org/en/docs)
Express.js Documentation (https://expressjs.com/)
EJS — Embedded JavaScript Templating (https://ejs.co/)
npm Registry `uuid` package (https://www.npmjs.com/package/uuid)
Render Documentation — Web Services & PostgreSQL (https://render.com/docs)
PostgreSQL Official Documentation (https://www.postgresql.org/docs/)
node-postgres (`pg`) Documentation (https://node-postgres.com/)

# Future Work
## Sprint 3 — Cloud Database Integration (PostgreSQL)
Sprint 3 will replace the current in-memory `TaskPlanner` session store with persistent cloud storage so tasks and notification histories survive server restarts and Render free-tier spin-downs:

**Cloud Database Provisioning:** Deploy a managed PostgreSQL database on Render in the same region (`Oregon — US West`) as the Web Service for private-network connectivity, administered locally via pgAdmin.
**Relational Schema & Seed Script (`setup.sql`):** Define normalized relational tables for `tasks` (Task ID, title, description, status, priority, due date, and owner contact details) and `notification_logs` (linked via foreign key to `tasks` with automatic timestamps).
**Secure Database Connectivity:** Connect Express to PostgreSQL using a `pg` connection pool (`src/models/db.js`), managing `DATABASE_URL` through `.env` locally (via `dotenv`) and Render Environment Variables in production, with parameterized SQL queries to prevent SQL injection.
**Full Persistent CRUD:** Upgrade existing `GET`/`POST` routes to execute asynchronous `SELECT`, `INSERT`, and `UPDATE` queries, and add task editing and deletion (`DELETE`) directly from the dashboard and task detail views.
**MVC Architecture Refactor:** Separate routing, request handling, and SQL queries from `src/server.js` into dedicated `src/routes/`, `src/controllers/`, and `src/models/` modules, backed by custom `404.ejs` and `500.ejs` error views.

