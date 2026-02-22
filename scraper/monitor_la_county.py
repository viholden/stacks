#!/usr/bin/env python3
"""
LA County Library Monitoring Script
This script can be run periodically (via cron/Task Scheduler) to check for changes
and automatically re-scrape when needed.
"""

import json
import requests
from datetime import datetime
import subprocess
import os

MONITOR_URL = "https://lacountylibrary.org/tools/"
DATA_FILE = "la_county_enhanced_data.json"
MONITOR_LOG = "monitor_log.json"

def check_for_changes():
    """
    Simple monitoring: Check if the tools page has changed
    Returns True if re-scrape is needed
    """
    try:
        response = requests.get(MONITOR_URL, timeout=30)
        content_hash = hash(response.text)
        
        # Load previous hash
        if os.path.exists(MONITOR_LOG):
            with open(MONITOR_LOG, 'r') as f:
                log = json.load(f)
                last_hash = log.get('last_hash')
                
                if last_hash == content_hash:
                    print(f"[{datetime.now()}] No changes detected.")
                    return False
        
        # Save new hash
        with open(MONITOR_LOG, 'w') as f:
            json.dump({
                'last_hash': content_hash,
                'last_check': datetime.now().isoformat()
            }, f)
        
        print(f"[{datetime.now()}] Changes detected! Re-scraping recommended.")
        return True
        
    except Exception as e:
        print(f"[{datetime.now()}] Error checking for changes: {e}")
        return False

def run_scraper():
    """Run the LA County scraper"""
    print(f"[{datetime.now()}] Starting scraper...")
    try:
        result = subprocess.run(
            ['python3', 'la_county_enhanced_scraper.py'],
            capture_output=True,
            text=True,
            timeout=600  # 10 minute timeout
        )
        
        if result.returncode == 0:
            print(f"[{datetime.now()}] ✓ Scraping completed successfully")
            return True
        else:
            print(f"[{datetime.now()}] ✗ Scraping failed:")
            print(result.stderr)
            return False
            
    except Exception as e:
        print(f"[{datetime.now()}] Error running scraper: {e}")
        return False

def run_conversion():
    """Convert scraped data to React format"""
    print(f"[{datetime.now()}] Converting to React format...")
    try:
        result = subprocess.run(
            ['python3', 'convert_la_county_to_react.py'],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print(f"[{datetime.now()}] ✓ Conversion completed")
            return True
        else:
            print(f"[{datetime.now()}] ✗ Conversion failed")
            return False
            
    except Exception as e:
        print(f"[{datetime.now()}] Error running conversion: {e}")
        return False

def update_mockdata():
    """Update mockData.js with new data"""
    print(f"[{datetime.now()}] Updating mockData.js...")
    try:
        result = subprocess.run(
            ['python3', 'update_mockdata.py'],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print(f"[{datetime.now()}] ✓ mockData.js updated")
            return True
        else:
            print(f"[{datetime.now()}] ✗ Update failed")
            return False
            
    except Exception as e:
        print(f"[{datetime.now()}] Error updating mockData: {e}")
        return False

def main():
    """Main monitoring and update workflow"""
    print(f"\n{'='*60}")
    print(f"LA County Library Monitor - {datetime.now()}")
    print(f"{'='*60}\n")
    
    # Check if changes detected
    if check_for_changes():
        # Run full scrape and update pipeline
        if run_scraper():
            if run_conversion():
                if update_mockdata():
                    print(f"\n✓ Full update pipeline completed successfully!")
                    print(f"Website data is now up to date.\n")
                else:
                    print(f"\n⚠ Warning: Data scraped but mockData.js not updated\n")
            else:
                print(f"\n⚠ Warning: Data scraped but conversion failed\n")
        else:
            print(f"\n✗ Scraping failed - no updates made\n")
    
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()

# TO SET UP AUTOMATIC MONITORING:
#
# On Mac/Linux (cron job):
# 1. Run: crontab -e
# 2. Add this line to check daily at 3 AM:
#    0 3 * * * cd /path/to/stacks/scraper && python3 monitor_la_county.py >> monitor.log 2>&1
#
# On Windows (Task Scheduler):
# 1. Open Task Scheduler
# 2. Create Basic Task
# 3. Set trigger (e.g., Daily at 3 AM)
# 4. Set action: Start a program
#    Program: python.exe
#    Arguments: monitor_la_county.py
#    Start in: C:\path\to\stacks\scraper
