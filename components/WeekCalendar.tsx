type Day = {
  label: string;
  date: number;
  active?: boolean;
};

type WeekCalendarProps = {
  days: Day[];
  className?: string;
};

export function WeekCalendar({ days, className = "" }: WeekCalendarProps) {
  return (
    <header className={`text-center ${className}`}>
      <div className="grid grid-cols-7 text-xs font-medium text-[#917373]">
        {days.map((day) => (
          <div key={day.date} className="flex flex-col items-center gap-1">
            <span className="uppercase tracking-[0.15em]">{day.label}</span>
            <span
              className={`text-lg ${
                day.active ? "text-[#2f201f]" : "text-[#917373]"
              }`}
            >
              {day.date}
            </span>
            {day.active && (
              <span className="h-1 w-1 rounded-full bg-[#2f201f]" />
            )}
          </div>
        ))}
      </div>
    </header>
  );
}
