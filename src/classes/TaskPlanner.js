import { TaskStatus } from '../models/constants.js';

export class TaskPlanner {
    // Private field - cannot be accessed directly from outside the class
    #tasks = [];

    addTask(task) {
        // Exception Throwing
        if (!task.title || task.title.trim() === "") {
            throw new Error("Task creation failed: A title is strictly required.");
        }
        this.#tasks.push(task);
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.#tasks.find(t => t.id === taskId);

        if (task) {
            task.status = newStatus;
            return true;
        }
        return false;
    }

    getTasksByStatus(status) {
        return this.#tasks.filter(task => task.status === status);
    }

    getAllTasks() {
        // Return a shallow copy to prevent direct mutation
        return [...this.#tasks];
    }
}