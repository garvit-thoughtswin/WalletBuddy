from fastapi import APIRouter,Depends,status
from sqlalchemy.orm import Session
from src.schemas.user import UserLogin,UserCreate,UserOut
from src.db.session import get_db
from src.services.user import UserService
from jose import jws
from src.core.config import settings

router = APIRouter()

# @router.post("/",response_model=UserOut,status_code=status.HTTP_201_CREATED)
# def create_user(payload:UserCreate,db:Session=Depends(get_db)):
#     svc = UserService(db)
#     return svc.create_user(payload)

# @router.get("/",response_model=List[UserOut],status_code=status.HTTP_201_CREATED)
# def get_user(db:Session=Depends(get_db)):
#     svc = UserService(db)
#     return svc.get_user()


@router.post("/signup",response_model=UserOut,status_code=status.HTTP_200_OK)
async def create_user(payload:UserCreate,db:Session=Depends(get_db)):
    svc = UserService(db)
    userData = await svc.create_user(payload)
    signedToken = jws.sign(userData,settings.JWT_SECRET)
    return signedToken

@router.post("/login",response_model=UserOut,status_code=status.HTTP_201_CREATED)
async def login_user(payload:UserLogin,db:Session=Depends(get_db)):
    svc = UserService(db)
    return await svc.get_user()