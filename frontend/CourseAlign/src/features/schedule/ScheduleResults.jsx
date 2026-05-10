import {FiZap} from "react-icons/fi";
import {useGenerateSchedule} from "../../hooks/useGenerateSchedule";
import {useEffect, useState} from "react";
import Pagination from "../../components/ui/Pagination";

const PAGE_SIZE = 8;

function ScheduleResults({
  schedules,
  setSchedules,
  selectedSchedule,
  setSelectedSchedule,
  courses,
  earliestStart,
  latestEnd,
  setError,
  hasGenerated,
  setHasGenerated,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const isResults = schedules?.length > 0;
  const {generateSchedule, isGenerating, error, reset} = useGenerateSchedule({
    setSchedules,
    setSelectedSchedule,
  });

  useEffect(() => {
    reset();
  }, [courses, reset]);

  const pageCount = Math.ceil(schedules.length / PAGE_SIZE);
  const paginatedSchedules = schedules.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [schedules]);

  return (
    <>
      <div className="mb-2 lg:mx-5 lg:mb-5 lg:mt-3">
        <button
          onClick={() => {
            if (courses.length === 0) {
              setError("Please add at least one course");
              return;
            }
            setError("");
            setHasGenerated(true);
            generateSchedule({classes: courses, earliestStart, latestEnd});
          }}
          disabled={isGenerating}
          className="bg-brand-primary text-[15px] cursor-pointer hover:bg-action-hover transition-colors text-text-button hover:text-text-button/80 w-full p-3 rounded-lg flex items-center gap-3 justify-center font-semibold"
        >
          {isGenerating ? (
            <div className="loader loader-white" />
          ) : (
            <div className="flex items-center gap-3 justify-center">
              <FiZap size={16} /> <p>Generate Results</p>
            </div>
          )}
        </button>
        {error && (
          <p className="text-error text-xs mt-1 text-center">
            {parseError(error.message)}
          </p>
        )}
        {hasGenerated && !isGenerating && schedules.length === 0 && (
          <p className="text-text-secondary-light text-xs mt-2 text-center opacity-70">
            No schedules found. Try adjusting your time preferences.
          </p>
        )}
      </div>
      {isResults && (
        <div className="my-2">
          <p className="opacity-65 my-2 text-[13px] font-semibold uppercase">
            {schedules.length} Schedules Found
          </p>

          {schedules.some((s) => s.sections.length < courses.length) && (
            <p className="text-alert text-center text-sm mb-2">
              Could not find sections for{" "}
              {getMissingCourses(courses, schedules[0].sections).join(", ")}{" "}
              within your time preferences
            </p>
          )}
          {schedules.length === 0 &&
            !isGenerating &&
            schedules !== initialState && (
              <p>No schedules found. Try adjusting your time preferences.</p>
            )}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-col">
            {paginatedSchedules.map((schedule) => (
              <div key={schedule.id}>
                <button
                  className={`flex w-full flex-col rounded-lg p-2 gap-1 cursor-pointer transition-colors ${selectedSchedule?.id === schedule.id ? "bg-action-light-3 border border-brand-primary" : "bg-action-light-1 border border-transparent hover:bg-action-light-3"}`}
                  onClick={() => setSelectedSchedule(schedule)}
                >
                  <p className="text-left text-xs text-action-light-7 font-semibold ">
                    Schedule {schedule.id}
                  </p>
                  <div className="flex text-[11px] items-center gap-2 text-action-light-5">
                    <p>No conflicts</p>
                    <span>&mdash;</span>
                    <p>{schedule.sections.length} courses </p>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onNext={() => setCurrentPage((p) => p + 1)}
            onPrev={() => setCurrentPage((p) => p - 1)}
          />
        </div>
      )}
    </>
  );
}

function parseError(message) {
  try {
    const parsed = JSON.parse(message);
    return parsed.detail?.trim() ?? message;
  } catch {
    return message;
  }
}

function getMissingCourses(courses, sections) {
  const foundCourses = sections.map((s) => s.courseCode);
  return courses.filter((course) => !foundCourses.includes(course));
}

export default ScheduleResults;
