"use client";
import { AuthForm } from "@/components/auth-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function SignupForm() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    let router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let formData = new FormData(e.target);
        let body = {};
        for (let [key, value] of formData.entries()) {
            if (value === "") {
                setError("All fields are required");
                setLoading(false);
                return;
            }
            body[key] = value;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(body),
        });

        if (res.ok) {
            let log = await login(body.email, body.password);
            router.replace("/chat");
        } else {
            const errorData = await res.json();
            setError(errorData.error || 'Signup failed');
        }
        setLoading(false);
    }

    return (
        <AuthForm type="signup" onSubmit={handleSubmit} error={error} loading={loading}/>
    );
}
