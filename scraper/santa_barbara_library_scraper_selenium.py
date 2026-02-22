#!/usr/bin/env python3
"""
Santa Barbara Public Library scraper - Library of Things (Selenium version)
Catalog: https://catalog.sbplibrary.org/?browseCategory=library_of_things_library_santabarbara&subCategory=library_of_things_library_santabarbara_all
"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
from datetime import datetime
import time
import re

CATALOG_URL = "https://catalog.sbplibrary.org/?browseCategory=library_of_things_library_santabarbara&subCategory=library_of_things_library_santabarbara_all"


def categorize_item(name, description=""):
    """Map items to our standard categories"""
    text = (name + " " + description).lower()
    
    if any(word in text for word in ['game', 'puzzle', 'chess', 'monopoly', 'cards', 'board game']):
        return "Games & Recreation"
    if any(word in text for word in ['guitar', 'piano', 'drum', 'ukulele', 'instrument', 'keyboard', 'music']):
        return "Musical Instruments"
    if any(word in text for word in ['craft', 'sewing', 'knit', 'paint', 'art', 'create', 'crochet']):
        return "Arts & Crafts"
    if any(word in text for word in ['camera', 'projector', 'laptop', 'tablet', 'chromebook', 'tech', 'digital', 'gopro']):
        return "Technology"
    if any(word in text for word in ['tool', 'drill', 'saw', 'wrench', 'hammer', 'measuring']):
        return "Tools & Equipment"
    if any(word in text for word in ['cake', 'pan', 'kitchen', 'cook', 'bake', 'food', 'bundt']):
        return "Home & Kitchen"
    if any(word in text for word in ['tent', 'camping', 'hike', 'bike', 'sport', 'fitness', 'yoga', 'wellness', 'telescope', 'binocular']):
        return "Sports & Outdoors"
    if any(word in text for word in ['science', 'microscope', 'learn', 'educational', 'stem', 'robot']):
        return "Educational Kits"
    
    return "Other"


def scrape_catalog():
    """Scrape items from Santa Barbara Library catalog using Selenium"""
    print("Starting Santa Barbara Library scrape with Selenium...")
    print("=" * 60)
    
    # Setup Chrome options
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    chrome_options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')
    
    driver = None
    try:
        driver = webdriver.Chrome(options=chrome_options)
        print(f"Loading catalog: {CATALOG_URL}")
        driver.get(CATALOG_URL)
        
        # Wait for browse results to load
        print("Waiting for page to load...")
        time.sleep(8)
        
        # Try to wait for browse items
        try:
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CLASS_NAME, "browse-category"))
            )
            print("✓ Browse results loaded")
        except:
            print("⚠ Timeout waiting for browse-category, trying alternative selectors...")
        
        # Scroll to load lazy content
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)
        
        # Get page source after JavaScript execution
        html = driver.page_source
        
        # Save HTML for debugging
        with open('santa_barbara_library_catalog_selenium.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("✓ Saved rendered HTML to santa_barbara_library_catalog_selenium.html\n")
        
        soup = BeautifulSoup(html, 'html.parser')
        
        # Look for browse items (try multiple selectors)
        browse_items = soup.find_all('div', class_='browse-item')
        if not browse_items:
            browse_items = soup.find_all('div', class_=re.compile(r'result', re.I))
        if not browse_items:
            browse_items = soup.find_all('div', class_='record')
        
        print(f"Found {len(browse_items)} items\n")
        
        catalog_items = []
        
        for item in browse_items:
            # Find title
            title_elem = item.find('a', class_='browse-title')
            if not title_elem:
                title_elem = item.find('div', class_='title-cell')
            if not title_elem:
                title_elem = item.find('a', class_='title')
            if not title_elem:
                title_elem = item.find('a', href=re.compile(r'Record', re.I))
            
            if not title_elem:
                continue
                
            title = title_elem.get_text(strip=True)
            if not title or len(title) < 3:
                continue
            
            # Get detail URL
            detail_url = ''
            if title_elem.name == 'a':
                href = title_elem.get('href', '')
                if href:
                    if href.startswith('/'):
                        detail_url = 'https://catalog.sbplibrary.org' + href
                    elif not href.startswith('http'):
                        detail_url = 'https://catalog.sbplibrary.org/' + href
                    else:
                        detail_url = href
            
            # Find image
            image_url = ''
            img = item.find('img', src=True)
            if img:
                src = img['src']
                if 'no-image' not in src.lower() and 'blank' not in src.lower():
                    if src.startswith('/'):
                        image_url = 'https://catalog.sbplibrary.org' + src
                    elif not src.startswith('http'):
                        image_url = 'https://catalog.sbplibrary.org/' + src
                    else:
                        image_url = src
            
            # Get description
            description = ''
            desc_elem = item.find('div', class_='browse-description')
            if not desc_elem:
                desc_elem = item.find('div', class_=re.compile(r'description|summary', re.I))
            if desc_elem:
                description = desc_elem.get_text(strip=True)
            
            catalog_item = {
                'name': title,
                'description': description,
                'image_url': image_url,
                'detail_url': detail_url,
                'category': categorize_item(title, description)
            }
            
            catalog_items.append(catalog_item)
            print(f"✓ {title}")
        
        print(f"\n{'='*60}")
        print(f"Total items extracted: {len(catalog_items)}")
        return catalog_items
        
    except Exception as e:
        print(f"❌ Error scraping catalog: {e}")
        import traceback
        traceback.print_exc()
        return []
    finally:
        if driver:
            driver.quit()


def save_to_json(items):
    """Save items to JSON file organized by category"""
    categories = {}
    for item in items:
        cat = item['category']
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(item)
    
    output = {
        'library_name': 'Santa Barbara Public Library',
        'scrape_date': datetime.now().isoformat(),
        'total_items': len(items),
        'categories': categories
    }
    
    with open('santa_barbara_library_data.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Saved {len(items)} items to santa_barbara_library_data.json")
    
    # Print category breakdown
    print("\nCategory breakdown:")
    for cat in sorted(categories.keys()):
        print(f"  {cat}: {len(categories[cat])} items")


if __name__ == '__main__':
    items = scrape_catalog()
    if items:
        save_to_json(items)
    else:
        print("❌ No items extracted")
