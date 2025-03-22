"use client";
import React from "react";
import { Label } from "@/components/ui/authLabel";
import { Input } from "@/components/ui/authInput";
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AuthForm({ type, onSubmit, error, loading }) {
    return (
        <div
        className="mt-[5%] shadow-input mx-auto w-full max-w-md rounded-none bg-white md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome to SpendWise
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            {(type === 'signup') ? `Signup for an` : `Log into your`} account
        </p>
        <form className="my-8" onSubmit={onSubmit}>
            {type === 'signup' && <div
            className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Tyler" type="text" name="firstname" />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" placeholder="Durden" type="text" name="lastname"/>
            </LabelInputContainer>
            </div>}
            <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" name="email" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" name="password" />
            </LabelInputContainer>
            {error && (
                <div className="text-red-400 text-sm p-1 mb-2">
                    {error}
                </div>
            )}
            <button
            className="flex items-center justify-center group/btn cursor-pointer relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit" {...(loading && { disabled: true })}>
            {(type === 'signup') ? `Sign up` : `Log in`} {(loading) ? <Loader2 className="w-5 h-5 ml-2 animate-spin" /> : <>&rarr;</>}
            <BottomGradient />
            </button>
            <div className="mt-4 mb-[-8%] text-center text-sm">
                {(type === 'signup') ? `Already have an account?` : `Don't have an account?`}{" "}
                <Link href={(type === 'signup') ? `/login` : `/signup`} className="underline underline-offset-4">
                {(type === 'signup') ? `Log in` : `Sign up`}
                </Link>
            </div>
        </form>
        </div>
    )
}


const BottomGradient = () => {
    return (
      <>
        <span
          className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
        <span
          className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
      </>
    );
  };
  
  const LabelInputContainer = ({
    children,
    className
  }) => {
    return (
      <div className={cn("flex w-full flex-col space-y-2", className)}>
        {children}
      </div>
    );
  };
  