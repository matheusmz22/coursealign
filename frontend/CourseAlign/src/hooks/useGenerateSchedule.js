import {useMutation} from "@tanstack/react-query";
import {postGenerateSchedule} from "../services/scheduleApi";

export function useGenerateSchedule({setSchedules, setSelectedSchedule}) {
  const {mutate: generateSchedule, isPending: isGenerating} = useMutation({
    mutationFn: postGenerateSchedule,
    onSuccess: (data) => {
      setSchedules(data);
      setSelectedSchedule(data[0]);
    },
    onError: (err) => console.error(err),
  });

  return {isGenerating, generateSchedule};
}
