from fastapi import FastAPI
from backend.models import model
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get('/buildings')
async def get_buildings():
    return model.select_buildings()


@app.get('/chart')
async def get_chart_data():
    return model.select_chart_data()
