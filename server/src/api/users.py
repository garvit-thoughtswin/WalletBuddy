from fastapi import APIRouter,Depends,status
from sqlalchemy.orm import Session
from src.schemas.user import UserCreate,UserOut
from src.db.session import get_db
from src.services.user import UserService
from typing import List

router = APIRouter()

@router.post("/",response_model=UserOut,status_code=status.HTTP_201_CREATED)
def create_user(payload:UserCreate,db:Session=Depends(get_db)):
    svc = UserService(db)
    return svc.create_user(payload)

@router.get("/",response_model=List[UserOut],status_code=status.HTTP_201_CREATED)
def get_user(db:Session=Depends(get_db)):
    svc = UserService(db)
    return svc.get_user()