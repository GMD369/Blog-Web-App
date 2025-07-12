from rest_framework import viewsets, generics, filters
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import serializers

from .models import Post, Category, Comment
from .serializers import PostSerializer, CategorySerializer, CommentSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.serializers import ModelSerializer


# 📝 PostViewSet with Pagination, Filtering, Searching, Ordering
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().select_related('category', 'author').prefetch_related('comments').order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    # Enable filters
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'author__username']       # ?category=1&author__username=admin
    search_fields = ['title', 'content', 'author__username']  # ?search=django
    ordering_fields = ['created_at', 'title']                 # ?ordering=-created_at

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# 📚 CategoryViewSet (fully open or read-only)
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Optional
    pagination_class = None  # Disable pagination for categories
    
    def get_queryset(self):
        # Return all categories without pagination
        return Category.objects.all()


# 👤 User registration API
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# 💬 Nested CommentViewSet for each post
class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs.get('post_pk')
        try:
            # Validate that the post exists
            post = Post.objects.get(id=post_id)
            return Comment.objects.filter(post=post).select_related('author', 'post')
        except (Post.DoesNotExist, ValueError):
            # Return empty queryset if post doesn't exist or invalid ID
            return Comment.objects.none()

    def perform_create(self, serializer):
        post_id = self.kwargs.get('post_pk')
        try:
            post = Post.objects.get(id=post_id)
            serializer.save(author=self.request.user, post=post)
        except Post.DoesNotExist:
            raise serializers.ValidationError("Post not found")
