import {useState} from "react";
import {FiPlus, FiX} from "react-icons/fi";
import {useClassesList} from "../../hooks/useClassesList";

function CourseSelector({courses, setCourses, error, setError}) {
  let [input, setInput] = useState("");
  let [showSuggestions, setShowSuggestions] = useState(false);
  const {classes} = useClassesList();

  const query = input.toLowerCase();
  const classListSuggestion =
    input.length >= 3
      ? (classes ?? [])
          .filter((course) => course.code.toLowerCase().includes(query))
          .slice(0, 8)
      : [];

  function handleRemoveCourse(course) {
    setCourses((courseList) =>
      courseList.filter((courseName) => courseName !== course),
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formatted = normalize(input);

    if (!formatted) return;

    const courseExists = (classes ?? []).some(
      (course) => normalize(course.code) === formatted,
    );

    if (!courseExists) {
      setError(`Class not found: ${formatted}`);
      return;
    }

    if (courses.some((c) => normalize(c) === formatted)) {
      setError("Class already added");
      return;
    }

    setError("");
    setCourses((courses) => [...courses, formatted]);
    setInput("");
    setShowSuggestions(false);
  }

  function handleClickSuggestion(course) {
    if (courses.some((c) => normalize(c) === normalize(course))) {
      setError("Class already added");
      return;
    }
    setError("");
    setCourses((courses) => [...courses, course]);
    setInput("");
    setShowSuggestions(false);
  }

  const shouldShowDropdown = showSuggestions && input.length >= 3;

  return (
    <div className="mb-5 flex flex-col">
      <form className="p-0 lg:p-2" onSubmit={handleSubmit}>
        <p className="opacity-65 mb-2 lg:mb-5 text-[14px] font-semibold uppercase">
          Courses
        </p>
        <div className="relative">
          <input
            placeholder="Search for classes... (CS250)"
            className="h-10 pr-10 pl-3 placeholder:text-xs rounded-lg text-sm bg-surface placeholder:text-text-secondary-dark/70 w-full text-text-primary-dark border border-border/60"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
              setError("");
            }}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-primary hover:text-action-hover hover:bg-action-light-5 transition-colors cursor-pointer bg-action-light-3 rounded-lg p-0.5"
          >
            <FiPlus size={20} />
          </button>
        </div>
        {error && <p className="text-error text-xs mt-1 pl-1">{error}</p>}
      </form>
      {courses.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 lg:m-2">
          {courses.map((course) => (
            <div
              key={course}
              className="flex bg-action-light-1 p-1 rounded-md gap-2 h-fit"
            >
              <div className=" text-text-badge text-xs font-semibold">
                {course}
              </div>
              <button
                className="cursor-pointer text-action-light-7 hover:text-action-light-5"
                onClick={() => handleRemoveCourse(course)}
              >
                <FiX size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-1 mx-2 rounded-lg bg-surface shadow-md overflow-hidden">
        {shouldShowDropdown && (
          <div>
            {classListSuggestion.length > 0 ? (
              classListSuggestion.map((course) => (
                <div
                  className="px-3 py-2 text-sm text-text-primary-dark hover:bg-action-light-1 cursor-pointer transition-colors"
                  key={course.id}
                  onClick={() => handleClickSuggestion(course.code)}
                >
                  {course.code}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-text-secondary-dark">
                No classes found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseSelector;

const normalize = (str) => str.trim().toUpperCase().replace(/\s+/g, "");
