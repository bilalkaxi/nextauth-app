"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            window.location.href = "/dashboard";
        }
    };

    return (
        <>
            <div className="flex items-center justify-center bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
                    <h1 className="text-red-600 mb-4 font-semibold text-center">Login</h1>
                    {error && (
                        <p className="mb-3 text-sm text-red-600">{error}</p>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className="mb-3 w-full rounded boder px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="mb-3 w-full rounded boder px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-black py-2 text-white hover:bg-gray-800">
                        Login
                    </button>
                    <button
                        onClick={() => signIn("google")}
                        className="mt-3 w-full rounded border py-2 hover:bg-gray-100"
                    >
                        Login with Google
                    </button>
                    <button
                        onClick={() => signIn("github")}
                        className="mt-3 w-full rounded border py-2 hover:bg-gray-100"
                    >
                        Login with Github
                    </button>
                </form>
            </div>
        </>
    )
};