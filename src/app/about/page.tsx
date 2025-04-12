"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { HaveSignedIn } from "../components";
import { User, getData } from "../user";

export default function About() {
    const router = useRouter();
    const BASE_URL = "https://api-todo-list-pbw.vercel.app";

    const user = User.getInstance();
    const [fullname, setFullname] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const isLoggedIn = user.getSigninStatus();

    useEffect(() => {
        // Mengambil data user secara asinkron
        const fetchUserData = async () => {
            const [name] = await getData(); // Menunggu Promise untuk mendapatkan fullname
            setFullname(name); // Menyimpan fullname ke state

            const storedToken = localStorage.getItem("token");
            const storedUserId = localStorage.getItem("userId");
            if (storedToken && storedUserId) {
                setToken(storedToken);
                setUserId(storedUserId);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        if (!userId || !token) return;

        try {
            await axios.post(`${BASE_URL}/auth/logout/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            router.push("/signin");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="flex flex-col w-full h-screen items-center overflow-hidden">
            {/* Header */}
            <div className="header-text fixed w-full flex flex-row top-[4%] items-center justify-between px-4">
                <button className="link-button text-[12pt] font-semibold" onClick={() => router.push("/")}>
                    TaskStack
                </button>
                <div className="flex gap-[1.6em] items-center justify-center">
                    {isLoggedIn ? (
                        <>
                            <HaveSignedIn signin={true} name={fullname} />
                            <button className="link-button text-[10pt]" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button className="link-button text-[10pt]" onClick={() => router.push("/signin")}>Sign In</button>
                            <button className="link-button text-[10pt]" onClick={() => router.push("/signup")}>Sign Up</button>
                        </>
                    )}
                </div>
            </div>

            {/* Navigation bar */}
            <div className="glass fixed flex gap-[2.4em] top-[4%] items-center justify-center">
                <button className="header-button text-[12pt]" onClick={() => router.push("/")}>
                    Home
                    <hr className="button-underline" />
                </button>
                <button className="header-button text-[12pt]" onClick={() => router.push("/task")}>
                    Task
                    <hr className="button-underline" />
                </button>
                <button className="header-button text-[12pt]" onClick={() => router.push("/about")}>
                    About
                    <hr className="button-underline" />
                </button>
            </div>

            {/* Main container */}
            <div className="w-screen h-screen fixed flex items-center justify-center">
                <div className="glass form w-[80vw] flex flex-col gap-[1.2em] items-center justify-center">
                    <h1 className="text-[16pt] font-semibold">About</h1>
                    <p className="text-[12pt] w-full text-center">
                        TaskStack is a modern and intuitive website designed to help users efficiently manage their daily to-do lists. With a clean and responsive interface, TaskStack makes it easy to add, edit, and complete tasks while offering a seamless user experience across all devices. Enhanced with interactive animations and smart reminders, TaskStack is more than just a productivity tool—it&apos;s your daily companion for staying focused and achieving your goals.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="front footer fixed w-full h-[10%] bottom-10 flex flex-col items-center justify-end">
                <p className="text-[8pt]">Copyright &copy; 2025 TaskStack. All rights reserved.</p>
            </div>

            {/* Purple circle silhouette background */}
            <div className="background absolute flex justify-center w-[120vw] h-[50vh] bottom-[0%] overflow-hidden">
                <div className="circle-silhouette-outer translate-y-[2em] absolute w-full h-[120%] rounded-t-[100%]" />
                <div className="circle-silhouette-outer translate-y-[2em] absolute w-full h-[120%] flex justify-center items-center rounded-t-[100%] blur-[12px] brightness-[120%]">
                    <div className="circle-silhouette-inner translate-y-[-2px] rounded-t-[100%] blur-[32px]" />
                </div>
            </div>
        </div>
    );
}
