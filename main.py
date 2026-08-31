from fastapi import FastAPI, Depends
from crud import get_endpoint, get_all_endpoints, create_endpoint, update_endpoint, delete_endpoint, create_ping_result
from database import get_db
from sqlalchemy.orm import Session
from models import EndpointInput, EndpointResponse, PingResultResponse
from database_models import Endpoint, PingResult

app = FastAPI()

@app.get("/endpoint", response_model = EndpointResponse)
def getAllEndpoint(db : Session = Depends(get_db)):
    return get_all_endpoints(db)

@app.get("/endpoint/{endpoint_id}", response_model = EndpointResponse)
def getEndpoint(endpoint_id : int, db : Session = Depends(get_db)):
    return get_endpoint(db, endpoint_id)

@app.post("/endpoint/create", response_model = EndpointResponse)
def createEndpoint(endpoint_input : EndpointInput, db : Session = Depends(get_db)):
    return create_endpoint(endpoint_input, db)

@app.put("/endpoint/update/{endpoint_id}", response_model = EndpointResponse)
def updateEndpoint(endpoint_input : EndpointInput, endpoint_id : int ,db : Session = Depends(get_db)):
    return update_endpoint(db, endpoint_input, endpoint_id)

@app.delete("/endpoint/delete/{endpoint_id}")
def deleteEndpoint(endpoint_id : int, db : Session = Depends(get_db)):
    return delete_endpoint(db, endpoint_id)