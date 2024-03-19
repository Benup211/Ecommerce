from pydantic import BaseModel,EmailStr,Field

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    is_active: bool
    password:str=Field(min_length=8,exclude=True,example="Password@123")
    class Config:
        orm_mode = True