from database.models import User
from database.schemas import UserBase
from database.database import sessionlocal

def get_user(user:UserBase):
    user_data=User(**user.model_dumps())
    return user_data

def create_user(user:UserBase):
    user_data=User(first_name=user.first_name,last_name=user.last_name,email=user.email,phone_number=user.phone_number,password=user.password,is_active=user.is_active)
    session=sessionlocal()
    try:
        session.add(user_data)
        session.commit()
        session.refresh(user_data)
    except Exception as e:
        session.rollback()
        return {"error":str(e)}
    finally:
        session.close()
    return user_data