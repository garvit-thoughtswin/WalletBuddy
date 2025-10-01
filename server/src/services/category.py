from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.models.category import Category

class CategoryService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_category(self, user_id: int, name: str):
        category = Category(name=name, user_id=user_id)
        self.db.add(category)
        await self.db.commit()
        await self.db.refresh(category)
        return category

    async def get_categories(self, user_id: int):
        result = await self.db.execute(select(Category).where(Category.user_id == user_id))
        return result.scalars().all()
