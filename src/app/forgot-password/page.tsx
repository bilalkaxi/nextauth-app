"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch("/api/password-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        setSent(true);
    };
    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <form onSubmit={submit} className="w-full max-w-sm space-y-4">
                    <h1 className="text-xl font-semibold">Forgot Password</h1>
                    {sent ? (<p className="text-green-600">Link was sent</p>) : (
                        <>
                            <input
                                type="email"
                                required
                                placeholder="Email"
                                className="w-full border px-3 py-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="w-full bg-black py-2 text-white">
                                send reset link
                            </button>
                        </>
                    )}
                </form>
            </div>
        </>
    )
}