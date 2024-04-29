from ninja import NinjaAPI
from .views import router as product_router

app = NinjaAPI()

app.add_router('/products/',product_router)