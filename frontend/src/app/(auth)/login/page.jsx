"use client";
import { AuthForm } from "@/components/auth-form";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    
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
        };
        try {
            await login(body.email, body.password);
            router.replace("/chat");
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <AuthForm type="login" onSubmit={handleSubmit} error={error} loading={loading} />
    );
}
