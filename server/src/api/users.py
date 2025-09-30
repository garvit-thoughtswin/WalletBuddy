from fastapi import APIRouter,Depends,status
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from src.models.user import User
from src.utils.jwt_bearer import get_current_user
from src.schemas.user import UserLogin,UserCreate,UserOut, UserProfile
from src.db.session import get_db
from src.services.user import UserService
from src.utils.signJWT import signJWT

router = APIRouter()


@router.post("/signup",response_model=UserOut,status_code=status.HTTP_200_OK)
async def create_user(payload:UserCreate,db:AsyncSession=Depends(get_db)):
    svc = UserService(db)
    userData = await svc.create_user(payload)
    signedToken = signJWT({"name":userData.name,"email":userData.email})
    return {"token":signedToken}

@router.post("/login",response_model=UserOut,status_code=status.HTTP_201_CREATED)
async def login_user(payload:UserLogin,db:AsyncSession=Depends(get_db)):
    svc = UserService(db)
    userData = await svc.login_user(payload)
    signedToken=signJWT({"name":userData.name,"email":userData.email})
    return {"token":signedToken}

@router.get("/profile",response_model=UserProfile,status_code=status.HTTP_200_OK)
async def get_user(db:AsyncSession=Depends(get_db),current_user:User=Depends(get_current_user)):
    return current_user