import {mockSchedules} from "../services/schedules";

export async function postGenerateSchedule(body) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSchedules);
    }, 1000);
  });
}
