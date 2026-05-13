import {useQuery} from "@tanstack/react-query";
import {getCourses} from "../services/coursesApi";

export function useClassesList() {
  const {data: classes} = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  return {classes};
}
