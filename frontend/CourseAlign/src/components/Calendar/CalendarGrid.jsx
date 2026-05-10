import {Fragment} from "react";

const HOUR_HEIGHT = 60;
const START_HOUR = 8;
const days = ["MON", "TUE", "WED", "THU", "FRI"];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

const BLOCK_COLORS = [
  {bg: "#fbc8cc", border: "#a6192e", text: "#7a1020"}, // vermelho
  {bg: "#fad4c0", border: "#b45309", text: "#7c2d12"}, // laranja
  {bg: "#f5e0a8", border: "#a16207", text: "#713f12"}, // amarelo
  {bg: "#dfc4f5", border: "#9333ea", text: "#6b21a8"}, // roxo
  {bg: "#bfe3f5", border: "#0369a1", text: "#0c4a6e"}, // azul
  {bg: "#bbf0d6", border: "#059669", text: "#064e3b"}, // verde
];

function CalendarGrid({selectedSchedule}) {
  return (
    <div className="min-w-[760px] lg:mt-5 text-text-muted sm:min-w-[900px] lg:min-w-0">
      {/* DAYS HEADER */}
      <div className="sticky top-0 z-20 grid grid-cols-[50px_repeat(5,minmax(130px,1fr))] bg-bg-app lg:grid-cols-[60px_repeat(5,1fr)]">
        <div />
        {days.map((day) => (
          <div key={day} className="py-2 text-center text-xs font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="relative">
        {/* HORIZONTAL LINES */}
        <div className="grid grid-cols-[50px_repeat(5,minmax(130px,1fr))] lg:grid-cols-[60px_repeat(5,1fr)]">
          {hours.map((hour) => (
            <Fragment key={hour}>
              <div className="pr-2 pt-1 text-right text-xs opacity-50">
                {hour > 12 ? `${hour - 12}PM` : `${hour}AM`}
              </div>

              {days.map((day) => (
                <div key={day} className="min-h-15 border border-border" />
              ))}
            </Fragment>
          ))}
        </div>

        {/* CLASS BLOCKS */}
        <div className="absolute inset-0 grid grid-cols-[50px_repeat(5,minmax(130px,1fr))] lg:grid-cols-[60px_repeat(5,1fr)]">
          <div />

          {days.map((day) => (
            <div key={day} className="relative">
              {selectedSchedule?.sections
                ?.map((section, sectionIndex) => ({
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
                        height: `${getBlockHeight(
                          classDay.startTime,
                          classDay.endTime,
                        )}px`,
                        left: "3px",
                        right: "3px",
                        backgroundColor: color.bg,
                        borderLeft: `3px solid ${color.border}`,
                      }}
                      key={`${classDay.courseCode}-${day}-${classDay.startTime}`}
                      className="overflow-hidden rounded-md p-1 shadow-sm"
                    >
                      <p
                        style={{color: color.text}}
                        className="truncate text-xs font-semibold"
                      >
                        {classDay.courseCode}
                      </p>

                      <p
                        style={{color: color.text}}
                        className="truncate text-[10px] opacity-70"
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
