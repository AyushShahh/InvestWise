"use client";
import React from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export default function Features() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="h-screen flex flex-col lg:flex-row overflow-hidden items-center justify-center bg-black w-full gap-4 mx-auto px-8 relative">
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
              dotSize={2} />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
    </div>
  );
}

export const projects = [
    {
      title: "AI Financial Advisor",
      description: "An AI-powered financial chatbot that helps people make better investing decisions. Fine-tuned on our own curated knowledge base.",
    },
    {
      title: "Powerful Visualization",
      description: "Charts and graphs to visualize your investment performance and help you make better decisions.",
    },
    {
        title: "Real-time Market Data",
        description: "real-time market data, stock prices, and other relevant financial information.",
    }
  ];