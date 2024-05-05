from pydantic import BaseModel
from typing import List

class SimpleProductOut(BaseModel):
    id:int
    name:str
    price:float
    details_image:List[str]

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