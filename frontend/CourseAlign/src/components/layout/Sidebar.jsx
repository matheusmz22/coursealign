import {useState} from "react";
import CourseSelector from "../../features/courses/CourseSelector";
import TimeFilters from "../../features/filters/TimeFilters";
import ScheduleResults from "../../features/schedule/ScheduleResults";

function Sidebar({
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
  hasGenerated,
  setHasGenerated,
}) {
  const [error, setError] = useState("");

  return (
    <aside className="w-full shrink-0 overflow-y-auto border-border/50 border-b px-4 py-5 lg:h-screen lg:w-[22rem] lg:border-r lg:border-b-0 lg:px-0 lg:py-0">
      <div className="mx-auto mt-8 mb-10 w-fit rounded-2xl bg-white/8 px-5 py-4 ring-1 ring-white/10">
        <img src="logo.png" className="h-30 w-30 mx-auto mt-2" />
      </div>
      <div className="flex flex-col -mt-10 text-text-primary-light divide-y divide-border/50">
        <div className="px-4">
          <CourseSelector
            courses={courses}
            setCourses={setCourses}
            error={error}
            setError={setError}
          />
        </div>
        <div className="px-4">
          <TimeFilters
            earliestStart={earliestStart}
            setEarliestStart={setEarliestStart}
            latestEnd={latestEnd}
            setLatestEnd={setLatestEnd}
          />
        </div>
        <div className="px-4">
          <ScheduleResults
            schedules={schedules}
            setSchedules={setSchedules}
            selectedSchedule={selectedSchedule}
            setSelectedSchedule={setSelectedSchedule}
            courses={courses}
            earliestStart={earliestStart}
            latestEnd={latestEnd}
            error={error}
            setError={setError}
            hasGenerated={hasGenerated}
            setHasGenerated={setHasGenerated}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
