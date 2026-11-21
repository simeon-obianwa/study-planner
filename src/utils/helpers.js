import { v4 as uuidv4 } from 'uuid';

// Recursion, This function calls itself to freeze nested objects
export function deepFreeze(object) {
    const propNames = Object.getOwnPropertyNames(object);
    for (const name of propNames) {
        const value = object[name];
        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }
    return Object.freeze(object);
}

/**
 * Formats a Date object or date string into a human-readable string (e.g., "15 Nov 2026").
 * Returns a safe fallback if the provided date is invalid.
 */
export function formatDate(date) {
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
        return 'No due date';
    }
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    }).format(parsedDate);
}

/**
 * To compares a due date against the current date at midnight (00:00:00)
 * and returns true if the deadline has already passed.
 */
export function isOverdue(dueDate) {
    const due = new Date(dueDate);
    if (Number.isNaN(due.getTime())) {
        return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
}

// External library, I applied the uuid npm package
export function generateId() {
    return uuidv4();
}