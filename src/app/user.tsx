"use client";  // Marks this component as a Client Component

// User class
export class User {
    private static instance: User;
    private signin: boolean;
    private fullName: string;
    private email: string;
    private userId: string;
    private token: string;
    
    public constructor() {
        this.signin = false;
        this.fullName = "";
        this.email = "";
        this.userId = "";
        this.token = "";
    }

    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }
        
        return User.instance;
    }

    public setSigninStatus(signin: boolean) {
        this.signin = signin;
    }

    public getSigninStatus() {
        return this.signin;
    }

    public setFullName(fullName: string) {
        this.fullName = fullName;
    }

    public getFullName() {
        return this.fullName;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getEmail() {
        return this.email;
    }

    public setUserId(userId: string) {
        this.userId = userId;
    }

    public getUserId() {
        return this.userId;
    }

    public setToken(token: string) {
        this.token = token;
    }

    public getToken() {
        return this.token;
    }

    public resetAll () {
        this.signin = false;
        this.fullName = "";
        this.email = "";
        this.userId = "";
        this.token = "";
    }
}