from src.models.category import Category
from src.models.user import User
from sqlalchemy.future import select
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

DEFAULT_CATEGORIES = ["Food", "Travel", "Shopping", "Bills"]

class UserService:
    def __init__(self,db:AsyncSession):
        self.db = db

    async def create_user(self,payload):
        user = User(name=payload.name,email=payload.email,password=payload.password)
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        for cat_name in DEFAULT_CATEGORIES:
            category = Category(name=cat_name, user_id=user.id)
            self.db.add(category)
        await self.db.commit()
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