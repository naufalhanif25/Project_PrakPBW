"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
    const router = useRouter();

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!fullname || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("https://api-todo-list-pbw.vercel.app/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: fullname,
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to register.");
            }

            alert("Sign up successful! Please login.");
            router.push("/signin");
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full h-screen items-center overflow-hidden">
            {/* Header */}
            <div className="header-text fixed w-full flex flex-row top-[4%] items-center justify-between">
                <button className="link-button text-[12pt] font-semibold" onClick={() => router.back()}>&lt;-</button>
            </div>

            {/* Form */}
            <div className="w-screen h-screen top-0 fixed flex items-center justify-center">
                <div className="glass form w-[420px] fixed flex flex-col gap-[3.2em] items-center justify-center">
                    <h1 className="text-[16pt] font-semibold">Sign Up</h1>
                    <div className="flex flex-col items-center justify-left gap-[1.2em]">
                        <input type="text" className="input w-full text-[12pt]" placeholder="Full name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                        <input type="email" className="input w-full text-[12pt]" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" className="input w-full text-[12pt]" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <p className="account-option-text text-[8pt] flex flex-row">Already have an account?&nbsp;
                            <ins className="account-option cursor-pointer font-semibold no-underline" onClick={() => router.push("/signin")}>Sign in</ins>
                        </p>
                    </div>
                    <button onClick={handleSignup} disabled={loading} className="solid-button text-[12pt] w-[160px]">
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="front footer fixed w-full h-[10%] bottom-10 flex flex-col items-center justify-end">
                <p className="text-[8pt]">Copyright &copy; 2025 TaskStack. All rights reserved.</p>
            </div>

            {/* Background */}
            <div className="background absolute flex justify-center w-[120vw] h-[50vh] bottom-0 overflow-hidden">
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] rounded-t-[100%]"></div>
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] flex justify-center items-center rounded-t-[100%] blur-[12px] brightness-[120%]">
                    <div className="circle-silhouette-inner translate-y-[-2px] w-[120%] h-[102%] rounded-t-[100%] blur-[32px]"></div>
                </div>
            </div>
        </div>
    );
}
