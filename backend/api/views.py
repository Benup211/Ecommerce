from ninja import Router,NinjaAPI
from product.models import Category,Laptop,LaptopDetail,ProductImage,CarouselData
from .schema import *
from typing import List
from django.shortcuts import get_object_or_404
from django.db.models import Q

router=Router()

@router.get('/',response=List[SimpleProductOut],tags=['Products'])
def get_limited_product(request,limit:int=10,desc:bool=False):
    """
    Retrieves a list of limited products.

    Limit: {limit}
    """
    if desc:
        laptops = Laptop.objects.order_by('-date_added')[:limit]
    else:
        laptops = Laptop.objects.order_by('date_added')[:limit]
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
def get_all_product(request,price_from:int=0,price_to:int=0,brand:int=0):
    """
    Retrieves a list of all products.

    """
    if price_from==0 and price_to==0 and brand==0:
        laptops = Laptop.objects.all()
    else:
        laptops= Laptop.objects.filter(
        Q(price__gte=price_from) & Q(price__lte=price_to) & Q(category_id=brand)
    )
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

@router.get('get/{id}/',tags=['Products'])
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
        id=laptop.id,
        category=category,
        name=laptop.name,
        price=laptop.price,
        quantity=laptop.quantity,
        details=details
    )

    return laptop_schema

@router.get('carousel/',tags=['Products'],response=List[CarouselSchema])
def get_carousel(request):
    carousels=CarouselData.objects.all()
    carousels_data=list(carousels.values('name','desc','image','laptop_id'))
    return carousels_data
@router.get('categories/',tags=['Products'],response=List[CategorieSchema])
def get_categories(request):
    categories=Category.objects.all()
    categories_data=list(categories.values('id','name','image'))
    return categories_data

@router.post('check/',tags=['Cart'])
def check_laptop(request,data:CartSchema):
    print(data.id,data.quantity)
    laptop=get_object_or_404(Laptop,id=data.id)
    if laptop.quantity>data.quantity:
        return NinjaAPI().create_response(
            request,
            {"message":"Sucessfully Added to Cart",
             "detail":{"id":laptop.id,"price":laptop.price,"name":laptop.name,"order":data.quantity,"quantity":laptop.quantity}
            },status=200)
    else:
        return NinjaAPI().create_response(
            request,
            {"message":"Unsucessfully! Low on Stock",
            },status=400)