# CourseAlign — Frontend

React-based frontend for the CourseAlign SDSU Schedule Builder. Connects to the FastAPI backend to generate and visualize conflict-free class schedules.

**Live:** [coursealign.vercel.app](https://coursealign.vercel.app)

---

## Tech Stack

- **React 19** + **Vite 5**
- **Tailwind CSS v4** with custom design tokens
- **TanStack Query (React Query)** — async state and API calls
- **react-icons** — Feather + Hero icon sets

---

## Project Structure

```
src/
├── components/
│   ├── layout/          # AppLayout, Sidebar
│   └── ui/              # Pagination (reusable primitives)
├── features/
│   ├── courses/         # CourseSelector
│   ├── filters/         # TimeFilters
│   └── schedule/        # ScheduleResults
├── hooks/
│   └── useGenerateSchedule.js
├── mock/
│   ├── courses.js
│   └── schedules.js
├── services/
│   ├── coursesApi.js
│   └── scheduleApi.js
└── calendar/
    ├── CalendarView.jsx
    ├── CalendarHeader.jsx
    └── CalendarGrid.jsx
```

---

## Getting Started

```bash
cd frontend/CourseAlign
npm install
npm run dev
```

Runs on `http://localhost:5173`.

---

## API Integration

The frontend connects to the backend at:

```
https://coursealign-backend.onrender.com
```

To switch to a different backend URL, update `BASE_URL` in both:
- `src/services/coursesApi.js`
- `src/services/scheduleApi.js`

**Endpoints used:**
- `POST /generate-schedule/` — body: `{ classes, earliestStart, latestEnd }`

---

## Mock Data

During development, mock data is available in `src/mock/`:
- `courses.js` — list of available courses
- `schedules.js` — sample schedule response

To use mock data instead of the real API, swap `postGenerateSchedule` in `useGenerateSchedule.js` with a function that returns the mock with a simulated delay.

---

## Key Implementation Notes

**Calendar block positioning** uses pixel math based on a 60px/hour scale:

```js
const top = (parseTime(startTime) - START_HOUR) * HOUR_HEIGHT
const height = (parseTime(endTime) - parseTime(startTime)) * HOUR_HEIGHT
```

**Day normalization** maps backend day codes to calendar columns:

```js
const map = { M: "MON", T: "TUE", W: "WED", Th: "THU", F: "FRI" }
```

**Course input normalization** strips spaces and uppercases before sending to API:

```js
const normalize = (str) => str.trim().toUpperCase().replace(/\s+/g, "")
```

---

## Environment

No environment variables required. The `BASE_URL` is hardcoded in the service files.
