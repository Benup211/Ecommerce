from django.shortcuts import render
from django.views import View
from .models import Laptop
# Create your views here.
class IndexPage(View):
    def get(self,request):
        laptops=Laptop.objects.all()
        context={
            "laptops":laptops
        }
        return render(request,'product/product.html',context)

class DetailPage(View):
    def get(self,request,id):
        return render(request,'product/detail.html')