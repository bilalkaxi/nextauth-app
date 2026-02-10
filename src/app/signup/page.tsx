"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/signup",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email,password,name}),
        });

        const data = await res.json();
    
    if(!res.ok) {
        setError(data.error || "Something went wrong");
        return;
    }
    router.push('/login')
    };
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded bg-white p-6 shadow"
                >
                <h1 className="mb-4 text-2xl font-semibold text-center">Sign up</h1>

                {error && ( <p className="mb-3 text-sm text-red-600">{error}</p>)}

                <input
                 type="text"
                 placeholder="Enter your name"
                 className="mb-3 w-full rounded border px-3 py-2"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 required
                />
                <input
                 type="email"
                 placeholder="Enter your email"
                 className="mb-3 w-full rounded border px-3 py-2"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                />
                <input
                 type="password"
                 placeholder="Enter your password"
                 className="mb-3 w-full rounded border px-3 py-2"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                />
                <button
                    type="submit"
                    className="w-full rounded bg-black py-2 text-white hover:bg-gray-800"
                >
                    Create account
                </button>
            </form>
        </div>
    );
}