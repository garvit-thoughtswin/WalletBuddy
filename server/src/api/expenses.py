# src/api/expenses.py
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.services.expense import ExpenseService
from src.db.session import get_db
from src.schemas.expense import ExpenseCreate, ExpenseOut
from src.models.expense import Expense
from sqlalchemy.future import select
from src.utils.jwt_bearer import get_current_user
from src.models.user import User

router = APIRouter()

@router.post("/", response_model=ExpenseOut, status_code=status.HTTP_201_CREATED)
async def create_expense(
    payload: ExpenseCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    svc = ExpenseService(db)
    return await svc.create_expense(payload, current_user)

@router.get("/", response_model=list[ExpenseOut])
async def get_expenses(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    svc = ExpenseService(db)
    return await svc.get_expenses_by_user(current_user.id)

@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(
    expense_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    svc = ExpenseService(db)
    await svc.delete_expense(expense_id, current_user)
    return {"detail": "Expense deleted successfully"}

@router.put("/{expense_id}", response_model=ExpenseOut)
async def update_expense(   
    expense_id: int,
    payload: ExpenseCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    svc = ExpenseService(db)
    return await svc.update_expense(expense_id, payload, current_user)
