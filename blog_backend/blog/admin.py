from django.contrib import admin
from .models import Post, Category, Comment
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin


# ---------- Inline for Comments ----------
class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0
    readonly_fields = ['author', 'created_at']
    can_delete = True


# ---------- Post Admin ----------
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'author', 'category', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'content', 'author']
    ordering = ['-created_at']
    date_hierarchy = 'created_at'
    list_per_page = 20
    autocomplete_fields = ['category']

    # ⬇️  Inline comments
    inlines = [CommentInline]


# ---------- Category Admin ----------
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']


# ---------- Comment Admin ----------
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'post', 'author', 'content', 'created_at']
    list_filter = ['created_at']
    search_fields = ['content', 'author__username', 'post__title']
    raw_id_fields = ['post', 'author']
    ordering = ['-created_at']


# ---------- User Admin (optional) ----------
admin.site.unregister(User)      # remove default
admin.site.register(User, UserAdmin)
