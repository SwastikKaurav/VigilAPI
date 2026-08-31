from fastapi import FastAPI
from routers import endpoints

app = FastAPI()

app.include_router(endpoints.router)