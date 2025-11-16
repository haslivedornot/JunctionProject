"use client";

import { useEffect, useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { BottomNav } from "@/components/BottomNav";

// Static activity data for the year (like GitHub contribution graph)
const activityData = [
  {
    month: "Jan",
    days: [2, 0, 3, 1, 0, 2, 4, 1, 3, 0, 2, 1, 4, 2, 0, 3, 1, 2, 0, 4, 1, 3, 2, 0, 1, 3, 0, 2, 4, 1, 0, 2, 3, 1, 0],
  },
  {
    month: "Feb",
    days: [1, 2, 0, 3, 4, 1, 0, 2, 3, 1, 0, 4, 2, 1, 3, 0, 2, 1, 4, 3, 0, 1, 2, 4, 0, 3, 1, 2, 0, 1, 3, 4, 2, 0, 1],
  },
  {
    month: "Mar",
    days: [3, 1, 0, 2, 4, 3, 1, 0, 2, 1, 4, 3, 0, 2, 1, 0, 3, 2, 4, 1, 0, 3, 2, 1, 4, 0, 2, 1, 3, 0, 4, 2, 1, 0, 3],
  },
  {
    month: "Apr",
    days: [0, 2, 4, 1, 3, 0, 2, 1, 4, 3, 0, 1, 2, 0, 3, 4, 1, 2, 0, 3, 1, 4, 2, 0, 1, 3, 2, 4, 0, 1, 2, 3, 0, 4, 1],
  },
  {
    month: "May",
    days: [2, 1, 3, 0, 4, 1, 2, 0, 3, 4, 1, 0, 2, 3, 1, 4, 0, 2, 1, 3, 0, 2, 4, 1, 3, 0, 2, 1, 0, 4, 2, 3, 1, 0, 2],
  },
];

// Stats based on dashboard data
const stats = {
  averagePainIntensity: 6.5, // out of 10
  migraineDaysThisMonth: 8,
  totalMigrainesTracked: 47,
  beforeAfter: {
    before: {
      migraineDaysPerMonth: 14,
      averageIntensity: 8.2,
    },
    after: {
      migraineDaysPerMonth: 8,
      averageIntensity: 6.5,
    },
    improvement: {
      days: 43, // percentage
      intensity: 21, // percentage
    },
  },
  researchContribution: {
    dataPointsShared: 1247,
    rank: "Top 5%",
  },
};

// Easing function for smooth slowdown
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

function AnimatedNumber({
  target,
  duration = 1500,
  decimals = 0
}: {
  target: number;
  duration?: number;
  decimals?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const value = easedProgress * target;

      setCurrent(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <>{decimals > 0 ? current.toFixed(decimals) : Math.round(current)}</>;
}

function AnimatedProgressBar({
  percentage,
  duration = 1500
}: {
  percentage: number;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const value = easedProgress * percentage;

      setCurrent(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage, duration]);

  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#f4dfdb]">
      <div
        className="h-full rounded-full bg-[#c3726f] transition-all duration-100"
        style={{ width: `${current}%` }}
      />
    </div>
  );
}

function AnimatedBar({
  height,
  index,
  delay = 0
}: {
  height: number;
  index: number;
  delay?: number;
}) {
  const [currentHeight, setCurrentHeight] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const duration = 1200;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const value = easedProgress * height;

        setCurrentHeight(value);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay + index * 50);

    return () => clearTimeout(timeout);
  }, [height, index, delay]);

  return (
    <div
      className="flex-1 rounded-t-sm bg-[#c3726f] transition-all duration-100"
      style={{ height: `${currentHeight}%` }}
    />
  );
}

