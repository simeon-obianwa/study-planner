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
let nextTaskSequence = 103;

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
    res.locals.noticeMessage = null;
    next();
});

// Page 0: Dynamic Home Landing Page
app.get('/', (req, res) => {
    const allTasks = planner.getAllTasks();
    const completedTasks = planner.getTasksByStatus(TaskStatus.COMPLETED);
    const overdueTasks = allTasks.filter(
        t => t.status !== TaskStatus.COMPLETED && isOverdue(t.dueDate)
    );

    res.render('home', {
        pageTitle: 'Home | Study Planner',
        totalCount: allTasks.length,
        activeCount: allTasks.length - completedTasks.length,
        completedCount: completedTasks.length,
        overdueCount: overdueTasks.length
    });
});

// Page 1: Interactive Task Dashboard (supports ?status= query filtering)
app.get('/dashboard', (req, res) => {
    const selectedStatus = req.query.status || 'ALL';
    const noticeMessage = req.query.notice || null;
    const tasks = selectedStatus === 'ALL'
        ? planner.getAllTasks()
        : planner.getTasksByStatus(selectedStatus);

    res.render('index', {
        pageTitle: 'Task Dashboard | Study Planner',
        tasks,
        selectedStatus,
        noticeMessage
    });
});

// Interactive Input: Create a new study task with Task ID & owner contact info
app.post('/tasks', (req, res) => {
    const {
        taskCode,
        title,
        description,
        priority,
        dueDate,
        ownerName,
        ownerEmail,
        ownerPhone
    } = req.body;

    const assignedCode = taskCode?.trim() || `SP-${nextTaskSequence++}`;

    try {
        planner.addTask({
            id: generateId(),
            taskCode: assignedCode.toUpperCase(),
            title: title || '',
            description: description?.trim() || 'No description provided.',
            status: TaskStatus.PENDING,
            priority: priority || PriorityLevel.MEDIUM,
            dueDate: dueDate ? new Date(`${dueDate}T00:00:00`) : new Date(),
            ownerName: ownerName?.trim() || 'Unassigned',
            ownerEmail: ownerEmail?.trim() || '',
            ownerPhone: ownerPhone?.trim() || ''
        });
        res.redirect(`/dashboard?notice=${encodeURIComponent(`Task ${assignedCode.toUpperCase()} created successfully.`)}`);
    } catch (error) {
        res.status(400).render('index', {
            pageTitle: 'Task Dashboard | Study Planner',
            tasks: planner.getAllTasks(),
            selectedStatus: 'ALL',
            errorMessage: error.message
        });
    }
});

// Interactive Input: Update task status and trigger owner status notification
app.post('/tasks/:id/status', (req, res) => {
    const { id } = req.params;
    const { status, redirectTo } = req.body;

    const task = planner.getTaskById(id);
    const updated = planner.updateTaskStatus(id, status);

    let notice = '';
    if (updated && task) {
        const channels = [task.ownerEmail, task.ownerPhone].filter(Boolean).join(' | ');
        const formattedStatus = status.replace('_', ' ');

        notice = channels
            ? `Status for ${task.taskCode} updated to ${formattedStatus}. Notification dispatched to ${task.ownerName} (${channels}).`
            : `Status for ${task.taskCode} updated to ${formattedStatus}. (No email/mobile on file for notification.)`;

        planner.logNotification(id, notice);
        console.log(`[STATUS NOTIFICATION] ${new Date().toISOString()} — ${notice}`);
    }

    const target = redirectTo || '/dashboard';
    const separator = target.includes('?') ? '&' : '?';
    res.redirect(notice ? `${target}${separator}notice=${encodeURIComponent(notice)}` : target);
});

// Page 2: Dynamic Single-Task Detail & Notification Log
app.get('/tasks/:id', (req, res) => {
    const task = planner.getTaskById(req.params.id);
    const noticeMessage = req.query.notice || null;

    if (!task) {
        return res.status(404).render('task-detail', {
            pageTitle: 'Task Not Found | Study Planner',
            task: null,
            noticeMessage: null
        });
    }

    res.render('task-detail', {
        pageTitle: `${task.taskCode} - ${task.title} | Study Planner`,
        task,
        noticeMessage
    });
});

// Page 3: Dynamic Task Analytics & Overdue Report
app.get('/analytics', (req, res) => {
    const allTasks = planner.getAllTasks();
    const pendingTasks = planner.getTasksByStatus(TaskStatus.PENDING);
    const inProgressTasks = planner.getTasksByStatus(TaskStatus.IN_PROGRESS);
    const completedTasks = planner.getTasksByStatus(TaskStatus.COMPLETED);
    const overdueTasks = allTasks.filter(
        t => t.status !== TaskStatus.COMPLETED && isOverdue(t.dueDate)
    );

    const completionRate = allTasks.length > 0
        ? Math.round((completedTasks.length / allTasks.length) * 100)
        : 0;

    res.render('analytics', {
        pageTitle: 'Task Analytics | Study Planner',
        totalCount: allTasks.length,
        pendingCount: pendingTasks.length,
        inProgressCount: inProgressTasks.length,
        completedCount: completedTasks.length,
        overdueTasks,
        completionRate
    });
});

// 404 catch-all handler for unmatched routes
app.use((req, res) => {
    res.status(404).send(
        '<h1>404 - Page Not Found</h1><p><a href="/">Return to Study Planner Home</a></p>'
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