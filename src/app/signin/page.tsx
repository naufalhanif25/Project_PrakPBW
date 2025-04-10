"use client";  // Marks this component as a Client Component

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col w-full h-full items-center">
            {/* Header */}
            <div className="header-text fixed w-full flex flex-row top-[4%] items-center justify-between">
                <button className="link-button text-[12pt] font-semibold" onClick={() => router.back()}>&lt;-</button>
            </div>

            {/* Form */}
            <div className="w-[100vw] h-[100vh] top-[0%] fixed flex items-center justify-center">    
                <div className="glass form w-[420px] fixed flex flex-col gap-[3.2em] items-center justify-center">
                    <h1 className="text-[16pt] font-semibold">Sign In</h1>
                    <div className="flex flex-col items-center justify-left gap-[1.2em]">
                        <input type="email" id="email" className="input w-full text-[12pt]" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <input type="password" id="password" className="input w-full text-[12pt]" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    {/* TODO: Add a function to this button to handle event  */}
                    <button className="solid-button text-[12pt] w-[160px]">Sign In</button>
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
