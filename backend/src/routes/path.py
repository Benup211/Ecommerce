from fastapi import APIRouter
from views.index import hello
from views.users import get_user,create_user
from database.schemas import UserBase
router = APIRouter()

class IndexView(APIRouter):
    def __init__(self):
        super().__init__()
        self.add_api_route("/", self.get_hello,methods=["GET"])
        self.add_api_route("/", self.post_hello,methods=["POST"])
        self.add_api_route("/", self.put_hello, methods=["PUT"])
        self.add_api_route("/", self.delete_hello, methods=["DELETE"])
        self.add_api_route("/", self.patch_hello, methods=["PATCH"]) 
    async def get_hello(self):
        return {"method": "GET", "message": "Hello World"}

    async def post_hello(self,name:str):
        return {"method": "POST", "message": f"Hello {name}"}

    async def put_hello(self):
        return {"method": "PUT", "message": "Hello World"}

    async def delete_hello(self):
        return {"method": "DELETE", "message": "Hello World"}

    async def patch_hello(self):
        return {"method": "PATCH", "message": "Hello World"}
class UserView(APIRouter):
    def __init__(self):
        super().__init__()
        self.add_api_route("/user/", self.get_user,methods=["GET"])
        self.add_api_route("/user/", self.post_user,methods=["POST"])
    async def get_user(self,user:UserBase):
        return get_user(user)

    async def post_user(self,user:UserBase):
        return create_user(user)
router.include_router(UserView())
router.include_router(IndexView())