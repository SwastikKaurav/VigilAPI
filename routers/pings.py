from fastapi import APIRouter, Depends
from database_models import PingResult
from crud import get_pings_of_endpoint, get_all_pings
from sqlalchemy.orm import Session
from database import get_db
from models import PingResultResponse

router = APIRouter(prefix="/endpoints", tags=["pings"])

@router.get("/{endpoint_id}/pings", response_model=list[PingResultResponse])
def get_all_the_ping_results(endpoint_id : int, db : Session = Depends(get_db)):
    return get_pings_of_endpoint(db, endpoint_id)

@router.get("/stats", response_model=list[PingResultResponse])
def get_all_pings_endpoints(db : Session = Depends(get_db)):
    return get_all_pings(db)
