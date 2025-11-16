import Link from "next/link";
import Image from "next/image";

type NavItem = {
  href: string;
  iconSrc: string;
  name: "home" | "community" | "log" | "stats";
};

type BottomNavProps = {
  active: NavItem["name"];
  className?: string;
};

const items: NavItem[] = [
  {
    href: "/dashboard",
    name: "home",
    iconSrc: "/fi-rr-home.svg",
  },
  {
    href: "/community",
    name: "community",
    iconSrc: "/Users_Group.svg",
  },
  {
    href: "/chat",
    name: "log",
    iconSrc: "/fi-rr-comments.svg",
  },
  {
    href: "/stats",
    name: "stats",
    iconSrc: "/Chart_Bar_Vertical_01.svg",
  },
];

export function BottomNav({ active, className = "" }: BottomNavProps) {
  return (
    <nav
      className={`mt-6 flex items-center justify-around rounded-[24px] bg-[#d8b5af] px-6 py-4 text-[#4f3b3a] ${className}`}
    >
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center justify-center rounded-full p-2 transition ${
            item.name === active ? "bg-[#f9efed]" : ""
          }`}
        >
          <Image
            src={item.iconSrc}
            alt={item.name}
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </Link>
      ))}
    </nav>
  );
}
