# CourseAlign — SDSU Schedule Builder

> A full-stack web application that helps San Diego State University students generate and visualize conflict-free class schedules based on their course preferences and time constraints.

**Live Demo:** [coursealign.vercel.app](https://coursealign.vercel.app)

---

## Overview

CourseAlign was born from a real problem: SDSU's existing class search experience makes it frustrating to plan a semester without conflicts. Students have to manually cross-reference course times, sections, and availability — a tedious process with no visual feedback.

This project solves that. Students select the courses they want, set their preferred time window, and CourseAlign generates every possible conflict-free schedule combination and displays them in a clean, interactive weekly calendar view.

---

## Project Background

This was a college project built in two phases across two different groups.

**Phase 1 — Original Group:** Built the core C++ scheduling algorithm and compiled the dataset — a CSV file containing real Spring 2026 SDSU course sections with days, times, instructors, and room data.

**Phase 2 — Our Group:** Took the C++ algorithm and turned it into a deployable, production-ready full-stack application. My group was responsible for wrapping the algorithm into a REST API and building the entire frontend experience.

---

## My Role — Frontend Engineer

I was solely responsible for the entire frontend of this project, from architecture decisions to final deployment. This included:

- Designing the full UI/UX from scratch, including wireframes and a design system
- Building every React component
- Integrating with the backend REST API
- Debugging cross-origin and deployment issues
- Deploying the application to Vercel

---

## What I Built

### Design System
Before writing a single component, I designed a complete design system inspired by SDSU's brand identity:
- Custom color palette with CSS variables (`@theme` with Tailwind CSS v4)
- SDSU red (`#a6192e`) as the primary brand color
- Dark sidebar aesthetic (`#30302c`) for a professional, tool-like feel
- Typography using Poppins for a clean, modern look

### Application Layout
- Two-panel layout: fixed sidebar (260px) + full-width calendar area
- CSS Grid-based structure with `h-screen` for perfect viewport fit
- Independent scroll areas for sidebar and calendar

### Course Selector
- Input with real-time normalization (`"cs 250"` → `"CS250"`)
- Duplicate detection using normalized comparison
- Removable course tags with visual feedback
- Error states for invalid or already-added courses

### Time Preferences
- Dual select dropdowns for earliest start and latest end time
- 15 time options from 8:00 AM to 10:00 PM
- Values stored in `HH:MM` format to match backend schema

### Schedule Generator
- Generate button with loading spinner state (custom CSS animation)
- Full error handling — surfaces real API error messages instead of generic failures
- Validation before API call (empty course list check)
- Auto-selects first result after generation

### Schedule Results List
- Dynamic list rendering from API response
- Pagination (8 per page) to handle large result sets (tested with 150+ schedules)
- Active schedule highlighted with red border
- Warning when API couldn't fit all courses within time preferences
- Shows which specific courses were missing from results
- Auto-clears results when course list changes

### Weekly Calendar View
- CSS Grid-based weekly calendar (Mon–Fri, 8AM–10PM)
- Two-layer rendering: background grid lines + absolute-positioned class blocks
- Precise time-based positioning using pixel math:
  - `top = (startHour - 8) * 60px`
  - `height = (endHour - startHour) * 60px`
- 6 distinct color themes per course for visual clarity
- Shows course code and instructor name on each block
- Day normalization (`"M"` → `"MON"`, `"Th"` → `"THU"`, etc.)
- Custom styled scrollbar

### API Integration
- `@tanstack/react-query` for async state management with `useMutation`
- Mock data layer for development before backend was ready
- Full error propagation from API to UI
- CORS debugging and resolution across local and deployed environments

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + Vite 5 | Frontend framework and build tool |
| Tailwind CSS v4 | Utility-first styling with custom design tokens |
| TanStack Query (React Query) | Async state management and API calls |
| react-icons | Icon library (Feather + Hero icons) |
| Vercel | Frontend deployment and hosting |

---

## Backend (Built by teammates)

| Technology | Purpose |
|---|---|
| Python + FastAPI | REST API layer |
| C++ Scheduler | Core algorithm for generating conflict-free schedules |
| CSV Dataset | Real Spring 2026 SDSU course section data |
| Render | Backend deployment |

**API Endpoints:**
- `GET /courses` — returns available courses
- `POST /generate-schedule` — accepts course list + time preferences, returns all valid schedule combinations

---

## Architecture

```
Frontend (React/Vite)          Backend (FastAPI/Python)
─────────────────────          ────────────────────────
App.jsx                        main.py
  ├── AppLayout                  ├── /courses
  │     ├── Sidebar              └── /generate-schedule
  │     │     ├── CourseSelector           │
  │     │     ├── TimeFilters              ▼
  │     │     └── ScheduleResults    cpp_bridge.py
  │     └── CalendarView               │
  │           ├── CalendarHeader        ▼
  │           └── CalendarGrid      C++ Scheduler
  │                                      │
hooks/                                   ▼
  └── useGenerateSchedule         CSV Dataset
                                  (SDSU Spring 2026)
services/
  └── scheduleApi.js
```

---

## Key Engineering Challenges

**Calendar Block Positioning**
The trickiest part was placing class blocks at precise vertical positions in the calendar grid. Each column uses `position: relative` and blocks use `position: absolute` with `top` and `height` calculated in pixels from time strings:

```js
const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(":")
  return parseInt(hours) + parseInt(minutes) / 60
}

const top = (parseTime(startTime) - START_HOUR) * HOUR_HEIGHT
const height = (parseTime(endTime) - parseTime(startTime)) * HOUR_HEIGHT
```

**Cross-Platform Executable Issue**
The C++ binary was compiled on Windows/macOS but the backend runs on Linux (Render). This caused `[Errno 8] Exec format error` on every API call. I diagnosed this by modifying the error handler to surface the real exception, identified the root cause, and coordinated with the backend team to recompile the binary for Linux.

**CORS Across Environments**
Navigated CORS configuration across three environments: local dev (`localhost:5173`), deployed backend (`onrender.com`), and deployed frontend (`vercel.app`). Each transition required coordination with the backend team to update allowed origins.

**Input Normalization**
Course codes needed to be consistent regardless of how users typed them — `"cs 250"`, `"CS 250"`, `"CS250"` all needed to map to the same identifier. Implemented a `normalize` function that strips whitespace and uppercases before comparison, while storing the formatted version for display.

---

## Local Development

```bash
# clone the repo
git clone https://github.com/jan9601/CS-250-CourseAlign.git
cd CS-250-CourseAlign/frontend/CourseAlign

# install dependencies
npm install

# run dev server
npm run dev
```

---

## Screenshots

> Weekly calendar view with color-coded course blocks
<img width="1443" height="942" alt="image" src="https://github.com/user-attachments/assets/7cd40a1b-4921-4e94-8d05-ecd4f04444c6" />


> Sidebar with course selector, time filters, and schedule results
<img width="476" height="947" alt="image" src="https://github.com/user-attachments/assets/33ed93f3-6ef2-475a-b65c-6eba28077137" />


---

## What I Learned

This project pushed me to think beyond just writing components. Diagnosing the cross-platform binary issue, managing git history across a forked repo and Vercel deployment, and coordinating API contracts with a backend team all gave me real-world engineering experience that goes well beyond typical coursework.

The calendar rendering was particularly satisfying — building a pixel-precise time grid from scratch without any calendar library forced me to deeply understand CSS positioning and time arithmetic.

---

*Built as part of CS 250 at San Diego State University, Spring 2026.*
