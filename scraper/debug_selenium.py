#!/usr/bin/env python3
"""
Debug script to see what Selenium actually gets from the LA County page
"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_selenium_loading():
    """Test what Selenium can actually see on the page"""
    
    # Test URL - Trowel (should have 9 available)
    test_url = "https://catalog.lacountylibrary.org/client/en_US/default/search/detailnonmodal?qu=TITLE%3DTrowel&qf=ITYPE%09Material+Type%091%3ATOOL%091%3ATOOL"
    
    options = Options()
    # Don't run headless so we can see what happens
    # options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    driver = webdriver.Chrome(options=options)
    
    try:
        print(f"Loading: {test_url}")
        driver.get(test_url)
        
        # Wait a bit for JavaScript to load
        print("Waiting 5 seconds for page to fully load...")
        time.sleep(5)
        
        # Save the page source
        with open('selenium_page_source.html', 'w', encoding='utf-8') as f:
            f.write(driver.page_source)
        print("✓ Saved page source to: selenium_page_source.html")
        
        # Try to find elements
        print("\nSearching for 'Available' text in page...")
        if 'Available' in driver.page_source:
            print("  ✓ Found 'Available' in page source")
            # Find the context
            idx = driver.page_source.find('Available')
            context = driver.page_source[max(0, idx-100):idx+200]
            print(f"  Context: ...{context}...")
        else:
            print("  ✗ 'Available' NOT found in page source")
        
       # Try different wait strategies
        print("\nTrying to wait for specific elements...")
        try:
            # Wait for holdings table
            wait = WebDriverWait(driver, 10)
            table = wait.until(EC.presence_of_element_located((By.TAG_NAME, "table")))
            print(f"  ✓ Found a table element")
            print(f"    Table text preview: {table.text[:200]}...")
        except Exception as e:
            print(f"  ✗ Could not find table: {e}")
        
        print("\nCheck the saved file and the browser window!")
        print("Press Enter to close...")
        input()
        
    finally:
        driver.quit()

if __name__ == '__main__':
    test_selenium_loading()
