from django.db import models
from registeredUser.models import User
class ProductImage(models.Model):
    image = models.ImageField(upload_to='laptop_images')

    def __str__(self):
        return f"Image {self.id}"
    
class Category(models.Model):
    name = models.CharField(max_length=100)
    image=models.FileField(upload_to='laptop_logo')
    def __str__(self):
        return self.name
    class Meta:
        verbose_name="category"
        verbose_name_plural="categories"

class LaptopDetail(models.Model):
    display_size = models.CharField(max_length=200)
    processor = models.CharField(max_length=100)
    memory = models.CharField(max_length=100)
    storage = models.CharField(max_length=100)
    graphics_card = models.CharField(max_length=100)
    operating_system = models.CharField(max_length=100)
    images = models.ManyToManyField('ProductImage')

    def __str__(self):
        return f"Laptop Detail {self.id}"
class Laptop(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=300)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    details = models.ForeignKey(LaptopDetail, on_delete=models.CASCADE)
    date_added=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class CarouselData(models.Model):
    name=models.CharField(max_length=200)
    desc=models.CharField(max_length=200)
    image=models.ImageField(upload_to="carousel")
    laptop=models.OneToOneField(Laptop,on_delete=models.CASCADE)

class Order(models.Model):
    order_laptop=models.ForeignKey(Laptop,on_delete=models.CASCADE)
    quantity=models.IntegerField()
    order_user=models.ForeignKey(User,on_delete=models.CASCADE)
    delivery=models.CharField(max_length=100,default="pending")
    date=models.DateTimeField(auto_now_add=True)