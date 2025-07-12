# blog/urls.py
from django.urls import path, include
from rest_framework_nested import routers
from .views import RegisterUserView, PostViewSet, CategoryViewSet, CommentViewSet

# Main router
router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'categories', CategoryViewSet)

# Nested router for comments under posts
posts_router = routers.NestedDefaultRouter(router, r'posts', lookup='post')
posts_router.register(r'comments', CommentViewSet, basename='post-comments')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(posts_router.urls)),
    path('register/', RegisterUserView.as_view(), name='register'),
]
