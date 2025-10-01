from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from src.api import categories
from src.api import expenses
from src.db.session import Base,engine
from src.api import users

async def init_models():
    async with engine.begin() as conn:
        # Run sync create_all in async engine
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(init_models())

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router,prefix="/users",tags=["Users"])
app.include_router(expenses.router,prefix="/expenses",tags=["Expenses"])
app.include_router(categories.router,prefix="/categories",tags=["Categories"])

@app.get("/")
async def root():
    return {"Message":"Heyyy!! Garvit"}