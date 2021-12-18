from django.urls import path
from viewsets.views import UserViewSet,UserDetailsViewSet,Login

urlpatterns = [
    path('login/', Login.as_view({'post': 'get_user_details'})),
    path('userdata/', UserDetailsViewSet.as_view({'get': 'list'})),
    path('upload/', UserDetailsViewSet.as_view({'post': 'read_json_file'})),
    path('create/',UserViewSet.as_view({'post': 'create_user'}))
]
