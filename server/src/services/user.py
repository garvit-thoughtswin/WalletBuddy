from src.models.user import User
from sqlalchemy.future import select
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

class UserService:
    def __init__(self,db:AsyncSession):
        self.db = db

    async def create_user(self,payload):
        user = User(name=payload.name,email=payload.email,password=payload.password)
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user
    
    async def login_user(self,payload):
        user = await self.db.execute(
            select(User).where(User.email == payload.email)
        )
        user = user.scalars().first()

        if not user:
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Credentials"
            )
        if(user.password != payload.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Credentials"
            )
        return user