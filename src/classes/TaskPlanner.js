import { TaskStatus } from '../models/constants.js';

/**
 * Manages the study task collection and enforces business rules
 * for adding, updating, and querying tasks.
 */
export class TaskPlanner {
    // Private field - cannot be accessed directly from outside the class
    #tasks = [];

    /**
     * Validates and adds a new task object to the internal task list.
     * Throws an error if the task title is missing/blank or if an email is malformed.
     */
    addTask(task) {
        // Exception Throwing
        if (!task.title || task.title.trim() === "") {
            throw new Error("Task creation failed: A title is strictly required.");
        }

        if (task.ownerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(task.ownerEmail)) {
            throw new Error("Task creation failed: Please provide a valid owner email address.");
        }

        this.#tasks.push({
            ...task,
            notifications: task.notifications || []
        });
    }

    /**
     * Retrieves a single task by its unique UUID, or undefined if not found.
     */
    getTaskById(taskId) {
        return this.#tasks.find(t => t.id === taskId);
    }

    /**
     * Locates a task by its unique ID and updates its status.
     * Returns true if the task was found and updated, or false otherwise.
     */
    updateTaskStatus(taskId, newStatus) {
        const task = this.getTaskById(taskId);

        if (task) {
            task.status = newStatus;
            return true;
        }
        return false;
    }

    /**
     * Appends a status notification record to a task's notification history.
     */
    logNotification(taskId, message) {
        const task = this.getTaskById(taskId);
        if (task) {
            task.notifications.unshift({
                message,
                sentAt: new Date()
            });
        }
    }

    /**
     * Filters and returns an array of tasks matching the given status.
     */
    getTasksByStatus(status) {
        return this.#tasks.filter(task => task.status === status);
    }

    /**
     * Retrieves all stored tasks safely.
     */
    getAllTasks() {
        // Return a shallow copy to prevent direct mutation
        return [...this.#tasks];
    }
}