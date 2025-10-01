from pydantic import BaseModel
from datetime import datetime

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    date: datetime
    category_id: int

class ExpenseOut(BaseModel):
    id: int
    title: str
    amount: float
    date: datetime
    category_id: int
    category_name: str
    
    class Config:
        orm_mode = True
