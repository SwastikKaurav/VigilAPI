from pydantic import BaseModel
from datetime import datetime

class EndpointInput(BaseModel):
    name:str
    url:str

class EndpointResponse(BaseModel):
    model_config = {"from_attributes", True}
    id:int
    name:str
    url:str
    ping_interval:int

class PingResultResponse(BaseModel):
    model_config = {"from_attributes", True}
    id:int
    endpoint_id:int
    status_code:int
    response_time:float
    checked_at:datetime
