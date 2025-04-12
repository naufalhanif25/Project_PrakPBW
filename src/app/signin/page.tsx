"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch("https://asia-southeast2-pbw-learn.cloudfunctions.net/todo/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || "Gagal login. Silakan cek email dan password.");
        return;
      }

      localStorage.setItem("access_token", data?.data?.token);
      router.push("/task");
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center overflow-hidden">
      {/* Header */}
      <div className="header-text fixed w-full flex flex-row top-[4%] items-center justify-between px-4">
        <button
          className="link-button text-[12pt] font-semibold"
          onClick={() => router.back()}
        >
          &lt;-
        </button>
      </div>

      {/* Form */}
      <div className="w-screen h-screen top-0 fixed flex items-center justify-center">
        <div className="glass form w-[420px] fixed flex flex-col gap-[2.4em] items-center justify-center">
          <h1 className="text-[16pt] font-semibold">Sign In</h1>
          <div className="flex flex-col items-center justify-left gap-[1.2em] w-full px-6">
            <input
              type="email"
              id="email"
              className="input w-full text-[12pt]"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              className="input w-full text-[12pt]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="account-option-text text-[8pt] flex flex-row">
              Don't have an account yet?&nbsp;
              <ins
                className="account-option cursor-pointer font-semibold no-underline"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </ins>
            </p>
          </div>
          <button
            onClick={handleSignIn}
            className="solid-button text-[12pt] w-[160px]"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="front footer fixed w-full h-[10%] bottom-10 flex flex-col items-center justify-end">
        <p className="text-[8pt]">
          Copyright &copy; 2025 TaskStack. All rights reserved.
        </p>
      </div>

      {/* Purple circle silhouette background */}
      <div className="background absolute flex justify-center w-[120vw] h-[50vh] bottom-0 overflow-hidden">
        <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] rounded-t-[100%]"></div>
        <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] flex justify-center items-center rounded-t-[100%] blur-[12px] brightness-[120%]">
          <div className="circle-silhouette-inner translate-y-[-2px] rounded-t-[100%] blur-[32px]"></div>
        </div>
      </div>
    </div>
  );
}
