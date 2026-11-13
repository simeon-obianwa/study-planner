import { TaskPlanner } from './classes/TaskPlanner.js';
import { loadInitialTasks } from './data/mockData.js';
import { formatDate, isOverdue } from './utils/helpers.js';
import { TaskStatus } from './models/constants.js';

const planner = new TaskPlanner();

// Load Mock Data
const initialTasks = loadInitialTasks();
initialTasks.forEach(task => planner.addTask(task));

console.log("--- All Tasks ---");
console.log(planner.getAllTasks());

console.log("\n--- Updating Task Status ---");
const tasks = planner.getAllTasks();
if (tasks.length > 0) {
    planner.updateTaskStatus(tasks[1].id, TaskStatus.IN_PROGRESS);
    console.log(`Updated '${tasks[1].title}' to IN_PROGRESS`);
}

console.log("\n--- Validation Utilities ---");
planner.getAllTasks().forEach(task => {
    console.log(`Task: ${task.title}`);
    console.log(`Due: ${formatDate(task.dueDate)}`);
    console.log(`Overdue: ${isOverdue(task.dueDate)}`);
    console.log("-------------------");
});

console.log("\n--- Exception Handling ---");
// Exception Handling Requirement
try {
    console.log("Attempting to add an invalid task without a title...");
    planner.addTask({
        id: "invalid-001",
        title: "", // This empty title will trigger the exception in TaskPlanner
        description: "This task should fail and throw an error",
        status: TaskStatus.PENDING,
        dueDate: new Date()
    });
} catch (error) {
    console.error(`EXCEPTION CAUGHT: ${error.message}`);
}