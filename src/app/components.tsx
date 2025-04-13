"use client";  // Marks this component as a Client Component

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

// Components when the user has signed in or not
export function HaveSignedIn({ signin, fullName }: { signin: boolean, fullName?: string }) {
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
                {fullName}
            </button>
            <svg className="profile-icon w-[24px] h-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"  onClick={() => router.push("/profile")}>
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
        </div>
    );
}

// Popup window component
export function Popup({showErrorPopup, setShowErrorPopup, errorTitle, errorMessage}: {showErrorPopup: boolean, setShowErrorPopup: Dispatch<SetStateAction<boolean>>, errorTitle: string, errorMessage: string}) {
    return (
        <>
            {showErrorPopup && (
                <div className="blur-background fixed z-[9999] fixed w-screen h-full top-0 flex items-center justify-center bg-black/25">
                    <div className="w-[480px] fixed flex flex-col gap-[1.6em] items-center justify-center">
                        <h2 className="text-[16pt] text-center font-semibold">{errorTitle}</h2>
                        <p className="text-[12pt] text-center">{errorMessage}</p>
                        <button className="solid-button text-[12pt] w-[160px]" onClick={() => setShowErrorPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    )
}

// Loading animation component
export function Loading({showLoading}: {showLoading: boolean}) {
    return (
        <>
            {showLoading && (
                <div className="blur-background fixed z-[9999] flex flex-col h-full w-full top-0 items-center justify-center bg-black/25 gap-4">
                    <div className="flex gap-[12px]">
                        <span className="loading-dot w-[8px] h-[8px] rounded-full bounce-st"></span>
                        <span className="loading-dot w-[8px] h-[8px] rounded-full bounce-nd"></span>
                        <span className="loading-dot w-[8px] h-[8px] rounded-full bounce-rd"></span>
                    </div>
                </div>
            )}
        </>
    )
}