export default function StatsPage() {
  return (
    <PhoneShell innerClassName="gap-5 px-6 pb-8 pt-16 text-left">
      <h1 className="text-center text-[32px] font-bold leading-none text-[#050505]">
        Your Stats
      </h1>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {/* Research Contribution Badge */}
        <div className="flex items-center gap-3 rounded-full border-2 border-[#c3726f] bg-gradient-to-r from-[#f4dfdb] to-[#e8c5bf] px-5 py-3 shadow-[0_4px_16px_rgba(195,114,111,0.2)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c3726f] shadow-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 15l-2 5-5-5h4V2h6v13h4l-5 5-2-5z" />
            </svg>
          </div>
          <div className="flex-1 text-left">
            <p className="text-[11px] font-semibold text-[#6a4e4d]">
              Research Contributor
            </p>
            <p className="text-xs font-bold text-[#2f201f]">
              {stats.researchContribution.rank} • <AnimatedNumber target={stats.researchContribution.dataPointsShared} /> data points
            </p>
          </div>
        </div>

        {/* Before/After Stats */}
        <section className="rounded-[24px] border-2 border-[#7fb87f] bg-gradient-to-br from-[#e8f5e8] to-[#d4ead4] p-4 shadow-[0_8px_20px_rgba(127,184,127,0.15)]">
          <h2 className="mb-3 text-base font-bold text-[#2d5a2d]">
            Your Progress with MyMi
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[16px] bg-white/60 p-3 text-center backdrop-blur-sm">
              <p className="text-[10px] font-semibold text-[#6a4e4d]">BEFORE</p>
              <p className="mt-1 text-2xl font-bold text-[#c3726f]">
                <AnimatedNumber target={stats.beforeAfter.before.migraineDaysPerMonth} />
              </p>
              <p className="text-[10px] text-[#6a4e4d]">days/month</p>
            </div>
            <div className="rounded-[16px] bg-white/60 p-3 text-center backdrop-blur-sm">
              <p className="text-[10px] font-semibold text-[#6a4e4d]">AFTER</p>
              <p className="mt-1 text-2xl font-bold text-[#7fb87f]">
                <AnimatedNumber target={stats.beforeAfter.after.migraineDaysPerMonth} />
              </p>
              <p className="text-[10px] text-[#6a4e4d]">days/month</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#7fb87f]/20 px-4 py-2">
            <p className="text-xs font-bold text-[#2d5a2d]">
              <AnimatedNumber target={stats.beforeAfter.improvement.days} />% fewer migraine days!
            </p>
          </div>
        </section>

        {/* Average Pain Intensity */}
        <section className="rounded-[24px] border border-[#9e8584] bg-[#e8c5bf] p-4">
          <h2 className="text-base font-bold text-[#050505]">
            Average pain intensity
          </h2>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-[#2f201f]">
                <AnimatedNumber target={stats.averagePainIntensity} decimals={1} />
              </span>
              <span className="text-lg text-[#6a4e4d]">/10</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <div
                  key={level}
                  className="w-2 rounded-sm bg-[#d0a4a0]"
                  style={{
                    height: `${level <= stats.averagePainIntensity ? level * 6 : level * 3}px`,
                    opacity: level <= stats.averagePainIntensity ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Symptom Severity over Time */}
        <section className="rounded-[24px] border border-[#9e8584] bg-[#e8c5bf] p-4">
          <h2 className="text-base font-bold text-[#050505]">
            Symptom Severity over Time
          </h2>
          <div className="mt-4 flex h-24 items-end justify-between gap-1.5">
            {[7, 5, 8, 6, 4, 7, 9, 6, 5, 7, 8, 6].map((severity, index) => (
              <AnimatedBar
                key={index}
                height={(severity / 10) * 100}
                index={index}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-[#6a4e4d]">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
          </div>
        </section>

        {/* Migraine Frequency */}
        <section className="rounded-[24px] border border-[#9e8584] bg-[#e8c5bf] p-4">
          <h2 className="text-base font-bold text-[#050505]">Migraine Frequency</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4f3c3a]">This month</span>
              <span className="text-2xl font-bold text-[#2f201f]">
                <AnimatedNumber target={stats.migraineDaysThisMonth} />
              </span>
            </div>
            <AnimatedProgressBar percentage={(stats.migraineDaysThisMonth / 30) * 100} />
            <p className="text-[10px] text-[#6a4e4d]">
              <AnimatedNumber target={stats.totalMigrainesTracked} /> total migraines tracked
            </p>
          </div>
        </section>

        {/* Activity Graph (GitHub-style) */}
        <section>
          <div className="flex gap-1.5 overflow-x-auto pb-2">
            {activityData.map((monthData, monthIndex) => (
              <div key={monthIndex} className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] font-medium text-[#6a4e4d]">
                  {monthData.month}
                </span>
                <div className="grid grid-cols-7 gap-0.5">
                  {monthData.days.map((activity, dayIndex) => {
                    // Activity levels: 0 = none, 1-4 = increasing intensity
                    const colors = [
                      "bg-[#f4dfdb]", // no activity
                      "bg-[#e8c5bf]", // low
                      "bg-[#d9ada7]", // medium
                      "bg-[#c3908b]", // high
                      "bg-[#b17872]", // very high
                    ];
                    return (
                      <div
                        key={dayIndex}
                        className={`h-2 w-2 rounded-sm ${colors[activity]}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav active="stats" className="mt-auto" />
    </PhoneShell>
  );
}
