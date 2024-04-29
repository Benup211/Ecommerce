from ninja import Router
from product.models import Category,Laptop,LaptopDetail,ProductImage
from .schema import *
from typing import List
from django.shortcuts import get_object_or_404

router=Router()

@router.get('/',response=List[SimpleProductOut],tags=['Products'])
def get_limited_product(request,limit:int=10):
    """
    Retrieves a list of limited products.

    Limit: {limit}
    """
    laptops = Laptop.objects.all()[:limit]
    product_list = []

    for laptop in laptops:
        detail = laptop.details
        images = detail.images.all()
        image_urls = [image.image.url for image in images]
        
        laptop_dict = laptop.__dict__
        laptop_dict['details_image'] = image_urls

        product = SimpleProductOut(**laptop_dict)

        product_list.append(product)

    return product_list

@router.get('all/',response=List[SimpleProductOut],tags=['Products'])
def get_all_product(request):
    """
    Retrieves a list of all products.

    """
    laptops = Laptop.objects.all()
    product_list = []

    for laptop in laptops:
        detail = laptop.details
        images = detail.images.all()
        image_urls = [image.image.url for image in images]
        
        laptop_dict = laptop.__dict__
        laptop_dict['details_image'] = image_urls

        product = SimpleProductOut(**laptop_dict)

        product_list.append(product)

    return product_list

@router.get('{id}/',tags=['Products'])
def get_siingle_product(request,id:int):
    """
    Retrieves a product detail,given product id.

    """
    laptop = get_object_or_404(Laptop, id=id)

    category = CategorySchema(name=laptop.category.name)
    images = [image.image.url for image in laptop.details.images.all()]
    details = LaptopDetailSchema(
        display_size=laptop.details.display_size,
        processor=laptop.details.processor,
        memory=laptop.details.memory,
        storage=laptop.details.storage,
        graphics_card=laptop.details.graphics_card,
        operating_system=laptop.details.operating_system,
        images=images
    )

    laptop_schema = LaptopSchema(
        category=category,
        name=laptop.name,
        price=laptop.price,
        quantity=laptop.quantity,
        details=details
    )

    return laptop_schema