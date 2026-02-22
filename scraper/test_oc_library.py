#!/usr/bin/env python3
"""Test OC Library scraping with different approach"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time

CATALOG_URL = "https://catalog.ocpl.org/client/en_US/default/search/results?qf=ITYPE%09Material+Type%091%3ATHING%09Library+of+Things"

chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(options=chrome_options)

try:
    print("Loading page...")
    driver.get(CATALOG_URL)
    time.sleep(10)
    
    # Try to execute JavaScript to check what's available
    print("\nChecking for eRC data...")
    erc_data = driver.execute_script("return window.eRC_Base ? window.eRC_Base.ercTitleData : null;")
    print(f"eRC data: {erc_data}")
    
    print("\nChecking for page data...")
    page_data = driver.execute_script("return window.com_sirsi_ent_page;")
    print(f"Page data: {page_data}")
    
    # Try to find any loaded titles
    print("\n Checking for title elements...")
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    
    # Try different selectors
    titles1 = soup.find_all('a', class_='title')
    print(f"Found {len(titles1)} a.title elements")
    
    titles2 = soup.find_all('div', class_='displayElementText')
    print(f"Found {len(titles2)} displayElementText elements")
    
    results = soup.find_all('div', class_='results_cell')
    print(f"Found {len(results)} results_cell elements")
    
    if results:
        print("\nFirst result_cell content:")
        print(results[0].get_text()[:500])

finally:
    driver.quit()
