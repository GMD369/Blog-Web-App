#!/usr/bin/env python
"""
Test script to verify JWT token generation with username
"""
import requests
import json
from jwt import decode
import base64

def test_token_generation():
    # Test login to get new token
    login_data = {
        "username": "admin",  # Replace with your actual username
        "password": "admin"   # Replace with your actual password
    }
    
    try:
        response = requests.post(
            "http://127.0.0.1:8000/api/token/",
            json=login_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            tokens = response.json()
            print("✅ Login successful!")
            print(f"Access token: {tokens['access'][:50]}...")
            print(f"Refresh token: {tokens['refresh'][:50]}...")
            
            # Decode the token to see the payload
            try:
                # Split the token and decode the payload (second part)
                token_parts = tokens['access'].split('.')
                if len(token_parts) == 3:
                    payload = token_parts[1]
                    # Add padding if needed
                    payload += '=' * (4 - len(payload) % 4)
                    decoded_payload = base64.b64decode(payload).decode('utf-8')
                    payload_data = json.loads(decoded_payload)
                    
                    print("\n🔍 Token Payload:")
                    print(json.dumps(payload_data, indent=2))
                    
                    # Check if username is present
                    if 'username' in payload_data:
                        print(f"\n✅ Username found in token: {payload_data['username']}")
                    else:
                        print("\n❌ Username not found in token")
                        
                else:
                    print("❌ Invalid token format")
                    
            except Exception as e:
                print(f"❌ Error decoding token: {e}")
                
        else:
            print(f"❌ Login failed: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure the Django server is running on port 8000.")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("🧪 Testing JWT Token Generation with Username")
    print("=" * 50)
    test_token_generation() 