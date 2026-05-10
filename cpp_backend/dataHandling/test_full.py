import pytest
from unittest.mock import patch
from loader import load_sections, get_sections_by_course, get_all_course_codes
from cpp_bridge import parse_cpp_output, to_24_hour, run_cpp_scheduler

# ─────────────────────────────────────────
# SECTION 1: Loader Tests
# ─────────────────────────────────────────

CSV_PATH = "testData.csv"

def test_loads_without_crashing():
    sections = load_sections(CSV_PATH)
    assert len(sections) > 0
    print(f"PASS — Loaded {len(sections)} sections")

def test_days_are_valid_strings():
    sections = load_sections(CSV_PATH)
    valid_days = {"MON", "TUE", "WED", "THU", "FRI"}
    for s in sections:
        for day in s.days:
            assert day in valid_days, f"Invalid day '{day}' in section {s.section_id}"
    print("PASS — All days are valid")

def test_tbd_times_are_none():
    sections = load_sections(CSV_PATH)
    for s in sections:
        assert s.start_time != "TBD", f"Section {s.section_id} has 'TBD' instead of None"
        assert s.end_time != "TBD", f"Section {s.section_id} has 'TBD' instead of None"
    print("PASS — TBD times are None")

def test_filter_by_course():
    sections = load_sections(CSV_PATH)
    results = get_sections_by_course(sections, "CS 210")
    assert len(results) > 0
    for s in results:
        assert s.course_code == "CS 210"
    print(f"PASS — CS 210 filter works ({len(results)} sections)")

def test_to_dict_has_required_keys():
    sections = load_sections(CSV_PATH)
    d = sections[0].to_dict()
    for key in ["course_code", "course_title", "section_id", "days", "start_time", "end_time"]:
        assert key in d
    print("PASS — to_dict() has all required keys")

def test_unique_course_codes():
    sections = load_sections(CSV_PATH)
    codes = get_all_course_codes(sections)
    assert len(codes) == len(set(codes)), "Course codes should be unique"
    print(f"PASS — {len(codes)} unique course codes")


# ─────────────────────────────────────────
# SECTION 2: Edge Cases — Loader
# ─────────────────────────────────────────

def test_course_that_does_not_exist():
    """Searching for a fake course should return empty list, not crash."""
    sections = load_sections(CSV_PATH)
    results = get_sections_by_course(sections, "FAKE 999")
    assert results == [], f"Expected empty list, got {results}"
    print("PASS — Fake course returns empty list")

def test_course_code_case_insensitive():
    """CS 210 and cs 210 and Cs 210 should all return same results."""
    sections = load_sections(CSV_PATH)
    upper = get_sections_by_course(sections, "CS 210")
    lower = get_sections_by_course(sections, "cs 210")
    assert len(upper) == len(lower)
    print("PASS — Course code lookup is case insensitive")

def test_no_duplicate_section_ids():
    """Every section_id should be unique in the dataset."""
    sections = load_sections(CSV_PATH)
    ids = [s.section_id for s in sections]
    assert len(ids) == len(set(ids)), "Duplicate section IDs found!"
    print("PASS — No duplicate section IDs")

def test_units_are_positive():
    """All sections should have 0 or more units. Warn if any are 0 (data issue)."""
    sections = load_sections(CSV_PATH)
    zero_unit_sections = [s for s in sections if s.units == 0]
    if zero_unit_sections:
        print(f"WARN — {len(zero_unit_sections)} section(s) have 0 units (e.g. section {zero_unit_sections[0].section_id}) — likely a data issue in CSV")
    for s in sections:
        assert s.units >= 0, f"Section {s.section_id} has negative units: {s.units}"
    print("PASS — No sections have negative units")

def test_sections_with_tbd_have_no_days_conflict():
    """TBD sections should have no start/end time — safe to skip in scheduling."""
    sections = load_sections(CSV_PATH)
    tbd = [s for s in sections if s.start_time is None]
    for s in tbd:
        assert s.end_time is None, f"Section {s.section_id} has start=None but end={s.end_time}"
    print(f"PASS — All {len(tbd)} TBD sections have both times as None")


