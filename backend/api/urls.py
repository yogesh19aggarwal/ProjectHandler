# from django.urls import path
# from .views import *
# from rest_framework.routers import DefaultRouter



# router = DefaultRouter()
# router.register('project', ProjectsViewSet, basename='project')
# urlpatterns = router.urls

# urlpatterns = [
#     path('', home, name="home")
# ]


from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('project', ProjectsViewSet, basename='project')
router.register('projectmanager', ProjectManagerViewSet, basename='projectmanager')

urlpatterns = router.urls

# urlpatterns = [
#     path('', include(router.urls)),
# ]