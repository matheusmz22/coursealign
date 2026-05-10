const BASE_URL = "https://coursealign-backend.onrender.com";

export async function postGenerateSchedule(body) {
  const res = await fetch(`${BASE_URL}/generate-schedule/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to generate schedule");
  }

  const data = await res.json();

  return data.map((schedule) => ({
    id: schedule.scheduleId,
    sections: schedule.sections.map((section) => ({
      courseCode: section.course,
      courseName: section.course,
      instructor: `Section ${section.section}`,
      room: "",
      days: section.days.map(normalizeDay),
      startTime: section.startTime,
      endTime: section.endTime,
    })),
  }));
}

function normalizeDay(day) {
  const map = {
    M: "MON",
    T: "TUE",
    W: "WED",
    Th: "THU",
    F: "FRI",
  };

  return map[day] ?? day;
}
