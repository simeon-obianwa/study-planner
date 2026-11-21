import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { TaskPlanner } from './classes/TaskPlanner.js';
import { TaskStatus, PriorityLevel } from './models/constants.js';
import { generateId, formatDate, isOverdue } from './utils/helpers.js';
import { loadInitialTasks } from './data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Sprint 1 business logic with seed data
const planner = new TaskPlanner();
loadInitialTasks().forEach(task => planner.addTask(task));

// View engine and static asset configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));

// Global template helpers to prevent missing-variable crashes in EJS views
app.use((req, res, next) => {
    res.locals.TaskStatus = TaskStatus;
    res.locals.PriorityLevel = PriorityLevel;
    res.locals.formatDate = formatDate;
    res.locals.isOverdue = isOverdue;
    res.locals.errorMessage = null;
    next();
});

// Temporary verification route (replaced with views/index.ejs in Phase 2)
app.get('/', (req, res) => {
    const tasks = planner.getAllTasks();
    res.send(
        `<h1>Study Planner Express Server is Running</h1>` +
        `<p>Loaded <strong>${tasks.length}</strong> initial study tasks from Sprint 1 TaskPlanner.</p>`
    );
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).send('Something went wrong on the Study Planner server.');
});

app.listen(PORT, () => {
    console.log(`Study Planner server running at http://localhost:${PORT}`);
});