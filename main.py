from fastapi import FastAPI, Depends
from crud import get_endpoint, get_all_endpoints, create_endpoint, update_endpoint, delete_endpoint, create_ping_result
from database import get_db
from sqlalchemy.orm import Session
from models import EndpointResponse, PingResultResponse

app = FastAPI()

@app.get("/", response_model = EndpointResponse)
def get_endpoints(db : Session = Depends(get_db)):
    return get_all_endpoints(db)

@app.get("/{endpoint_id}", response_model = EndpointResponse)
def get_endpoint(endpoint_id : int, db : Session = Depends(get_db)):
    return get_endpoint(db, endpoint_id)

