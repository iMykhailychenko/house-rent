import uvicorn

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.home import controller as home
from app.auth import controller as auth

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(home.router)
app.include_router(auth.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
