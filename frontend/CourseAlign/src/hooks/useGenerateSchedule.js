import {useMutation} from "@tanstack/react-query";
import {postGenerateSchedule} from "../services/scheduleApi";

export function useGenerateSchedule({setSchedules, setSelectedSchedule}) {
  const {
    mutate: generateSchedule,
    isPending: isGenerating,
    error,
    reset,
  } = useMutation({
    mutationFn: postGenerateSchedule,
    onSuccess: (data) => {
      setSchedules(data);
      setSelectedSchedule(data[0] ?? null);
    },
    onError: (err) => console.error(err),
  });

  return {isGenerating, generateSchedule, error, reset};
}
