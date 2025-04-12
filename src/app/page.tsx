"use client";  // Marks this component as a Client Component

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();

    // Typing effect configuration
    const texts = ["#ManageYourDailyTasksEasily", "#MakeYourLifeBetter"];
    const [displayedText, setDisplayedText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pause, setPause] = useState(false);

    // Typing and deleting logic
    useEffect(() => {
        if (pause) return;

        const currentText = texts[textIndex];
        const speed = isDeleting ? 60 : 80;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                const next = currentText.slice(0, displayedText.length + 1);

                setDisplayedText(next);

                if (next === currentText) {
                    setPause(true);
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            } 
            else {
                const prev = currentText.slice(0, displayedText.length - 1);

                setDisplayedText(prev);

                if (prev === "") {
                    setIsDeleting(false);
                    setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, pause, textIndex]);

    // Delay handler between phrases
    useEffect(() => {
        if (pause) {
            const pauseTimeout = setTimeout(() => setPause(false), 3000);

            return () => clearTimeout(pauseTimeout);
        }
    }, [pause]);

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

            {/* Welcome section */}
            <div className="front absolute w-full h-[60%] top-[0%] flex flex-col items-center justify-center">
                <h1 className="text-[64pt] m-0 text-center font-bold">Welcome</h1>
                <h2 className="text-[16pt] m-0 text-center flex items-center gap-[0.4em]">
                    TaskStack.
                    <ins className="hastag">{displayedText}</ins>
                </h2>
            </div>

            {/* Button */}
            <div className="front absolute w-full h-[30%] top-[60%] gap-[1.2em] flex flex-row items-center justify-center">
                {/* TODO: Add a function to this button to handle event  */}
                <button className="solid-button text-[12pt] w-[200px]">Let's Get Started</button>
            </div>

            {/* Footer */}
            <div className="front footer absolute w-full h-[10%] top-[100%] flex flex-col items-center justify-end">
                <p className="text-[8pt]">Copyright &copy; 2025 TaskStack. All rights reserved.</p>
            </div>

            {/* Purple cicle silhouette background */}
            <div className="background absolute flex justify-center w-[120vw] h-[65vh] overflow-hidden">
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] rounded-t-[100%]"></div>
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] flex justify-center items-center rounded-t-[100%] blur-[12px] brightness-[120%]">
                    <div className="circle-silhouette-inner translate-y-[-2px] w-[120%] h-[102%] rounded-t-[100%] blur-[32px]"></div>
                </div>
            </div>
        </div>
    );
}