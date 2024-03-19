from fastapi import FastAPI
from routes.path import router
app=FastAPI()
app.include_router(router)