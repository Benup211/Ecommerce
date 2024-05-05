from django.urls import path
from .views import *
urlpatterns = [
    path('',IndexPage.as_view(),name="index"),
    path('product/<int:id>/',DetailPage.as_view(),name="detail")
]
