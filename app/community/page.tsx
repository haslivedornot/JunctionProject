import Link from "next/link";
import { PhoneShell } from "@/components/PhoneShell";
import { BottomNav } from "@/components/BottomNav";

const posts = [
  {
    title: "Anyone else get visual auras before migraines?",
    body: `Hey everyone,
For the past few weeks I’ve been getting these weird shimmering lights in my vision about 20—30 minutes before a migraine hits. Does anyone else experience this? How do you deal with the aura phase or prevent the headache from getting worse?`,
  },
  {
    title: "Small change that helped reduce my migraine fog…",
    body: `Just wanted to share something that made a difference for me: staying super consistent with sleep. Going to bed and waking up at the same time cut my migraine days almost in half. Not a cure, but it helped more than I expected!`,
  },
  {
    title: "Triggers you didn’t expect?",
    body: `I feel like I’ve identified the obvious triggers (stress, dehydration), but recently I think strong perfumes and certain LED lights are setting me off. What surprising triggers have you discovered, and how did you confirm them?`,
  },
];

export default function CommunityPage() {
  return (
    <PhoneShell innerClassName="gap-5 px-6 pb-8 pt-16 text-left">
      <h1 className="text-center text-[36px] font-bold leading-none text-[#050505]">
        Community
      </h1>

      <input
        type="text"
        placeholder="Ask anything..."
        className="w-full rounded-[26px] border border-[#9e8584] bg-[#f8e8e5] px-6 py-3.5 text-base text-[#4f3c3a] placeholder:text-[#8b7473] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b19190]"
      />

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-[24px] bg-[#f9efed] px-5 py-4 text-left shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            <h2 className="text-[17px] font-bold leading-tight text-[#050505]">
              {post.title}
            </h2>
            <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-[#2a2220]">
              {post.body}
            </p>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                aria-label="Reply"
                className="text-[20px] text-[#897876] transition hover:text-[#6a5654]"
              >
                ↩
              </button>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="#"
        className="flex items-center justify-center gap-2.5 rounded-full border border-[#7a6563] bg-[#e8c5bf] px-6 py-3.5 text-[17px] font-medium text-[#544240] shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition hover:bg-[#ecc8c2]"
      >
        <span className="text-[24px] font-light leading-none">+</span>
        Add a post
      </Link>

      <BottomNav active="community" className="mt-auto" />
    </PhoneShell>
  );
}
