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

export function formatDate(date) {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    }).format(date);
}

export function isOverdue(dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
}

// External Library, I applied the uuid npm package
export function generateId() {
    return uuidv4();
}