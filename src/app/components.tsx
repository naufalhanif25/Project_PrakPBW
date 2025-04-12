"use client";  // Marks this component as a Client Component

import { useRouter } from "next/navigation";

// Function to check whether the user is signed in or not
export function HaveSignedIn({ signin, name }: { signin: boolean, name?: string }) {
    const router = useRouter();

    if (!signin) {
        return (
            <>
                <button className="link-button text-[10pt] flex flex-col justify-center items-center text-center" onClick={() => router.push("/signin")}>
                    Sign In
                </button>
                <button className="link-button text-[10pt] flex flex-col justify-center items-center text-center" onClick={() => router.push("/signup")}>
                    Sign Up
                </button>
            </>
        );
    }

    return (
        <div className="flex flex-row gap-[12px] items-center justify-end">
            <button className="link-button text-[10pt] text-nowrap text-right" onClick={() => router.push("/profile")}>
                {name}
            </button>
            <svg className="profile-icon w-[24px] h-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"  onClick={() => router.push("/profile")}>
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
        </div>
    );
}