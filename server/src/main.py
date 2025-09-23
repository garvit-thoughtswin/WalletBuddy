from fastapi import FastAPI
from src.db.session import Base,engine
from src.api import users

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router,prefix="/users",tags=["Users"])

@app.get("/")
async def root():
    return {"Message":"Heyyy!! Garvit"}