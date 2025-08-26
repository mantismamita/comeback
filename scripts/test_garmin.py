from garminconnect import Garmin
import json
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env

username = os.getenv("GARMIN_USERNAME")
password = os.getenv("GARMIN_PASSWORD")

# This is my peak activity
extra_activity_id = 13596944363

try:
    client = Garmin(username, password)
    client.login()
    
    print("✅ Successfully connected to Garmin!")
    
    # Get last 12 activities
    activities = client.get_activities(0, 12)
    print(f"Found {len(activities)} activities")
    
    # Check if the extra activity is already in the list
    if not any(str(act.get("activityId")) == str(extra_activity_id) for act in activities):
        print(f"Fetching activity with ID {extra_activity_id}...")
        extra_activity = client.get_activity(extra_activity_id)
        activities.append(extra_activity)
        print("Added extra activity to the list.")
    else:
        print("Extra activity already in the list.")

    def normalize_activity(activity):
    # If summaryDTO exists, flatten its fields to the top level
        if "summaryDTO" in activity:
            summary = activity["summaryDTO"]
            # Copy summary fields to top level if not already present
            for key, value in summary.items():
                if key not in activity:
                    activity[key] = value
            # Also normalize activityType
            if "activityTypeDTO" in activity and "activityType" not in activity:
                activity["activityType"] = activity["activityTypeDTO"]
            if "eventTypeDTO" in activity and "eventType" not in activity:
                activity["eventType"] = activity["eventTypeDTO"]
            if "startTimeLocal" not in activity and "startTimeLocal" in summary:
                activity["startTimeLocal"] = summary["startTimeLocal"]
            if "activityName" not in activity and "activityName" in activity:
                activity["activityName"] = activity["activityName"]
        return activity

    # After fetching activities and possibly appending extra_activity:
    activities = [normalize_activity(act) for act in activities]
    
    # Save to JSON file
    with open('data/test-garmin-data.json', 'w') as f:
        json.dump(activities, f, indent=2, default=str)
    
    print("✅ Data saved to data/test-garmin-data.json")
    
except Exception as e:
    print(f"❌ Error: {e}")
