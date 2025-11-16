"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PhoneShell } from "@/components/PhoneShell";

export default function MigrainePage() {
  const router = useRouter();
  const [showBrightnessPopup, setShowBrightnessPopup] = useState(false);
  const [showAudioPopup, setShowAudioPopup] = useState(false);

  useEffect(() => {
    // Show brightness popup first
    const timer1 = setTimeout(() => {
      setShowBrightnessPopup(true);
    }, 500);

    // Hide brightness, show audio popup
    const timer2 = setTimeout(() => {
      setShowBrightnessPopup(false);
      setShowAudioPopup(true);
    }, 2500);

    // Hide audio popup
    const timer3 = setTimeout(() => {
      setShowAudioPopup(false);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleContinue = () => {
    router.push("/dashboard");
  };

  return (
    <PhoneShell innerClassName="items-center justify-center gap-8 px-6 text-center">
      {/* Brightness Popup */}
      {showBrightnessPopup && (
        <div className="fixed left-1/2 top-20 z-50 w-[90%] max-w-sm -translate-x-1/2 animate-fade-in rounded-[24px] border-2 border-[#9e8584] bg-[#f9efed] px-6 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c3726f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            <p className="flex-1 text-left text-sm font-medium text-[#2f201f]">
              Reduced brightness on your phone
            </p>
          </div>
        </div>
      )}

      {/* Audio Popup */}
      {showAudioPopup && (
        <div className="fixed left-1/2 top-20 z-50 w-[90%] max-w-sm -translate-x-1/2 animate-fade-in rounded-[24px] border-2 border-[#9e8584] bg-[#f9efed] px-6 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c3726f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            <p className="flex-1 text-left text-sm font-medium text-[#2f201f]">
              Reduced audio output from your phone
            </p>
          </div>
        </div>
      )}

      {/* Encouragement Screen - Always visible */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-[28px] font-bold leading-tight text-[#050505]">
            You&apos;re doing great
          </h1>

          <Image
            src="/logo.png"
            alt="MyMi mascot"
            width={200}
            height={200}
            className="drop-shadow-[0_12px_28px_rgba(0,0,0,0.25)]"
          />

          <div className="space-y-4 text-center">
            <p className="text-lg font-medium leading-relaxed text-[#2f201f]">
              Find a dark, quiet space
            </p>
            <p className="text-base leading-relaxed text-[#6a4e4d]">
              Take a moment to rest and meditate.
              <br />
              Focus on your breathing and let your body relax.
            </p>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full rounded-full border-2 border-[#9e8584] bg-[#f9efed] px-8 py-4 text-lg font-medium text-[#695555] transition hover:bg-[#f5e8e5]"
        >
          Continue
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </PhoneShell>
  );
}
