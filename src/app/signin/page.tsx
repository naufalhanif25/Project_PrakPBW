"use client";  // Marks this component as a Client Component

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "../user";
import { Popup, Loading } from "../components";
import { Exception } from "../exceptions";
import axios from 'axios';

// APIResponse type
type APIResponse = {
    message: string;
    data: {
        _id: string;
        fullName: string;
        email: string;
        token: string;
    };
};

export default function Signin() {
    const router = useRouter();
    const userInstance = User.getInstance();
    const pageException = Exception.getInstance();

    const [formData, setFormData] = useState({ email: '', password: ''});

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [firstClick, setFirstClick] = useState(true);
    const [passwordState, setPasswordState] = useState("password");

    // Function to handle the sign in process
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        // Function to check email validity
        function isEmailValid(email: string) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            return regex.test(email);
        }
        
        try {
            // Validate user data
            if (!isEmailValid(formData.email)) {
                throw new Error("Email is invalid or empty. Please check again.");
            }

            if ((formData.password).length < 8) {
                throw new Error("Password is invalid or empty. Please check again.");
            }

            setShowLoading(true);

            const response = await axios.post<APIResponse>('https://api-todo-list-pbw.vercel.app/auth/login', formData);
            const { _id, fullName, email, token } = response.data.data;
          
            console.log('Response:', response.data);
            
            userInstance.setUserId(_id);
            userInstance.setFullName(fullName);
            userInstance.setEmail(email);
            userInstance.setToken(token);
            userInstance.setSigninStatus(true);
            router.push("/");
        } 
        catch (error: any) {
            console.error('Error posting data:', error);

            setErrorMessage("Failed to log in. Make sure the data you entered is correct and the account is registered or check your internet connection.");
            setShowErrorPopup(true);
        }
        finally {
            setShowLoading(false);
        }
    };

    // Handle password input state
    const handelPasswordState = () => {
        if (firstClick) {
            setPasswordState("text");
            setFirstClick(false);
        }
        else {
            setPasswordState("password");
            setFirstClick(true);
        }
    }

    useEffect(() => {
        if (userInstance.getSigninStatus()) {
            router.back();
        }
    }, []);

    return (
        <div className="flex flex-col w-full h-screen items-center overflow-hidden">
            {/* Header */}
            <div className="header-text fixed w-full flex flex-row top-[4%] items-center justify-between">
                <button className="link-button text-[12pt] font-semibold" onClick={() => {
                    if (!userInstance.getSigninStatus() && pageException.getStatus()) {
                        window.history.go(-2);
                        pageException.setStatus(false);
                    }
                    else {
                        router.back();
                    }
                }}>&lt;-</button>
            </div>

            {/* Form */}
            <div className="w-screen h-screen top-0 fixed flex items-center justify-center">    
                <div className="glass form w-[420px] fixed flex flex-col gap-[2.4em] items-center justify-center">
                    <h1 className="text-[16pt] font-semibold">Sign In</h1>
                    <form onSubmit={handleSignIn} className="flex flex-col items-center justify-left gap-[1.2em]">
                        <input type="email" className="input w-full text-[12pt]" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required/>
                        <div className="input flex flex-row items-center justify-center gap-[8px]">
                            <input type={passwordState} className="no-outline w-full text-[12pt]" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required/>
                            {firstClick ? (
                                <div className="form-icon z-100" onClick={handelPasswordState}>
                                    <svg className="w-full h-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2,12S5,4,12,4s10,8,10,8-2,8-10,8S2,12,2,12Z"></path>
                                        <circle cx="12" cy="12" r="4"></circle>
                                        <circle cx="12" cy="12" r="4"></circle>
                                    </svg>
                                </div>
                            ) : (
                                <div className="form-icon z-100" onClick={handelPasswordState}>
                                    <svg className="w-full h-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.86,18.14l-.44.32-.48.29-.51.27c-.17.08-.35.17-.54.24l-.56.22-.6.18-.63.14-.67.11-.7.07L12,20l-.73,0-.7-.07L9.9,19.8l-.63-.14-.6-.18-.56-.22c-.19-.07-.37-.16-.54-.24l-.51-.27-.48-.29-.44-.32a4.46,4.46,0,0,1-.43-.33l-.39-.34L5,17.11l-.34-.36c-.11-.13-.22-.25-.32-.38L4,16l-.27-.37-.25-.38c-.08-.12-.15-.24-.22-.36l-.21-.36-.18-.34-.16-.33-.15-.32-.12-.29c0-.09-.08-.18-.11-.27l-.09-.24c0-.08-.06-.15-.08-.22l-.06-.18a1,1,0,0,1,0-.14.76.76,0,0,1,0-.11V12l0-.07a.76.76,0,0,1,0-.11l.06-.14.08-.18c0-.07.07-.14.1-.22L2.44,11c0-.09.09-.18.14-.27l.15-.29.18-.32C3,10,3,9.93,3.1,9.81l.22-.34c.07-.12.15-.24.23-.36l.26-.36c.08-.13.18-.25.27-.38L4.37,8l.32-.37L5,7.25l.35-.36.38-.36.4-.34"></path>
                                        <path d="M10.14,4.2l.59-.11L11.36,4,12,4l.64,0,.63.07.59.11.58.14.55.18.53.22c.17.07.34.16.51.24l.49.27.46.29.44.32.42.33.4.34.38.36.35.36.34.38c.11.12.21.24.31.37s.2.25.3.37.19.25.27.38l.26.36c.08.12.16.24.23.36l.22.34c.06.12.13.23.19.33l.18.32.15.29c0,.09.1.18.14.27l.12.24c0,.08.07.15.1.22l.08.18.06.14a.76.76,0,0,1,0,.11L22,12v.11a.76.76,0,0,1,0,.11,1,1,0,0,1,0,.14l-.06.18c0,.07-.05.14-.08.22s-.06.16-.09.24-.07.18-.11.27l-.12.29-.15.32-.16.33-.18.34-.21.36"></path>
                                        <path d="M14.83,14.83A4,4,0,0,1,9.17,9.17"></path>
                                        <line x1="2" y1="2" x2="22" y2="22"></line>
                                    </svg>
                                </div>
                            )}
                        </div>
                        <p className="account-option-text text-[8pt] flex flex-row">Don&apos;t have an account yet?&nbsp;
                            <ins className="account-option cursor-pointer font-semibold no-underline" onClick={() => router.push("/signup")}>Sign up</ins>
                        </p>
                        <button type="submit" className="solid-button text-[12pt] w-[160px] mt-[1.2em]">Sign In</button>
                    </form>
                </div>
            </div>

            {/* Popup */}
            <Popup 
                showErrorPopup={showErrorPopup} 
                setShowErrorPopup={setShowErrorPopup} 
                errorTitle="Failed to Sign In!" 
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
                    <div className="circle-silhouette-inner translate-y-[-2px] rounded-t-[100%] blur-[32px]"></div>
                </div>
            </div>
        </div>
    );
}
