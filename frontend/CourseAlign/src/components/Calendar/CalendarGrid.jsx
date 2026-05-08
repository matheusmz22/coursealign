import {Fragment} from "react";

const HOUR_HEIGHT = 60;
const START_HOUR = 8;
const days = ["MON", "TUE", "WED", "THU", "FRI"];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
function CalendarGrid({selectedSchedule}) {
  console.log(selectedSchedule);
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
