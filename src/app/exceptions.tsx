"use client";  // Marks this component as a Client Component

// Exception class
export class Exception {
    public static instance: Exception;
    private wasThrown: boolean;

    constructor() {
        this.wasThrown = false;
    }

    public static getInstance(): Exception {
        if (!Exception.instance) {
            Exception.instance = new Exception();
        }
        
        return Exception.instance;
    }

    getStatus() {
        return this.wasThrown;
    }

    setStatus(wasThrown: boolean) {
        this.wasThrown = wasThrown;
    }
}