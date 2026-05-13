import {useQuery} from "@tanstack/react-query";
import {getCourses} from "../services/coursesApi";

export function useClassesList() {
  const {
    data: classes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  return {classes, isLoading, error, refetch};
}
