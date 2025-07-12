from rest_framework import serializers
from .models import Post, Category, Comment

# 1️⃣ Comment Serializer (define first)
class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_username', 'content', 'created_at', 'updated_at']
        read_only_fields = ['author', 'created_at', 'updated_at', 'post']

# 2️⃣ Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# 3️⃣ Post Serializer (uses Category and Comment)
class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    comments_count = serializers.IntegerField(source='comments.count', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'category', 'category_id', 'author', 'author_username', 'image', 'comments_count', 'comments']
        read_only_fields = ['author', 'created_at', 'id']

    def create(self, validated_data):
        # Remove category_id and use category instead
        category_id = validated_data.pop('category_id', None)
        if category_id:
            validated_data['category_id'] = category_id
        return super().create(validated_data)
