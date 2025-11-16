import Link from "next/link";
import { PhoneShell } from "@/components/PhoneShell";

export default function OnboardingPage() {
  return (
    <PhoneShell innerClassName="items-center justify-center gap-8 text-center">
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6">
        <Link
          href="/migraine"
          className="w-full max-w-md rounded-full border-2 border-[#6b5b5b] bg-[#e8c5bf] px-8 py-5 text-xl font-medium text-[#695555] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition hover:bg-[#ecc9c3]"
        >
          Having a migraine
        </Link>

        <Link
          href="/checkin"
          className="w-full max-w-md rounded-full border-2 border-[#9e8584] bg-[#f9efed] px-8 py-4 text-lg font-medium text-[#897876] transition hover:bg-[#f5e8e5]"
        >
          Feeling symptoms
        </Link>
      </div>

      <div className="flex flex-col items-center gap-6 pb-8">
        <Link
          href="/dashboard"
          className="text-lg font-medium text-[#6b5b5b] underline transition hover:text-[#4f3b3a]"
        >
          Skip
        </Link>

        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-[#6b5b5b]" />
          <div className="h-2 w-2 rounded-full bg-[#d0b5b0]" />
          <div className="h-2 w-2 rounded-full bg-[#d0b5b0]" />
        </div>
      </div>
    </PhoneShell>
  );
}
