from pydantic import BaseModel
from datetime import datetime

class ExpenseCreate(BaseModel):
    title: str
    amount: float

class ExpenseOut(BaseModel):
    id: int
    title: str
    amount: float
    created_at: datetime

    class Config:
        orm_mode = True
