# Blog App - Django REST API + React Frontend

A full-stack blog application with Django REST Framework backend and React frontend, featuring user authentication, post management, and Cloudinary image integration.

## Features

### Backend (Django REST Framework)
- ✅ JWT Authentication with refresh tokens
- ✅ User registration and login
- ✅ Post CRUD operations (Create, Read, Update, Delete)
- ✅ Category management
- ✅ Comment system
- ✅ Image upload with Cloudinary integration
- ✅ Search and filtering
- ✅ Pagination
- ✅ CORS configuration

### Frontend (React)
- ✅ Modern UI with Tailwind CSS
- ✅ User authentication (login/register)
- ✅ Home page with all posts display
- ✅ Create new posts with image upload
- ✅ Edit and delete posts
- ✅ View individual post details
- ✅ Comment system
- ✅ My Posts page for user's own posts
- ✅ Search functionality
- ✅ Responsive design
- ✅ Pagination component
- ✅ Skeleton loading states
- ✅ Enhanced debug tools

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL (optional, SQLite is used by default)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd blog_backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   # Windows
   python -m venv env
   env\Scripts\activate
   
   # Linux/Mac
   python3 -m venv env
   source env/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Create default categories:**
   ```bash
   python manage.py create_categories
   ```

6. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the server:**
   ```bash
   python manage.py runserver 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd blog_frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/token/` - Login (get access & refresh tokens)
- `POST /api/token/refresh/` - Refresh access token
- `POST /api/register/` - User registration

### Posts
- `GET /api/posts/` - List all posts (with pagination)
- `POST /api/posts/` - Create new post
- `GET /api/posts/{id}/` - Get specific post
- `PUT /api/posts/{id}/` - Update post
- `DELETE /api/posts/{id}/` - Delete post

### Categories
- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create new category

### Comments
- `GET /api/posts/{id}/comments/` - Get comments for a post
- `POST /api/posts/{id}/comments/` - Add comment to a post
- `DELETE /api/posts/{id}/comments/{comment_id}/` - Delete comment

## Usage

1. **Register/Login:** Create an account or login with existing credentials
2. **Browse Posts:** View all posts on the home page
3. **Create Post:** Click "Create Post" to write a new blog post
4. **Manage Posts:** Use "My Posts" to edit or delete your posts
5. **Interact:** Add comments to posts and engage with the community

## Database Configuration

The app is configured to use SQLite by default for easy setup. To use PostgreSQL:

1. Update `DATABASES` in `blog_backend/blog_backend/settings.py`
2. Install `psycopg2-binary`
3. Create a PostgreSQL database
4. Run migrations

## Cloudinary Configuration

The app uses Cloudinary for image storage. Update the configuration in `settings.py`:

```python
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'your_cloud_name',
    'API_KEY': 'your_api_key',
    'API_SECRET': 'your_api_secret'
}
```

## Troubleshooting

### Common Issues

1. **Categories not loading:** Make sure to run `python manage.py create_categories`
2. **CORS errors:** Check that the frontend URL is in `CORS_ALLOWED_ORIGINS`
3. **Authentication issues:** Verify JWT tokens are being stored correctly
4. **Image upload fails:** Check Cloudinary configuration

### Development Tips

- Use browser developer tools to check API requests
- Check Django server logs for backend errors
- Verify database migrations are applied
- Test API endpoints with tools like Postman

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License. 