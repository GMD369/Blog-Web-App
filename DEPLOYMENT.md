# Blog App Deployment Guide

This guide will help you deploy your Blog App to production environments.

## 🚀 Quick Deployment Steps

### 1. Backend Deployment (Django)

#### Step 1: Prepare Environment
```bash
cd blog_backend

# Copy environment file
cp env.example .env

# Edit .env file with your production settings
nano .env
```

#### Step 2: Install Dependencies
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### Step 3: Configure Database
```bash
# For PostgreSQL (Production)
# Make sure PostgreSQL is installed and running
# Update .env with your database credentials

# For SQLite (Development)
# Update .env to use SQLite
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3
```

#### Step 4: Run Migrations
```bash
python manage.py migrate
python manage.py create_categories
python manage.py createsuperuser
```

#### Step 5: Collect Static Files
```bash
python manage.py collectstatic
```

#### Step 6: Run Server
```bash
# Development
python manage.py runserver 8000

# Production (with Gunicorn)
pip install gunicorn
gunicorn blog_backend.wsgi:application --bind 0.0.0.0:8000
```

### 2. Frontend Deployment (React)

#### Step 1: Prepare Environment
```bash
cd blog_frontend

# Copy environment file
cp env.example .env

# Edit .env file with your production API URL
nano .env
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Build for Production
```bash
npm run build
```

#### Step 4: Serve Static Files
```bash
# Using serve (install globally)
npm install -g serve
serve -s dist -l 3000

# Using nginx or other web server
# Copy dist folder to your web server directory
```

## 🌐 Production Deployment Options

### Option 1: Heroku

#### Backend (Heroku)
```bash
# Create Heroku app
heroku create your-blog-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set DEBUG=False
heroku config:set ALLOWED_HOSTS=your-app.herokuapp.com
heroku config:set CLOUDINARY_CLOUD_NAME=your-cloud-name
heroku config:set CLOUDINARY_API_KEY=your-api-key
heroku config:set CLOUDINARY_API_SECRET=your-api-secret

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# Run migrations
heroku run python manage.py migrate
heroku run python manage.py create_categories
```

#### Frontend (Netlify/Vercel)
```bash
# Build the project
npm run build

# Deploy to Netlify
# Drag and drop dist folder to Netlify

# Or deploy to Vercel
npm install -g vercel
vercel
```

### Option 2: DigitalOcean App Platform

#### Backend
1. Connect your GitHub repository
2. Select Django as the framework
3. Set environment variables in the dashboard
4. Deploy

#### Frontend
1. Connect your GitHub repository
2. Select React as the framework
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### Option 3: AWS/VPS

#### Backend Setup
```bash
# Install required packages
sudo apt update
sudo apt install python3 python3-pip postgresql nginx

# Set up PostgreSQL
sudo -u postgres createdb blogdb
sudo -u postgres createuser bloguser

# Configure nginx
sudo nano /etc/nginx/sites-available/blog-backend
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        alias /path/to/your/staticfiles/;
    }
}
```

#### Frontend Setup
```bash
# Build the project
npm run build

# Copy to web server
sudo cp -r dist/* /var/www/html/
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com

# Database
DB_ENGINE=django.db.backends.postgresql
DB_NAME=blogdb
DB_USER=bloguser
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
CORS_ALLOW_ALL_ORIGINS=False

# JWT
JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440
```

### Frontend (.env)
```env
# API Configuration
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_API_URL=https://your-backend-domain.com

# App Configuration
VITE_APP_NAME=Blog App
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

## 🔒 Security Checklist

### Backend Security
- [ ] Set `DEBUG=False` in production
- [ ] Use a strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS` properly
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use environment variables for sensitive data
- [ ] Set up proper database permissions
- [ ] Configure backup strategy

### Frontend Security
- [ ] Use HTTPS in production
- [ ] Set up Content Security Policy (CSP)
- [ ] Configure proper CORS headers
- [ ] Use environment variables for API URLs
- [ ] Implement proper error handling
- [ ] Set up monitoring and logging

## 📊 Monitoring & Maintenance

### Backend Monitoring
```bash
# Check logs
tail -f /var/log/nginx/error.log
tail -f /var/log/gunicorn/error.log

# Monitor database
sudo -u postgres psql -d blogdb -c "SELECT * FROM pg_stat_activity;"

# Backup database
pg_dump blogdb > backup.sql
```

### Frontend Monitoring
- Set up error tracking (Sentry)
- Monitor performance (Lighthouse)
- Set up uptime monitoring
- Configure analytics

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS_ALLOWED_ORIGINS in backend
   - Ensure frontend URL is included

2. **Database Connection Issues**
   - Verify database credentials
   - Check if database is running
   - Ensure proper permissions

3. **Static Files Not Loading**
   - Run `python manage.py collectstatic`
   - Check nginx configuration
   - Verify static files path

4. **Image Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper permissions

### Debug Commands
```bash
# Check Django settings
python manage.py check --deploy

# Test database connection
python manage.py dbshell

# Check static files
python manage.py collectstatic --dry-run

# Monitor server logs
tail -f /var/log/nginx/access.log
```

## 📞 Support

If you encounter any issues during deployment:

1. Check the logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Test the application locally first
5. Check the troubleshooting section above

For additional help, refer to the official documentation:
- [Django Deployment](https://docs.djangoproject.com/en/4.2/howto/deployment/)
- [React Deployment](https://create-react-app.dev/docs/deployment/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html) 