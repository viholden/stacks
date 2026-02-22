#!/usr/bin/env python3
"""
Update LA County items with real availability using Selenium
This script uses the existing scraped data and adds accurate availability info
"""

import json
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
import time

def setup_driver():
    """Setup headless Chrome driver"""
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    
    driver = webdriver.Chrome(options=options)
    return driver

def get_availability(driver, url):
    """
    Fetch availability from a detail page URL using Selenium
    Returns: copies_available (int)
    """
    try:
        driver.get(url)
        
        # Wait for page to load - wait for the availability text or table
        wait = WebDriverWait(driver, 10)
        
        # Try to find "Available: X" text
        page_source = driver.page_source
        available_match = re.search(r'Available:\s*(\d+)', page_source, re.I)
        
        if available_match:
            copies_available = int(available_match.group(1))
            print(f"    ✓ Found: {copies_available} available")
            return copies_available
        else:
            print(f"    ⚠ No availability text found")
            return 0
            
    except Exception as e:
        print(f"    ✗ Error: {e}")
        return 0

def update_availability():
    """Update existing scraped data with real availability"""
    
    # Load existing data
    with open('la_county_enhanced_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    items = data['items']
    print(f"Updating availability for {len(items)} items...\n")
    
    # Setup Selenium driver
    driver = setup_driver()
    
    try:
        for idx, item in enumerate(items, 1):
            print(f"[{idx}/{len(items)}] {item['name']}")
            
            if 'detail_url' in item and item['detail_url']:
                new_availability = get_availability(driver, item['detail_url'])
                item['copies_available'] = new_availability
                
                # Update availability boolean
                item['availability'] = new_availability > 0
            else:
                print(f"    ⚠ No detail URL")
            
            # Small delay between requests
            time.sleep(1)
            
            # Progress update every 10 items
            if idx % 10 == 0:
                print(f"\nProgress: {idx}/{len(items)} items updated\n")
        
        # Save updated data
        data['updated_at'] = datetime.now().isoformat()
        
        with open('la_county_enhanced_data.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        # Stats
        available_count = sum(1 for item in items if item.get('copies_available', 0) > 0)
        total_available = sum(item.get('copies_available', 0) for item in items)
        
        print(f"\n{'='*60}")
        print(f"Availability update complete!")
        print(f"Items with copies available: {available_count}/{len(items)}")
        print(f"Total copies available across all items: {total_available}")
        print(f"Data saved to: la_county_enhanced_data.json")
        print(f"{'='*60}")
        
    finally:
        driver.quit()

if __name__ == '__main__':
    update_availability()
