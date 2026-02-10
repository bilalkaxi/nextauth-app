"use-client";

import { useState } from 'react';
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const params = useSearchParams();
    const token = params.get("token");
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
        });

        if (!res.ok) {
            setError("Invalid token");
            return;
        }

        router.push("/login");
    };
    return (
        <>
            <div className='flex items-center justify-center min-h-screen'>
                <form onSubmit={submit} className='w-full max-w-sm space-y-4'>
                    <h1 className='text-xl font-semibold'>Reset Password</h1>
                    {error && <p className='text-red-600'>{error}</p>}

                    <input
                        type="password"
                        required
                        placeholder="New password"
                        className="w-full border px-3 px-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-black py-2 text-white">
                        Reset
                    </button>
                </form>
            </div>
        </>
    );
}