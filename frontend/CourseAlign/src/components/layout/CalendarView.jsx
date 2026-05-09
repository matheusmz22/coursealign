import CalendarGrid from "../Calendar/CalendarGrid";
import CalendarHeader from "../Calendar/CalendarHeader";

function CalendarView({selectedSchedule}) {
  return (
    <main className="flex h-[650px] flex-col overflow-hidden lg:h-screen">
      <CalendarHeader selectedSchedule={selectedSchedule} />

      <div className="min-h-0 flex-1 overflow-auto">
        <CalendarGrid selectedSchedule={selectedSchedule} />
      </div>
    </main>
  );
}

export default CalendarView;
