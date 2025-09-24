from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine,async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from src.core.config import settings

database_url = settings.DATABASE_URL
engine = create_async_engine(database_url,echo=True)

AsyncSessionLocal = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session