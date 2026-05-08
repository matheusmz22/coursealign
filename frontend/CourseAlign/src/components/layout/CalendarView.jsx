import CalendarGrid from "../Calendar/CalendarGrid";
import CalendarHeader from "../Calendar/CalendarHeader";

function CalendarView({selectedSchedule}) {
  return (
    <main className="flex flex-col h-screen">
      <CalendarHeader selectedSchedule={selectedSchedule} />
      <div className="overflow-y-auto flex-1">
        <CalendarGrid selectedSchedule={selectedSchedule} />
      </div>
    </main>
  );
}

export default CalendarView;
