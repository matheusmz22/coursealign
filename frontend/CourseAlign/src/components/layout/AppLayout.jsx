import Sidebar from "./Sidebar";
import CalendarView from "./CalendarView";

function AppLayout({
  courses,
  setCourses,
  earliestStart,
  setEarliestStart,
  latestEnd,
  setLatestEnd,
  schedules,
  setSchedules,
  selectedSchedule,
  setSelectedSchedule,
}) {
  return (
    <div className="min-h-screen bg-bg-app lg:flex lg:h-screen lg:overflow-hidden">
      <Sidebar
        courses={courses}
        setCourses={setCourses}
        earliestStart={earliestStart}
        setEarliestStart={setEarliestStart}
        latestEnd={latestEnd}
        setLatestEnd={setLatestEnd}
        schedules={schedules}
        setSchedules={setSchedules}
        selectedSchedule={selectedSchedule}
        setSelectedSchedule={setSelectedSchedule}
      />
      <main className="min-h-0 flex-1 lg:overflow-hidden">
        <CalendarView selectedSchedule={selectedSchedule} />
      </main>
    </div>
  );
}

export default AppLayout;
