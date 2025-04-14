"use client";  // Marks this component as a Client Component

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from 'react';
import { HaveSignedIn } from "./components";

// Get started button component
function GetStarted({signin}: {signin: boolean}) {
    const router = useRouter();

    if (!signin) {
        return (
            <button className="solid-button text-[12pt] w-[240px]" onClick={() => router.push("/signin")}>Let&apos;s Get Started&nbsp;&nbsp;-&gt;</button>
        )
    };

    return (
        <button className="solid-button text-[12pt] w-[240px]" onClick={() => router.push("/task")}>Let&apos;s Get Started&nbsp;&nbsp;-&gt;</button>
    );
}

export default function Home() {
    const router = useRouter();

    // Typing effect configuration
    const texts = ["#ManageYourDailyTasksEasily", "#MakeYourLifeBetter"];
    const [displayedText, setDisplayedText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pause, setPause] = useState(false);

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

            {/* Welcome section */}
            <div className="front absolute w-full h-[60%] top-[0%] flex flex-col items-center justify-center">
                <h1 className="text-[64pt] m-0 text-center font-bold">Welcome</h1>
                <h2 className="text-[16pt] m-0 text-center flex items-center gap-[0.4em]">
                    TaskStack.
                    <ins className="typing">{displayedText}</ins>
                </h2>
            </div>

            {/* Button */}
            <div className="front absolute w-full h-[30%] bottom-25 gap-[1.2em] flex flex-row items-center justify-center">
                <GetStarted signin={user.status} />
            </div>

            {/* Footer */}
            <div className="front footer absolute w-full h-[10%] bottom-10 flex flex-col items-center justify-end">
                <p className="text-[8pt]">Copyright &copy; 2025 TaskStack. All rights reserved.</p>
            </div>

            {/* Purple cicle silhouette background */}
            <div className="background absolute flex justify-center w-[120vw] h-[50vh] bottom-0 overflow-hidden">
                <div className="circle-silhouette-outer glow translate-y-[2em] overflow-hidden absolute w-full h-[120%] rounded-t-[100%]"></div>
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] flex justify-center items-center rounded-t-[100%] blur-[12px] brightness-[120%]">
                    <div className="circle-silhouette-inner translate-y-[-2px] w-[120%] h-[102%] rounded-t-[100%] blur-[32px]"></div>
                </div>
            </div>

            {/* Floating bubble animation */}
            <div className="w-full h-full flex justify-center">
                <div className="circle-glass floating-st w-[80px] h-[80px] z-[5] top-25 right-120 absolute rounded-[100%]" id="circle-glass"></div>
                <div className="circle-glass floating-rd w-[80px] h-[80px] z-[5] top-35 right-35 absolute rounded-[100%]" id="circle-glass"></div>
                <div className="circle-glass floating-nd w-[60px] h-[60px] z-[5] top-50 right-75 absolute rounded-[100%]" id="circle-glass"></div>
                <div className="circle-glass floating-st w-[60px] h-[60px] z-[5] top-30 left-70 absolute rounded-[100%]" id="circle-glass"></div>
                <div className="circle-glass floating-nd w-[70px] h-[70px] z-[5] top-50 left-30 absolute rounded-[100%]" id="circle-glass"></div>
                <div className="circle-glass floating-rd w-[100px] h-[100px] z-[5] top-45 left-100 absolute rounded-[100%]" id="circle-glass"></div>
            </div>
        </div>
    )
}
