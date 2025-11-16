import { ReactNode } from "react";

type PhoneShellProps = {
  children: ReactNode;
  innerClassName?: string;
};

const shellClass =
  "flex min-h-screen w-full flex-col bg-[#f2dfdb] text-[#050505] md:h-[812px] md:max-w-[390px] md:rounded-[32px] md:border md:border-[#3f3433] md:bg-[#f2dfdb] md:shadow-[0_25px_60px_rgba(0,0,0,0.65)] md:overflow-hidden";

export function PhoneShell({ children, innerClassName }: PhoneShellProps) {
  return (
    <div className="min-h-screen bg-[#f2dfdb] md:flex md:items-center md:justify-center md:bg-[#161519] md:px-4 md:py-10">
      <div className={shellClass}>
        <div className="flex h-full flex-1 flex-col overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className={`flex flex-1 flex-col px-5 pb-10 pt-12 sm:px-6 md:px-8 ${innerClassName ?? ""}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
