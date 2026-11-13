import { TaskPlanner } from './classes/TaskPlanner.js';
import { TaskStatus, PriorityLevel } from './models/constants.js';
import { generateId, formatDate, isOverdue } from './utils/helpers.js';

const planner = new TaskPlanner();

console.log("=========================================");
console.log("   STUDY PLANNER - SPRINT 1 DEMO");
console.log("=========================================\n");

// 1. Demonstrate Adding Tasks
console.log("▶ STEP 1: Creating New Tasks (Generating UUIDs)...");
planner.addTask({
    id: generateId(),
    title: "Complete CSE 310 Applied Programming",
    description: "Record Loom walkthrough and push to GitHub",
    status: TaskStatus.IN_PROGRESS,
    priority: PriorityLevel.HIGH,
    dueDate: new Date('2026-11-15')
});

planner.addTask({
    id: generateId(),
    title: "Design HTML5 Wireframes",
    description: "Map out the DOM structure for Sprint 2 UI",
    status: TaskStatus.PENDING,
    priority: PriorityLevel.MEDIUM,
    dueDate: new Date('2026-11-25')
});

console.table(planner.getAllTasks().map(task => ({
    ID: task.id.substring(0, 8) + "...", // Truncate UUID for display
    Title: task.title,
    Status: task.status,
    Due: formatDate(task.dueDate)
})));

// 2. Demonstrate Array Filtering
console.log("\n▶ STEP 2: Filtering Tasks by Status (Native Array Filter)...");
const pendingTasks = planner.getTasksByStatus(TaskStatus.PENDING);
console.log(`Found ${pendingTasks.length} PENDING task(s):`);
console.table(pendingTasks.map(t => ({ Title: t.title, Status: t.status })));

// 3. Demonstrate State Update and Validation
console.log("\n▶ STEP 3: Updating Task Status (Native Array Find)...");
const tasks = planner.getAllTasks();
const taskToUpdate = tasks[1];

console.log(`Updating '${taskToUpdate.title}' from PENDING to COMPLETED.`);
planner.updateTaskStatus(taskToUpdate.id, TaskStatus.COMPLETED);

// Verify the update and check if it's overdue
const updatedTask = planner.getAllTasks()[1];
console.log(`Update Successful! New Status: ${updatedTask.status}`);
console.log(`Is this task overdue? ${isOverdue(updatedTask.dueDate) ? "YES" : "NO"}`);

// 4. Demonstrate Exception Throwing and Handling
console.log("\n▶ STEP 4: Error Handling & Validation...");
try {
    console.log("Attempting to bypass validation with an empty task title...");
    planner.addTask({
        id: generateId(),
        title: "   ", // This empty string will trigger the throw block
        description: "This should be caught by the try...catch block",
        status: TaskStatus.PENDING,
        priority: PriorityLevel.LOW,
        dueDate: new Date()
    });
} catch (error) {
    console.error(`❌ EXCEPTION CAUGHT: ${error.message}`);
}

console.log("\n=========================================");
console.log("   DEMONSTRATION COMPLETE");
console.log("=========================================\n");