from sqlalchemy import asc
from src.models.category import Category
from src.models.user import User
from src.models.expense import Expense
from sqlalchemy.future import select
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

class ExpenseService:
    def __init__(self,db:AsyncSession):
        self.db = db

    async def create_expense(self,payload,current_user:User):
        expense = Expense(title=payload.title,amount=payload.amount,date=payload.date,category_id=payload.category_id,user_id=current_user.id)
        self.db.add(expense)
        await self.db.commit()
        await self.db.refresh(expense)
        result = await self.db.execute(
            select(Category).where(Category.id == expense.category_id)
    )
        category = result.scalar_one()
        expense.category_name = category.name
        return expense
    
    async def get_expenses_by_user(self,user_id:int):
        result = await self.db.execute(select(Expense).where(Expense.user_id == user_id).order_by(asc(Expense.date)))
        expenses = result.scalars().all()
        for expense in expenses:
            cat_result = await self.db.execute(
            select(Category).where(Category.id == expense.category_id)
        )
            category = cat_result.scalar_one()
            expense.category_name = category.name
        return expenses
    
    async def delete_expense(self,expense_id:int,current_user:User):
        result = await self.db.execute(select(Expense).where(Expense.id == expense_id, Expense.user_id == current_user.id))
        expense = result.scalars().first()
        if not expense:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
        await self.db.delete(expense)
        await self.db.commit()

    async def update_expense(self,expense_id:int,payload,current_user:User):
        result = await self.db.execute(select(Expense).where(Expense.id == expense_id, Expense.user_id == current_user.id))
        expense = result.scalars().first()
        if not expense:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
        expense.title = payload.title
        expense.amount = payload.amount
        expense.date = payload.date
        expense.category_id = payload.category_id
        expense.category_name = (await self.db.execute(select(Category).where(Category.id == payload.category_id))).scalar_one().name
        self.db.add(expense)
        await self.db.commit()
        await self.db.refresh(expense)
        return expense