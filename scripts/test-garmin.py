from garminconnect import Garmin
import json
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env

username = os.getenv("GARMIN_USERNAME")
password = os.getenv("GARMIN_PASSWORD")

# Test connection
try:
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