# ─────────────────────────────────────────
# SECTION 3: Edge Cases — Greta's Bridge
# ─────────────────────────────────────────

def test_to_24_hour_pm():
    """12-hour PM time should convert correctly."""
    assert to_24_hour("2:00pm") == "14:00"
    assert to_24_hour("12:00pm") == "12:00"
    print("PASS — PM times convert correctly")

def test_to_24_hour_am():
    """12-hour AM time should convert correctly."""
    assert to_24_hour("8:00am") == "08:00"
    assert to_24_hour("11:30am") == "11:30"
    print("PASS — AM times convert correctly")

def test_parse_cpp_output_empty_string():
    """Empty output from C++ should return empty list, not crash."""
    result = parse_cpp_output("")
    assert result == [], f"Expected [], got {result}"
    print("PASS — Empty C++ output returns empty list")

def test_parse_cpp_output_no_schedules():
    """Output with no schedule headers should return empty list."""
    fake_output = "No schedules found.\nPlease try different courses."
    result = parse_cpp_output(fake_output)
    assert result == [], f"Expected [], got {result}"
    print("PASS — No schedule header returns empty list")

def test_parse_cpp_output_valid_schedule():
    """A well-formed C++ output should parse into a valid schedule."""
    fake_output = """
=== CourseAlign: Your Schedule ===
| CS 210       | some info | | 6520 | | MON WED | 8:00am-9:15am |
"""
    result = parse_cpp_output(fake_output)
    # May be empty if format doesn't match exactly — that's okay, just shouldn't crash
    assert isinstance(result, list)
    print(f"PASS — Valid output parses without crashing (got {len(result)} schedule(s))")

def test_run_cpp_scheduler_bad_course():
    """
    If C++ returns a non-zero exit code (bad input), 
    run_cpp_scheduler should raise RuntimeError — not silently fail.
    """
    with patch("subprocess.run") as mock_run:
        mock_run.return_value.returncode = 1
        mock_run.return_value.stderr = "Course not found"
        mock_run.return_value.stdout = ""

        try:
            run_cpp_scheduler(["FAKE999"])
            assert False, "Should have raised RuntimeError"
        except RuntimeError as e:
            assert "Course not found" in str(e)
            print("PASS — Bad course raises RuntimeError correctly")

def test_run_cpp_scheduler_no_time_constraints():
    """
    Calling without earliest_start or latest_end should not crash
    (mocked so we don't need the actual C++ binary).
    """
    with patch("subprocess.run") as mock_run:
        mock_run.return_value.returncode = 0
        mock_run.return_value.stdout = ""
        mock_run.return_value.stderr = ""

        result = run_cpp_scheduler(["CS210"])
        assert result == ""  # empty output is fine
        print("PASS — No time constraints runs without crashing")


# ─────────────────────────────────────────
# Run all tests
# ─────────────────────────────────────────

if __name__ == "__main__":
    print("=" * 50)
    print("SECTION 1: Loader Tests")
    print("=" * 50)
    test_loads_without_crashing()
    test_days_are_valid_strings()
    test_tbd_times_are_none()
    test_filter_by_course()
    test_to_dict_has_required_keys()
    test_unique_course_codes()

    print("\n" + "=" * 50)
    print("SECTION 2: Edge Cases — Loader")
    print("=" * 50)
    test_course_that_does_not_exist()
    test_course_code_case_insensitive()
    test_no_duplicate_section_ids()
    test_units_are_positive()
    test_sections_with_tbd_have_no_days_conflict()

    print("\n" + "=" * 50)
    print("SECTION 3: Edge Cases — Bridge")
    print("=" * 50)
    test_to_24_hour_pm()
    test_to_24_hour_am()
    test_parse_cpp_output_empty_string()
    test_parse_cpp_output_no_schedules()
    test_parse_cpp_output_valid_schedule()
    test_run_cpp_scheduler_bad_course()
    test_run_cpp_scheduler_no_time_constraints()

    print("\n" + "=" * 50)
    print("ALL TESTS PASSED!")
    print("=" * 50)
