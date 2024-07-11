from django.contrib import admin
from .models import *
from unfold.admin import ModelAdmin

@admin.register(Category)
class AdminCategory(ModelAdmin):
    list_display=['id','name']

@admin.register(Laptop)
class AdminLaptop(ModelAdmin):
    list_display=['id','name','quantity','category']

@admin.register(LaptopDetail)
class AdminLaptopDetail(ModelAdmin):
    list_display=['id','processor','memory','storage','graphics_card','operating_system']

@admin.register(ProductImage)
class AdminProdictImage(ModelAdmin):
    pass

@admin.register(CarouselData)
class AdminCarouselData(ModelAdmin):
    list_display=['name','image','desc']

@admin.register(Order)
class AdminOrder(ModelAdmin):
    list_display=['order_laptop','order_user','quantity','delivery','date']