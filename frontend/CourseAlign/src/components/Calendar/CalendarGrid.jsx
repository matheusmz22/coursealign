import {Fragment} from "react";

const HOUR_HEIGHT = 60;
const START_HOUR = 8;
const days = ["MON", "TUE", "WED", "THU", "FRI"];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

const BLOCK_COLORS = [
  {bg: "#f8d7da", border: "#a6192e", text: "#7a1020"},

  {bg: "#f6dfd2", border: "#b45309", text: "#7c2d12"},

  {bg: "#f5ead1", border: "#a16207", text: "#713f12"},

  {bg: "#ecd9f6", border: "#9333ea", text: "#6b21a8"},
];

function CalendarGrid({selectedSchedule}) {
  return (
    <div className="text-text-secondary-light">
      {/* DAYS HEADER - FIXED ON TOP*/}
      <div className="grid grid-cols-[60px_repeat(5,1fr)]">
        <div />
        {days.map((day) => (
          <div key={day} className="text-center text-xs font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="relative">
        {/* HORIZONTAL LINES */}
        <div className="grid grid-cols-[60px_repeat(5,1fr)]">
          {hours.map((hour) => (
            <Fragment key={hour}>
              <div className="text-xs text-right pr-2 pt-1 opacity-50">
                {hour > 12 ? `${hour - 12}PM` : `${hour}AM`}
              </div>
              {days.map((day, index) => (
                <div key={index} className="border border-border min-h-15" />
              ))}
            </Fragment>
          ))}
        </div>

        {/* CLASSES BLOCKS COLUMN */}
        <div className="absolute inset-0 grid grid-cols-[60px_repeat(5,1fr)]">
          <div />
          {days.map((day) => (
            <div key={day} className="relative">
              {/* CLASSES */}
              {selectedSchedule?.sections
                .map((section, sectionIndex) => ({
                  ...section,
                  colorIndex: sectionIndex,
                }))
                .filter((course) => course.days.includes(day))
                .map((classDay) => {
                  const color =
                    BLOCK_COLORS[classDay.colorIndex % BLOCK_COLORS.length];
                  return (
                    <div
                      style={{
                        position: "absolute",
                        top: `${getTopPosition(classDay.startTime)}px`,
                        height: `${getBlockHeight(classDay.startTime, classDay.endTime)}px`,
                        left: "2px",
                        right: "2px",
                        backgroundColor: color.bg,
                        borderLeft: `3px solid ${color.border}`,
                      }}
                      key={classDay?.courseCode}
                      className="rounded-md p-1 overflow-hidden"
                    >
                      <p
                        style={{color: color.text}}
                        className="text-xs font-semibold"
                      >
                        {classDay.courseCode}
                      </p>
                      <p
                        style={{color: color.text}}
                        className="text-[10px] opacity-70"
                      >
                        {classDay.instructor}
                      </p>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(":");
  return parseInt(hours) + parseInt(minutes) / 60;
}

function getTopPosition(startTime) {
  return (parseTime(startTime) - START_HOUR) * HOUR_HEIGHT;
}

function getBlockHeight(startTime, endTime) {
  return (parseTime(endTime) - parseTime(startTime)) * HOUR_HEIGHT;
}

export default CalendarGrid;
