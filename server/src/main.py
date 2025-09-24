from fastapi import FastAPI
import asyncio
from src.db.session import Base,engine
from src.api import users

async def init_models():
    async with engine.begin() as conn:
        # Run sync create_all in async engine
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(init_models())

app = FastAPI()

app.include_router(users.router,prefix="/users",tags=["Users"])

@app.get("/")
async def root():
    return {"Message":"Heyyy!! Garvit"}