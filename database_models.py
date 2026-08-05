from database import Base
from sqlalchemy import Column, String, Integer, Float, ForeignKey

class Endpoint(Base):
    __tablename__ = "Endpoint"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    url = Column(String)
    ping_interval = Column(Integer)

class PingResult(Base):
    __tablename__ = "PingResult"
    id = Column(Integer, primary_key=True)
    endpoint_id = Column(Integer, ForeignKey(Endpoint.id))
    status_code = Column(Integer)
    response_time = Column(Float)
    checked_at = Column(Float)