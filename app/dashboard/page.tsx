"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PhoneShell } from "@/components/PhoneShell";
import { BottomNav } from "@/components/BottomNav";
import { WeekCalendar } from "@/components/WeekCalendar";

const days = [
  { label: "thu", date: 13 },
  { label: "fri", date: 14 },
  { label: "sat", date: 15 },
  { label: "sun", date: 16, active: true },
  { label: "mon", date: 17 },
  { label: "tue", date: 18 },
  { label: "wed", date: 19 },
];

const migraineProbability = 24;

const contributors = [
  {
    label: "XWeather",
    value: 7,
    detail: "Humidity + pressure swings",
  },
  {
    label: "Calendar",
    value: 6,
    detail: "3 late meetings tonight",
  },
  {
    label: "Sleep",
    value: 5,
    detail: "Past 3 nights: 5h avg",
  },
  {
    label: "Sound",
    value: 6,
    detail: "Cafe noise ~72db",
  },
];

const suggestions = [
  "Go to an area 20db quieter",
  "Move to an area with 50% less light",
];

// Easing function for smooth slowdown
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

function AnimatedNumber({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const value = Math.round(easedProgress * target);

      setCurrent(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <>{current}</>;
}

function AnimatedPieChart({
  ratio,
  label,
  detail
}: {
  ratio: number;
  label: string;
  detail: string;
}) {
  const [currentDegrees, setCurrentDegrees] = useState(0);
  const targetDegrees = Math.round(ratio * 360);
  const percentage = Math.round(ratio * 100);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const degrees = Math.round(easedProgress * targetDegrees);

      setCurrentDegrees(degrees);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetDegrees]);

  return (
    <div className="rounded-[24px] bg-[#f4dfdb] p-3.5 text-left shadow-[0_12px_20px_rgba(0,0,0,0.05)]">
      <div className="text-sm font-semibold text-[#6a4e4d]">
        <span>{label}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div
          className="h-12 w-12 rounded-full border border-[#d0a4a0] transition-all duration-100"
          style={
            {
              background: `conic-gradient(#c3726f 0deg ${currentDegrees}deg, #f4dfdb ${currentDegrees}deg 360deg)`,
            } as CSSProperties
          }
        >
          <div className="m-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#fdf6f4] text-xs font-semibold text-[#6a4e4d]">
            <AnimatedNumber target={percentage} />%
          </div>
        </div>
        <p className="flex-1 text-xs text-[#7a5f5e]">
          {detail}
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PhoneShell innerClassName="gap-5 px-6 pb-8 pt-16 text-left">
      <WeekCalendar days={days} />

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto">
        <section className="space-y-2.5 text-center text-[#392827]">
          <div className="relative rounded-[36px] bg-[#e3c1bc] p-6 shadow-[0_18px_30px_rgba(0,0,0,0.08)]">
            <p className="text-2xl font-medium">Migraine Probability</p>
            <p className="pt-2 text-6xl font-semibold text-[#2f201f]">
              <AnimatedNumber target={migraineProbability} />%
            </p>
            <Link
              href="/onboarding"
              className="absolute bottom-4 right-4 transition hover:opacity-70"
              aria-label="Go to check-in"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2f201f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {suggestions.map((tip) => (
            <div
              key={tip}
              className="rounded-[26px] bg-[#f0c9c4] px-6 py-4 text-left text-lg text-[#4f3c3a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"
            >
              {tip}
            </div>
          ))}
        </section>

        <section className="grid grid-cols-2 gap-3 text-center text-[#392827]">
          {contributors.map((contribution) => {
            const ratio = contribution.value / migraineProbability;
            return (
              <AnimatedPieChart
                key={contribution.label}
                ratio={ratio}
                label={contribution.label}
                detail={contribution.detail}
              />
            );
          })}
        </section>
      </div>

      <BottomNav active="home" className="mt-auto" />
    </PhoneShell>
  );
}
