import {useState} from "react";
import CourseSelector from "../../features/courses/CourseSelector";
import TimeFilters from "../../features/filters/TimeFIlters";
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
}) {
  const [error, setError] = useState("");

  return (
    <aside className=" overflow-y-auto border-border/50 border-r">
      <img src="logo.png" className="h-30 w-30 mx-auto mt-2" />
      <div className="flex flex-col text-text-primary-light divide-y divide-border/50">
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
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
