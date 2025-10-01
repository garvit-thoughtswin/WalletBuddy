from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.schemas.category import CategoryCreate, CategoryOut
from src.services.category import CategoryService
from src.db.session import get_db
from src.utils.jwt_bearer import get_current_user


router = APIRouter()

@router.post("/", response_model=CategoryOut, status_code=status.HTTP_201_CREATED)
async def create_category(
    payload: CategoryCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    svc = CategoryService(db)
    return await svc.create_category(current_user.id, payload.name)

@router.get("/", response_model=list[CategoryOut])
async def get_categories(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    svc = CategoryService(db)
    return await svc.get_categories(current_user.id)
