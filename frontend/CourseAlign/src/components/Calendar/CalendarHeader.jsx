import {FiCalendar} from "react-icons/fi";

function CalendarHeader({selectedSchedule}) {
  return (
    <div className="flex shrink-0 flex-col gap-1 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-text-main">
        <FiCalendar size={18} className="text-brand-primary" />
        <span className="font-medium">Schedule {selectedSchedule?.id}</span>
      </div>

      <span className="text-xs text-text-muted opacity-70">
        {selectedSchedule?.sections?.length ?? 0} courses · No conflicts
      </span>
    </div>
  );
}

export default CalendarHeader;
