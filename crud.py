from database_models import Endpoint, PingResult
from database import SessionLocal
from sqlalchemy.orm import Session
from models import EndpointInput, EndpointResponse, PingResultResponse
from fastapi import HTTPException, APIRouter
from datetime import datetime

def get_endpoint(db : Session, id : int):
    db_endpoint_response = db.query(Endpoint).filter(Endpoint.id == id).first()
    if db_endpoint_response is None:
        raise HTTPException(status_code=404, detail="Id not found")
    return db_endpoint_response

def get_all_endpoints(db : Session):
    db_endpoints = db.query(Endpoint).all()
    return db_endpoints

def create_endpoint(db : Session, endpointInput : EndpointInput):
    new_endpoint = Endpoint(name = endpointInput.name, url = endpointInput.url, ping_interval = endpointInput.ping_interval)
    db.add(new_endpoint)
    db.commit()
    db.refresh(new_endpoint)
    return new_endpoint

def update_endpoint(db : Session, endpointInput : EndpointInput, id : int):
    db_endpoint = db.query(Endpoint).filter(Endpoint.id == id).first()
    if db_endpoint is None:
        raise HTTPException(status_code=404, detail="Endpoint not found")
    db_endpoint.name = endpointInput.name
    db_endpoint.url = endpointInput.url
    db_endpoint.ping_interval = endpointInput.ping_interval
    db.add(db_endpoint)
    db.commit()
    db.refresh(db_endpoint)
    return db_endpoint

def delete_endpoint(db : Session, endpoint_id : int):
    db_endpoint = db.query(Endpoint).filter(Endpoint.id == endpoint_id).first()
    if db_endpoint is None:
        raise HTTPException(status_code=404, detail="Endpoint not found")
    db.delete(db_endpoint)
    db.commit()
    return {"status_code" : 204, "detail" : "No Content"}

def create_ping_result(db: Session, id: int, status_code: int, response_time: float, checked_at: datetime):
    db_ping_result = PingResult(endpoint_id = id, status_code = status_code, response_time = response_time, checked_at = checked_at)
    db.add(db_ping_result)
    db.commit()
    db.refresh(db_ping_result)
    return db_ping_result

def get_pings_of_endpoint(db : Session, endpoint_id : int):
    db_ping_result =  db.query(PingResult).filter(PingResult.endpoint_id == endpoint_id).order_by(PingResult.checked_at).all()
    return db_ping_result

def get_all_pings(db : Session):
    db_pings_result = db.query(PingResult).all()
    return db_pings_result