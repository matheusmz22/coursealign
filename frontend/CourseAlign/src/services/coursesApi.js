const BASE_URL = "http://127.0.0.1:8000";

export async function getCourses() {
  const res = await fetch(`${BASE_URL}/courses/`);

  if (!res.ok) throw new Error("Failed to fetch courses");

  const data = await res.json();

  return data.map((course, index) => ({
    id: index + 1,
    code: course.courseId,
    name: course.name,
  }));
}
