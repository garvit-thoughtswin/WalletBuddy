from pydantic import BaseModel, EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserCreate(UserLogin):
    name:str

class UserOut(BaseModel):
    token:str 
    class Config:
        orm_mode = True
