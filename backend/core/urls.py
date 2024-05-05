from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from api.urls import app
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',app.urls),
    path('',include('product.urls'))
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
