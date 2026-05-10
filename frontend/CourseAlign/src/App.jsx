import {useEffect, useState} from "react";
import AppLayout from "./components/layout/AppLayout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, - 1 min
      staleTime: 0,
    },
  },
});

function App() {
  const [courses, setCourses] = useState([]);
  const [earliestStart, setEarliestStart] = useState("08:00");
  const [latestEnd, setLatestEnd] = useState("22:00");
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    if (courses.length === 0) {
      setSchedules([]);
      setSelectedSchedule(null);
    }
  }, [courses]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout
        cpLayout
        courses={courses}
        setCourses={setCourses}
        earliestStart={earliestStart}
        setEarliestStart={setEarliestStart}
        latestEnd={latestEnd}
        setLatestEnd={setLatestEnd}
        schedules={schedules}
        setSchedules={setSchedules}
        selectedSchedule={selectedSchedule}
        setSelectedSchedule={setSelectedSchedule}
      />
    </QueryClientProvider>
  );
}

export default App;
