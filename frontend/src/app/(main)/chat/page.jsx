"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Image from "next/image";
import Gemini from "/public/google-gemini-icon.svg";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(null);
    const [input, setInput] = useState(null);
    const [error, setError] = useState(null);

    const placeholders = [
        "What are the Risk Assessment Models?",
        "Explain Market Regulations and SEBI guidelines",
        "What are the tax slabs, deductions, and benefits?",
        "Common asset allocation strategies.",
        "How to calculate the return on investment?",
        "What are the different types of mutual funds?"
      ];
    
      const handleChange = (e) => {
        setInput(e.target.value);
      };

      const onSubmit = async (e) => {
        e.preventDefault();
        if (!input) {
          setError("Please enter a question");
          return;
        }
        setGenerating(true);
        setGenerated(null)
        
        let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ input }),
        });

        if (res.ok) {
            let json = await res.json();
            setError(null)
            setGenerated(json.response);
            setGenerating(false);
        } else {
            let errorData = await res.json();
            setError(errorData.error || 'Failed to generate response');
            setGenerating(false);
        }
      };

      return (
        <div className="mt-10 flex flex-col items-center px-4">
          <h2
            className="mb-8 sm:mb-16 text-xl text-center sm:text-5xl dark:text-white text-black">
            Ask InvestWise AI anything
          </h2>
          <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
          <div className={`${generated ? "bg-neutral-800" : "bg-neutral-900"} w-full overflow-y-auto max-w-xl rounded mt-8 px-3 pt-3 pb-4 transition-200`}>
            {generating &&
                <div>
                    <div className="flex">
                        <Image src={Gemini} alt="Gemini icon" className="animate-spin"/>&nbsp;&nbsp;
                        <p>Generating...</p>
                    </div>
                    <div className="animate-pulse">
                        <div className="h-4 mt-2 rounded  bg-blue-300"></div>
                        <div className="h-4 mt-2 rounded bg-blue-300"></div>
                        <div className="h-4 mt-2 rounded bg-blue-300"></div>
                    </div>
                </div>
            }
            {error && <p className="text-red-400">{error}</p>}
            {generated && <div className="h-full overflow-y-auto max-h-[300px]">
                <Image src={Gemini} alt="Gemini icon" className="mb-2"/>
                <ReactMarkdown>
                    {generated}
                </ReactMarkdown>
            </div>}
          </div>
        </div>
    );
}

