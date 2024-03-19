from .database import Base,engine
from sqlalchemy import Column, Integer, String,Boolean
import uuid
class User(Base):
    __tablename__='users'
    id=Column(Integer, primary_key=True, index=True)
    first_name=Column(String)
    last_name=Column(String)
    email=Column(String, unique=True, index=True)
    password=Column(String)
    is_active=Column(Boolean, default=True)
    phone_number=Column(String, unique=True, index=True)

Base.metadata.create_all(engine)