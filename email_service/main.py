import uvicorn

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from config import EMAIL_APP_PORT, EMAIL_APP_HOST
from app.home import controller as home
from app.auth import controller as auth

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(home.router)
app.include_router(auth.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host=EMAIL_APP_HOST, port=EMAIL_APP_PORT, reload=True)
