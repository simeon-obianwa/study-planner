import { TaskStatus, PriorityLevel } from '../models/constants.js';
import { generateId } from '../utils/helpers.js';

/**
 * Generates and returns an initial list of sample study tasks
 * with unique UUIDs, readable Task IDs, and owner contact details.
 */
export function loadInitialTasks() {
    return [
        {
            id: generateId(),
            taskCode: "SP-101",
            title: "Build TaskPlanner Class",
            description: "Implement add and update logic in JavaScript",
            status: TaskStatus.COMPLETED,
            priority: PriorityLevel.HIGH,
            dueDate: new Date('2026-11-15'),
            ownerName: "Simeon Obianwa",
            ownerEmail: "simeon@studyplanner.local",
            ownerPhone: "+234 800 111 2201",
            moduleReference: "Sprint 1"
        },
        {
            id: generateId(),
            taskCode: "SP-102",
            title: "Create DOM Elements",
            description: "Build semantic HTML5 layout for tasks",
            status: TaskStatus.PENDING,
            priority: PriorityLevel.MEDIUM,
            dueDate: new Date('2026-11-25'),
            ownerName: "Simeon Obianwa",
            ownerEmail: "simeon@studyplanner.local",
            ownerPhone: "+234 800 111 2201",
            moduleReference: "Sprint 2"
        }
    ];
}