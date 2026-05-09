const timeOptions = [
  {label: "8:00 AM", value: "08:00"},
  {label: "9:00 AM", value: "09:00"},
  {label: "10:00 AM", value: "10:00"},
  {label: "11:00 AM", value: "11:00"},
  {label: "12:00 PM", value: "12:00"},
  {label: "1:00 PM", value: "13:00"},
  {label: "2:00 PM", value: "14:00"},
  {label: "3:00 PM", value: "15:00"},
  {label: "4:00 PM", value: "16:00"},
  {label: "5:00 PM", value: "17:00"},
  {label: "6:00 PM", value: "18:00"},
  {label: "7:00 PM", value: "19:00"},
  {label: "8:00 PM", value: "20:00"},
  {label: "9:00 PM", value: "21:00"},
  {label: "10:00 PM", value: "22:00"},
];
function TimeFilters({
  earliestStart,
  setEarliestStart,
  latestEnd,
  setLatestEnd,
}) {
  return (
    <div className="mb-2 lg:mt-3 lg:mb-5">
      <p className="opacity-65 mb-3 text-[14px] uppercase font-semibold">
        Time Preferences
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <div className="flex flex-col gap-1">
          <span className="opacity-60 text-sm">Earliest Start</span>
          <select
            className="h-10 rounded-lg border border-border/60 bg-brand-dark-1 px-2 text-sm cursor-pointer"
            value={earliestStart}
            onChange={(e) => setEarliestStart(e.target.value)}
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="opacity-60 text-sm">Latest End</span>
          <select
            className="h-10 rounded-lg border border-border/60 bg-brand-dark-1 px-2 text-sm cursor-pointer"
            value={latestEnd}
            onChange={(e) => setLatestEnd(e.target.value)}
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TimeFilters;
