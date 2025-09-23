from src.models.user import User

class UserService:
    def __init__(self,db):
        self.db = db

    def create_user(self,user_create):
        user = User(email=user_create.email,password=user_create.password)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
    
    def get_user(self):
        return self.db.query(User).all()