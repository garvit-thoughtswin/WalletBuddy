from src.models.user import User

class UserService:
    def __init__(self,db):
        self.db = db

    async def create_user(self,user_create):
        user = User(name=user_create.name,email=user_create.email,password=user_create.password)
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user
    
    async def get_user(self):
        return await self.db.query(User).all()