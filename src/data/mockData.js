import { TaskStatus, PriorityLevel } from '../models/constants.js';
import { generateId } from '../utils/helpers.js';

export function loadInitialTasks() {
    return [
        {
            id: generateId(),
            title: "Build TaskPlanner Class",
            description: "Implement add and update logic in JavaScript",
            status: TaskStatus.COMPLETED,
            priority: PriorityLevel.HIGH,
            dueDate: new Date('2026-11-15'),
            moduleReference: "Sprint 1"
        },
        {
            id: generateId(),
            title: "Create DOM Elements",
            description: "Build semantic HTML5 layout for tasks",
            status: TaskStatus.PENDING,
            priority: PriorityLevel.MEDIUM,
            dueDate: new Date('2026-11-25'),
            moduleReference: "Sprint 2"
        }
    ];
}