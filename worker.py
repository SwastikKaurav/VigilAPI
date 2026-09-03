import asyncio
import requests
from fastapi import APIRouter
import datetime
from database import get_db
from sqlalchemy.orm import Session, sessionmaker
from crud import get_all_endpoints

SessionLocal = sessionmaker()

router =    APIRouter()

async def ping_all_endpoints_infinitely():
    while True:
        endpoints = get_all_endpoints()
        for endpoint in endpoints:
            response = requests.get("url")
            status_code = response.status_code
            response_time = response.elapsed.total_seconds()
            checked_at = datetime.now()
        await asyncio.sleep(300)

@router.on_event("/startup")
async def start_worker():
    asyncio.create_task(ping_all_endpoints_infinitely())
