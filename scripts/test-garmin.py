from garminconnect import Garmin
import json
import os
from datetime import datetime, timedelta

# Test connection
try:
    username = input("Enter your Garmin username: ")
    password = input("Enter your Garmin password: ")
    
    client = Garmin(username, password)
    client.login()
    
    print("✅ Successfully connected to Garmin!")
    
    # Get last 10 activities as a test
    activities = client.get_activities(0, 10)
    print(f"Found {len(activities)} activities")
    
    # Save to JSON file
    with open('data/test-garmin-data.json', 'w') as f:
        json.dump(activities, f, indent=2, default=str)
    
    print("✅ Data saved to data/test-garmin-data.json")
    
except Exception as e:
    print(f"❌ Error: {e}")
