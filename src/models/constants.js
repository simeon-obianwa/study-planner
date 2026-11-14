import { deepFreeze } from '../utils/helpers.js';

// Immutable enum defining valid workflow states for a study task
export const TaskStatus = deepFreeze({
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED"
});

// Immutable enum defining valid priority levels for a study task
export const PriorityLevel = deepFreeze({
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH"
});