import Image from "next/image";
import Link from "next/link";
import { PhoneShell } from "@/components/PhoneShell";
import { withBasePath } from "@/lib/basePath";

export default function Home() {
  return (
    <PhoneShell innerClassName="items-center justify-center gap-12 text-center">
      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-medium text-[#1f1817]">Welcome to</p>
        <h1 className="text-[72px] font-semibold leading-none text-[#050505]">
          MyMi
        </h1>
      </div>

      <Image
        src={withBasePath("/logo.png")}
        alt="MyMi mascot"
        width={240}
        height={240}
        priority
        className="drop-shadow-[0_18px_38px_rgba(0,0,0,0.35)]"
      />

      <Link
        href="/onboarding"
        className="w-full rounded-full border border-[#6b5b5b] bg-[#ebc3bc] py-4 text-xl font-semibold text-[#695555] shadow-[0_4px_28px_rgba(255,240,235,0.9)] transition hover:-translate-y-[1px] hover:bg-[#f1ccc5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b7f7f]"
      >
        Continue
      </Link>
    </PhoneShell>
  );
}
