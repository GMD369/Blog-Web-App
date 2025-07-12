#!/usr/bin/env python
"""
Simple test script to verify API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_categories():
    """Test categories endpoint"""
    print("Testing categories endpoint...")
    response = requests.get(f"{BASE_URL}/categories/")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Found {len(data.get('results', data))} categories")
        return True
    else:
        print(f"Error: {response.text}")
        return False

def test_posts():
    """Test posts endpoint"""
    print("\nTesting posts endpoint...")
    response = requests.get(f"{BASE_URL}/posts/")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Found {len(data.get('results', data))} posts")
        return True
    else:
        print(f"Error: {response.text}")
        return False

def test_auth():
    """Test authentication endpoint"""
    print("\nTesting authentication endpoint...")
    # Test with admin user (you'll need to set the password)
    auth_data = {
        "username": "admin",
        "password": "admin123"  # Change this to your admin password
    }
    response = requests.post(f"{BASE_URL}/token/", json=auth_data)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print("Authentication successful!")
        print(f"Access token: {data.get('access', '')[:20]}...")
        return data.get('access')
    else:
        print(f"Error: {response.text}")
        return None

def test_create_post(token):
    """Test creating a post"""
    if not token:
        print("No token available, skipping post creation test")
        return
    
    print("\nTesting post creation...")
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    post_data = {
        "title": "Test Post",
        "content": "This is a test post content.",
        "category_id": 1  # Technology category
    }
    
    response = requests.post(f"{BASE_URL}/posts/", json=post_data, headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 201:
        print("Post created successfully!")
        return True
    else:
        print(f"Error: {response.text}")
        return False

if __name__ == "__main__":
    print("API Test Script")
    print("=" * 50)
    
    # Test basic endpoints
    test_categories()
    test_posts()
    
    # Test authentication
    token = test_auth()
    
    # Test post creation if authenticated
    if token:
        test_create_post(token)
    
    print("\nTest completed!") 