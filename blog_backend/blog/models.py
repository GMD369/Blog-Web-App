from django.db import models
from django.contrib.auth import get_user_model

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Post(models.Model):
    title       = models.CharField(max_length=200)
    content     = models.TextField()
    created_at  = models.DateTimeField(auto_now_add=True)
    category    = models.ForeignKey(Category, on_delete=models.CASCADE)
    author      = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    image = models.ImageField(upload_to='blog_posts/', blank=True, null=True)

    def __str__(self):
        return self.title

User = get_user_model()


class Comment(models.Model):
    post        = models.ForeignKey('Post', related_name='comments', on_delete=models.CASCADE)
    author      = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    content     = models.TextField()
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    parent = models.ForeignKey("self", null=True, blank=True, related_name="replies", on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']   # latest first

    def __str__(self):
        return f'{self.author} on {self.post}'