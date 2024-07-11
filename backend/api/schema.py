from pydantic import BaseModel,EmailStr
from typing import List

class SimpleProductOut(BaseModel):
    id: int
    name: str
    price: float
    details_image: List[str]

class RegisterIn(BaseModel):
    firstName:str
    lastName:str
    email:EmailStr
    password:str
    phoneNo:str
    address:str
    street:str
    houseNo:str

class LoginIn(BaseModel):
    email:EmailStr
    password:str
class AccountIn(BaseModel):
    id:int
class OrderIn(BaseModel):
    userId:int
    productId:int
    order:int
class CategorySchema(BaseModel):
    name: str

class LaptopDetailSchema(BaseModel):
    display_size: str
    processor: str
    memory: str
    storage: str
    graphics_card: str
    operating_system: str
    images: List[str]

class LaptopSchema(BaseModel):
    id:int
    category: CategorySchema
    name: str
    price: float
    quantity: int
    details: LaptopDetailSchema

class CarouselSchema(BaseModel):
    name:str
    desc:str
    image:str
    laptop_id:int

class CategorieSchema(BaseModel):
    id:int
    name:str
    image:str

class CartSchema(BaseModel):
    id:int
    quantity:int