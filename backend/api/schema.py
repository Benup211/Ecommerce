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
    category: CategorySchema
    name: str
    price: float
    quantity: int
    details: LaptopDetailSchema