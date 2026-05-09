from fastapi import APIRouter, HTTPException

from ..schemas import ScheduleBuildRequest, ScheduleOut
from ..services.cpp_bridge import run_cpp_scheduler, parse_cpp_output

router = APIRouter(prefix="/generate-schedule", tags=["schedule"])


@router.post("/", response_model=list[ScheduleOut])
def build_schedule(req: ScheduleBuildRequest):
    try:
        output = run_cpp_scheduler(
            classes=req.classes,
            earliest_start=req.earliestStart,
            latest_end=req.latestEnd,
        )

        schedules = parse_cpp_output(output)

        if not schedules:
            return []

        return schedules

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid request")