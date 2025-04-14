"use client";  // Marks this component as a Client Component

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HaveSignedIn } from "../components";

export default function Signin() {
    const router = useRouter();

    const [user, setUser] = useState<{
        _id: string;
        fullName: string;
        email: string;
        token: string;
        status: boolean;
    }>({_id: '', fullName: '', email: '', token: '', status: false});

    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <div className="flex flex-col w-full h-screen items-center overflow-hidden">
            {/* Header */}
            <div className="header-text fixed w-full flex flex-row top-[4%] items-center justify-between">
                <button className="link-button text-[12pt] font-semibold" onClick={() => router.push("/")}>TaskStack</button>
                <div className="flex gap-[1.6em] items-center justify-center">
                    <HaveSignedIn signin={user.status} fullName={user.fullName}/>
                </div>
            </div>

            {/* Navigation bar */}
            <div className="glass fixed flex gap-[2.4em] top-[4%] items-center justify-center">
                <button className="header-button text-[12pt] flex flex-col justify-center items-center text-center" onClick={() => router.push("/")}>
                    Home
                    <hr className="button-underline" />
                </button>
                <button className="header-button text-[12pt] flex flex-col justify-center items-center text-center" onClick={() => router.push("/task")}>
                    Task
                    <hr className="button-underline" />
                </button>
                <button className="header-button text-[12pt] flex flex-col justify-center items-center text-center" onClick={() => router.push("/about")}>
                    About
                    <hr className="button-underline" />
                </button>
            </div>

            {/* Main container */}
            <div className="w-screen h-screen top-0 fixed flex items-center justify-center">
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

            {/* Purple cicle silhouette background */}
            <div className="background absolute flex justify-center w-[120vw] h-[50vh] bottom-[0%] overflow-hidden">
                <div className="translate-y-[2em] overflow-hidden absolute w-full h-[120%] rounded-t-[100%]"></div>
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] flex justify-center items-center rounded-t-[100%] blur-[12px] brightness-[120%]">
                    <div className="circle-silhouette-inner translate-y-[-2px] rounded-t-[100%] blur-[32px]"></div>
                </div>
            </div>
        </div>
    );
}
