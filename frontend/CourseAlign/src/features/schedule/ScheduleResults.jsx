import {FiZap} from "react-icons/fi";
import {useGenerateSchedule} from "../../hooks/useGenerateSchedule";

function ScheduleResults({
  schedules,
  setSchedules,
  selectedSchedule,
  setSelectedSchedule,
  courses,
  earliestStart,
  latestEnd,
  error,
  setError,
}) {
  const isResults = schedules?.length > 0;
  const {generateSchedule, isGenerating} = useGenerateSchedule({
    setSchedules,
    setSelectedSchedule,
  });

  return (
    <>
      <div className="mb-2 lg:mx-5 lg:mb-5 lg:mt-3">
        <button
          onClick={() => {
            if (courses.length == 0) {
              setError("Please add at least one course");
              return;
            }
            setError("");
            generateSchedule({courses, earliestStart, latestEnd});
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
      </div>
      {isResults && (
        <div className="my-2">
          <p className="opacity-65 my-2 text-[13px] font-semibold uppercase">
            {schedules.length} Schedules Found
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-col">
            {schedules.map((schedule) => (
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
        </div>
      )}
    </>
  );
}

export default ScheduleResults;
