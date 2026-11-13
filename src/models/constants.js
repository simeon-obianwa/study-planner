import { deepFreeze } from '../utils/helpers.js';

export const TaskStatus = deepFreeze({
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED"
});

export const PriorityLevel = deepFreeze({
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH"
});