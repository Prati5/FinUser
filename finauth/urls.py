from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('finapp/', include('user.urls')),
    path('o/', include('oauth2_provider.urls'))
]
