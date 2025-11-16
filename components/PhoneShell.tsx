import { ReactNode } from "react";

type PhoneShellProps = {
  children: ReactNode;
  innerClassName?: string;
};

const baseShellClass =
  "h-[812px] w-full max-w-[390px] rounded-[32px] border border-[#3f3433] bg-[#f2dfdb] shadow-[0_25px_60px_rgba(0,0,0,0.65)]";

export function PhoneShell({ children, innerClassName }: PhoneShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#161519] px-4 py-10">
      <div className={`${baseShellClass} overflow-hidden`}>
        <div className="flex h-full w-full flex-col overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className={`flex h-full flex-col px-8 py-12 ${innerClassName ?? ""}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
