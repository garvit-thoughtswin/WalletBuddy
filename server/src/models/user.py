from sqlalchemy import Column,Integer,String
from src.db.session import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,nullable=False)
    email = Column(String,unique=True,index=True,nullable=False)
    password = Column(String,nullable=False)
    role = Column(String,default="user")

    expenses = relationship("Expense", back_populates="user")
    categories = relationship("Category", back_populates="user", cascade="all, delete")