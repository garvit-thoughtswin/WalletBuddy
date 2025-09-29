from pydantic import BaseModel

class ExpenseCreate(BaseModel):
    title: str
    amount: float

class ExpenseOut(BaseModel):
    id: int
    title: str
    amount: float

    class Config:
        orm_mode = True
