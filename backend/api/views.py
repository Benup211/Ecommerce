from ninja import Router,NinjaAPI
from product.models import Category,Laptop,LaptopDetail,ProductImage,CarouselData,Order
from django.contrib.auth import authenticate
from .schema import *
from typing import List
from django.shortcuts import get_object_or_404
from django.db.models import Q
from registeredUser.models import User

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

@router.get('query/',response=List[SimpleProductOut],tags=['Search Products'])
def query_product(request,s:str):
    """
    Query given string for the laptop
    """
    laptops = Laptop.objects.filter(name__icontains=s)
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
        if price_to==0:
            price_to=10000000
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
    
@router.post('register/',tags=['Authentication'])
def registerUser(request,data:RegisterIn):
    user=User.objects.create_user(email=data.email,
                                  password=data.password,
                                  first_name=data.firstName,
                                  last_name=data.lastName,
                                  phone_number=data.phoneNo,
                                    address=data.address,
                                    street=data.street,
                                    house_no=data.houseNo)
    if user:
        return NinjaAPI().create_response(request,{"message": "User registered successfully."}, status=201)
    else:
        return NinjaAPI().create_response(request,{"message": "User registered unsuccessfully."}, status=400)

@router.post('login/',tags=['Authentication'])
def loginUser(request,data:LoginIn):
    user=authenticate(email=data.email,password=data.password)
    if user:
        return NinjaAPI().create_response(request,{"message": "User login successfully.","id":user.id}, status=200)
    else:
        return NinjaAPI().create_response(request,{"message": "User login unsuccessfully."}, status=400)

@router.post('account/',tags=['account'])
def userAccount(request,data:AccountIn):
    user=User.objects.get(id=data.id)
    if user:
        return NinjaAPI().create_response(request,{"message": "Account Data Fetched",
                                                   "first_name":user.first_name,
                                                    "last_name":user.last_name,
                                                    "phone_number":user.phone_number,
                                                        "address":user.address,
                                                        "street":user.street,
                                                        "house_no":user.house_no}, status=200)
    else:
        return NinjaAPI().create_response(request,{"message": "Account Data Fetched Error"}, status=400)

@router.post('order/',tags=['order'])
def userOrder(request,data:OrderIn):
    user=User.objects.get(id=data.userId)
    product=Laptop.objects.get(id=data.productId)
    order=Order.objects.create(order_laptop=product,order_user=user,quantity=data.order)
    if order:
         return NinjaAPI().create_response(request,{"message": "Order placed sucessful"}, status=200)
    else:
        return NinjaAPI().create_response(request,{"message": "Order placed unsucessful"}, status=400)
    
@router.post('orderDetail/',tags=['order'])
def getAllOrder(request,data:AccountIn):
    try:
        user=User.objects.get(id=data.id)
        orders=Order.objects.filter(order_user=user)
        order_list=[]
        for order in orders:
            order_dict = {'laptop_name': order.order_laptop.name,'quantity': order.quantity,'delivery_status': order.delivery}
            order_list.append(order_dict)
            
        return NinjaAPI().create_response(request,{'list':order_list,'message': 'Orders fetched'}, status=200)
    except:
       return NinjaAPI().create_response(request,{'message': 'Orders fetch Error'}, status=400)
