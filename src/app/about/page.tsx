"use client";  // Marks this component as a Client Component

import { useRouter } from "next/navigation";

export default function Signin() {
    const router = useRouter();

    return (
        <div className="flex flex-col w-full h-full items-center">
            {/* Header */}
            <div className="header-text fixed w-full flex flex-row top-[4%] items-center justify-between">
                <button className="link-button text-[12pt] font-semibold" onClick={() => router.push("/")}>TaskStack</button>
                <div className="flex gap-[1.6em] items-center justify-center">
                    {/* TODO: Add conditions  */}
                    <button className="link-button text-[10pt] flex flex-col justify-center items-center text-center" onClick={() => router.push("/signin")}>
                        Sign In
                    </button>
                    <button className="link-button text-[10pt] flex flex-col justify-center items-center text-center" onClick={() => router.push("/signup")}>
                        Sign Up
                    </button>
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
            <div className="w-[100vw] h-[100vh] top-[0%] fixed flex items-center justify-center">
                <div className="glass form w-[80vw] flex flex-col gap-[1.2em] items-center justify-center">
                    <h1 className="text-[16pt] font-semibold">About</h1>
                    <p className="text-[12pt] w-full text-center">
                        TaskStack is a modern and intuitive website designed to help users efficiently manage their daily to-do lists. With a clean and responsive interface, TaskStack makes it easy to add, edit, and complete tasks while offering a seamless user experience across all devices. Enhanced with interactive animations and smart reminders, TaskStack is more than just a productivity tool—it&apos;s your daily companion for staying focused and achieving your goals.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="front footer fixed w-full h-[10%] top-[85%] flex flex-col items-center justify-end">
                <p className="text-[8pt]">Copyright &copy; 2025 TaskStack. All rights reserved.</p>
            </div>

            {/* Purple cicle silhouette background */}
            <div className="background absolute flex justify-center w-[120vw] h-[65vh] overflow-hidden">
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] rounded-t-[100%]"></div>
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] flex justify-center items-center rounded-t-[100%] blur-[12px] brightness-[120%]">
                    <div className="circle-silhouette-inner translate-y-[-2px] rounded-t-[100%] blur-[32px]"></div>
                </div>
            </div>
        </div>
    );
}
