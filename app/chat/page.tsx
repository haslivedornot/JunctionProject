"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PhoneShell } from "@/components/PhoneShell";
import { BottomNav } from "@/components/BottomNav";

const genericResponses = [
  "That's a great observation! Tracking your triggers is an important step in managing migraines.",
  "I understand how challenging that can be. Have you noticed any patterns with when these symptoms occur?",
  "Thanks for sharing. It's helpful to keep a record of these experiences in your migraine journal.",
  "That sounds difficult. Remember to stay hydrated and get enough rest when you can.",
  "I hear you. Many people find that identifying triggers takes time and patience.",
  "That's useful information. Consider discussing this with your healthcare provider.",
];

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage = {
        id: messages.length + 1,
        text: inputValue,
        isUser: true,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");

      // Show thinking indicator
      setIsThinking(true);

      // Simulate AI response after 1.5-2.5 seconds
      const responseDelay = 1500 + Math.random() * 1000;
      setTimeout(() => {
        const randomResponse =
          genericResponses[Math.floor(Math.random() * genericResponses.length)];
        const aiMessage = {
          id: messages.length + 2,
          text: randomResponse,
          isUser: false,
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsThinking(false);
      }, responseDelay);
    }
  };

  return (
    <PhoneShell innerClassName="gap-5 px-6 pb-8 pt-16 text-left">
      <h1 className="text-center text-[36px] font-bold leading-none text-[#050505]">
        Chat Companion
      </h1>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto pb-4">
        {messages.length === 0 && !isThinking && (
          <div className="flex flex-1 items-center justify-center text-center">
            <p className="text-base text-[#8b7473]">
              Start a conversation with your AI companion
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-[20px] px-5 py-4 ${
                message.isUser
                  ? "bg-[#e8c5bf] text-[#2a2220]"
                  : "bg-white text-[#2a2220]"
              }`}
            >
              <p className="whitespace-pre-line text-[14px] leading-relaxed">
                {message.text}
              </p>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex max-w-[85%] flex-col items-center gap-2 rounded-[20px] bg-white px-5 py-4">
              <Image
                src="/logo.png"
                alt="Thinking"
                width={60}
                height={60}
                className="opacity-80"
              />
              <div className="flex gap-1">
                <span className="animate-bounce text-[#2a2220]" style={{ animationDelay: "0ms" }}>.</span>
                <span className="animate-bounce text-[#2a2220]" style={{ animationDelay: "150ms" }}>.</span>
                <span className="animate-bounce text-[#2a2220]" style={{ animationDelay: "300ms" }}>.</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
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

      <div className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder=""
          className="flex-1 rounded-full border-2 border-[#4f3b3a] bg-[#f9efed] px-6 py-3.5 text-base text-[#4f3c3a] placeholder:text-[#8b7473] focus-visible:outline-none"
        />
        <button
          onClick={handleSend}
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[#4f3b3a] bg-[#f9efed] transition hover:bg-[#f0e0dd]"
          aria-label="Send message"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4f3b3a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>

      <BottomNav active="log" className="mt-auto" />
    </PhoneShell>
  );
}
