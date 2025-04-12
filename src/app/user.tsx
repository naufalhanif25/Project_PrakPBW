"use client";

export class User {
    private static instance: User;
    private signin: boolean;
    private fullname: string;
    private email: string;

    private constructor() {
        // Cek token & userId dari localStorage untuk status signin
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        this.signin = !!(token && userId);
        this.fullname = "";
        this.email = "";
    }

    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }

        return User.instance;
    }

    public setSigninStatus(status: boolean) {
        this.signin = status;

        if (!status) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
        }
    }

    public getSigninStatus(): boolean {
        return this.signin;
    }

    public getFullname(): string {
        return this.fullname;
    }

    public getEmail(): string {
        return this.email;
    }

    // Ambil data user dari API dan simpan di instance
    public async loadUserData(): Promise<void> {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
            this.signin = false;
            return;
        }

        try {
            const res = await fetch(`https://api-todo-list-pbw.vercel.app/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                this.fullname = data.name;
                this.email = data.email;
                this.signin = true;
            } else {
                console.error("Gagal memuat user:", await res.text());
                this.signin = false;
            }
        } catch (err) {
            console.error("Error saat mengambil data user:", err);
            this.signin = false;
        }
    }
}

// Fungsi untuk mendapatkan data nama dan email user
export async function getData(): Promise<[string, string]> {
    const user = User.getInstance();
    if (!user.getFullname() || !user.getEmail()) {
        await user.loadUserData();
    }
    return [user.getFullname(), user.getEmail()];
}
