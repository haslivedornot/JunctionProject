"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneShell } from "@/components/PhoneShell";

const questions = [
  "Did you drink water in the last hour?",
  "Do you feel well rested?",
  "Do you feel overstimulated?",
  "Have you had a proper meal in the last 4 hours?",
];

export default function CheckInPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Move to completion screen
      setCurrentStep(questions.length);
    }
  };

  const handleContinue = () => {
    router.push("/dashboard");
  };

  // Completion screen
  if (currentStep >= questions.length) {
    return (
      <PhoneShell innerClassName="gap-6 px-6 pb-8 pt-16 text-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <h1 className="text-[32px] font-bold leading-tight text-[#050505]">
            You are doing
            <br />
            <span className="text-[40px]">GREAT!!</span>
          </h1>

          <div className="flex items-center justify-center">
            <svg
              width="160"
              height="160"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fuzzy ball body */}
              <circle cx="100" cy="100" r="60" fill="#050505" />
              {/* Spiky edges effect */}
              {Array.from({ length: 40 }).map((_, i) => {
                const angle = (i * 360) / 40;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + Math.cos(rad) * 50;
                const y1 = 100 + Math.sin(rad) * 50;
                const x2 = 100 + Math.cos(rad) * (60 + Math.random() * 15);
                const y2 = 100 + Math.sin(rad) * (60 + Math.random() * 15);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#050505"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                );
              })}
              {/* Left eye */}
              <ellipse cx="80" cy="90" rx="12" ry="16" fill="white" />
              <circle cx="80" cy="90" r="6" fill="#050505" />
              {/* Right eye */}
              <ellipse cx="120" cy="90" rx="12" ry="16" fill="white" />
              <circle cx="120" cy="90" r="6" fill="#050505" />
            </svg>
          </div>

          <div className="w-full space-y-3">
            <div className="rounded-[26px] bg-[#f0c9c4] px-6 py-4 text-left text-lg text-[#4f3c3a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]">
              Go to an area 20db quieter
            </div>
            <div className="rounded-[26px] bg-[#f0c9c4] px-6 py-4 text-left text-lg text-[#4f3c3a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]">
              Move to an area with 50% less light
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full rounded-full border-2 border-[#9e8584] bg-[#f9efed] px-8 py-4 text-lg font-medium text-[#695555] transition hover:bg-[#f5e8e5]"
        >
          Continue
        </button>
      </PhoneShell>
    );
  }

  // Question screens
  return (
    <PhoneShell innerClassName="items-center justify-between gap-8 px-6 pb-12 pt-16 text-center">
      <h1 className="text-left text-[32px] font-bold leading-none text-[#050505]">
        Check-in
      </h1>

      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="flex min-h-[280px] w-full items-center justify-center rounded-[32px] border-2 border-[#9e8584] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <p className="text-[24px] font-medium leading-tight text-[#050505]">
            {questions[currentStep]}
          </p>
        </div>

        <div className="flex w-full items-center justify-between gap-8 px-4">
          <button
            onClick={() => handleAnswer(false)}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#6b5b5b] bg-[#f9efed] transition hover:bg-[#f0e0dd]"
            aria-label="No"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b5b5b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={() => handleAnswer(true)}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#6b5b5b] bg-[#f9efed] transition hover:bg-[#f0e0dd]"
            aria-label="Yes"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b5b5b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-8" />
    </PhoneShell>
  );
}
