"use client";  // Marks this component as a Client Component

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "../user";
import { Popup, Loading } from "../components";
import { Exception } from "../exceptions";
import axios from 'axios';

export default function Signup() {
    const router = useRouter();
    const userInstance = User.getInstance();
    const pageException = Exception.getInstance();

    // Get user data
    const fullName = userInstance.getFullName();
    const email = userInstance.getEmail();

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Function to handle the sign out process
    const handleSignOut = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await axios.post(
                "https://api-todo-list-pbw.vercel.app/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userInstance.getToken()}`
                    }
                }
            );
            
            userInstance.resetAll();
            router.push("/");

            setShowLoading(false);
        } 
        catch (error) {
            console.error('Error posting data:', error);

            setErrorMessage("Failed to sign out. Please check your internet connection.");
            setShowLoading(false);
            setShowErrorPopup(true);
        }
    };

    useEffect(() => {
        if (!userInstance.getSigninStatus()) {
            router.push("/signin");
            pageException.setStatus(true);
        }
    }, []);

    return (
        <div className="flex flex-col w-full h-screen items-center overflow-hidden">
            {/* Header */}
            <div className="header-text fixed w-full flex flex-row top-[4%] items-center justify-between">
                <button className="link-button text-[12pt] font-semibold" onClick={() => router.back()}>&lt;-</button>
            </div>

            {/* Form */}
            <div className="w-screen h-screen top-0 fixed flex items-center justify-center">
                <div className="glass form w-[420px] fixed flex flex-col gap-[2.4em] items-center justify-center">
                    <div className="flex flex-row gap-[24px] w-full items-center justify-start">
                        <div className="flex flex-col gap-[8px] flex-grow">
                            <h1 className="text-[20pt] font-semibold">{fullName}</h1>
                            <p className="text-[12px]">{email}</p>
                        </div>
                        <svg className="profile-icon w-[64px] h-[64px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>
                    </div>
                    <button className="solid-button text-[12pt] w-full" onClick={(e) => {
                        handleSignOut(e)
                        setShowLoading(true)
                    }}>Sign out</button>
                </div>
            </div>

            {/* Popup */}
            <Popup 
                showErrorPopup={showErrorPopup} 
                setShowErrorPopup={setShowErrorPopup} 
                errorTitle="Failed to Sign Out!" 
                errorMessage={errorMessage}
            />

            {/* Loading animation */}
            <Loading showLoading={showLoading} />

            {/* Footer */}
            <div className="front footer fixed w-full h-[10%] bottom-10 flex flex-col items-center justify-end">
                <p className="text-[8pt]">Copyright &copy; 2025 TaskStack. All rights reserved.</p>
            </div>

            {/* Purple cicle silhouette background */}
            <div className="background absolute flex justify-center w-[120vw] h-[50vh] bottom-0 overflow-hidden">
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] rounded-t-[100%]"></div>
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] flex justify-center items-center rounded-t-[100%] blur-[12px] brightness-[120%]">
                    <div className="circle-silhouette-inner translate-y-[-2px] w-[120%] h-[102%] rounded-t-[100%] blur-[32px]"></div>
                </div>
            </div>
        </div>
    );
}
