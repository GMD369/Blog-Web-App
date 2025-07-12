#!/usr/bin/env python
import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_comment_creation():
    # First get auth token
    auth_data = {"username": "admin", "password": "admin123"}
    auth_response = requests.post(f"{BASE_URL}/token/", json=auth_data)
    
    if auth_response.status_code != 200:
        print("Auth failed")
        return
    
    token = auth_response.json()['access']
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test comment creation
    comment_data = {"content": "Test comment"}
    response = requests.post(f"{BASE_URL}/posts/2/comments/", json=comment_data, headers=headers)
    
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 201:
        print("Comment created successfully!")
    else:
        print("Comment creation failed!")

if __name__ == "__main__":
    test_comment_creation() 