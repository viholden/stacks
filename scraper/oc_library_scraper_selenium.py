#!/usr/bin/env python3
"""
Orange County Library scraper - Library of Things (Selenium version)
Info: https://ocpl.org/books-more/library-things
Catalog: https://catalog.ocpl.org/client/en_US/default/search/results?qf=ITYPE%09Material+Type%091%3ATHING%09Library+of+Things
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

# Start with larger page size to get more items per page
CATALOG_URL = "https://catalog.ocpl.org/client/en_US/default/search/results?qf=ITYPE%09Material+Type%091%3ATHING%09Library+of+Things&ps=50"
BASE_URL = "https://catalog.ocpl.org"


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
    if any(word in text for word in ['science', 'microscope', 'learn', 'educational', 'stem', 'robot', 'seed']):
        return "Educational Kits"
    if any(word in text for word in ['wifi', 'hotspot', 'internet']):
        return "Technology"
    
    return "Other"


def scrape_catalog():
    """Scrape items from OC Library catalog using Selenium"""
    print("Starting OC Library scrape with Selenium...")
    print("=" * 60)
    
    # Setup Chrome options
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    chrome_options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
    
    driver = None
    all_catalog_items = []
    
    try:
        driver = webdriver.Chrome(options=chrome_options)
        page_num = 1
        
        while True:
            if page_num == 1:
                url = CATALOG_URL
            else:
                # Add page parameter for subsequent pages
                url = CATALOG_URL + f"&pg={page_num}"
            
            print(f"\nPage {page_num}: Loading {url}")
            driver.get(url)
            
            # Wait for results to load
            print("Waiting for JavaScript to load results...")
            time.sleep(10)
            
            # Scroll to trigger lazy loading
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(5)
            driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(3)
            
            # Get page source after JavaScript execution
            html = driver.page_source
            
            # Save HTML for debugging (only first page)
            if page_num == 1:
                with open('oc_library_catalog_selenium.html', 'w', encoding='utf-8') as f:
                    f.write(html)
                print("✓ Saved rendered HTML to oc_library_catalog_selenium.html\n")
            
            soup = BeautifulSoup(html, 'html.parser')
            
            # Look for result cells in SirsiDynix
            results_cells = soup.find_all('div', class_='results_cell')
            print(f"Found {len(results_cells)} result cells on page {page_num}")
            
            if len(results_cells) == 0:
                print("No more results found. Stopping pagination.")
                break
            
            catalog_items = []
            
            for cell in results_cells:
                # Get all text content
                cell_text = cell.get_text(strip=True)
            
                # Skip empty cells
                if not cell_text or len(cell_text) < 10:
                    continue
                
                # First line usually contains the title (after the number)
                lines = [line.strip() for line in cell_text.split('\n') if line.strip()]
                if not lines:
                    continue
                
                # First line is usually: "1. Title of Item"
                title = ''
                if lines and '.' in lines[0]:
                    parts = lines[0].split('.', 1)
                    if len(parts) > 1:
                        title = parts[1].strip()
                
                if not title or len(title) < 3:
                    continue
                
                # Find image URL in the cell HTML
                image_url = ''
                img = cell.find('img', src=True)
                if img:
                    src = img['src']
                    if 'spacer.gif' not in src and 'blank' not in src.lower() and '/content/' in src:
                        if src.startswith('/'):
                            image_url = BASE_URL + src
                        elif not src.startswith('http'):
                            image_url = BASE_URL + '/' + src
                        else:
                            image_url = src
                
                # Find detail URL - look for links in the cell
                detail_url = ''
                links = cell.find_all('a', href=True)
                for link in links:
                    href = link.get('href', '')
                    if '/detail/' in href or 'Record' in href:
                        if href.startswith('/'):
                            detail_url = BASE_URL + href
                        elif not href.startswith('http'):
                            detail_url = BASE_URL + '/' + href
                        else:
                            detail_url = href
                        break
                
                # Get format/description
                description = ''
                for line in lines:
                    if line.startswith('Format:'):
                        description = line.replace('Format:', '').strip()
                        break
                
                # If no format found, use subject line
                if not description:
                    for line in lines:
                        if 'Subject' in line:
                            description = line.strip()
                            break
                
                catalog_item = {
                    'name': title,
                    'description': description,
                    'image_url': image_url,
                    'detail_url': detail_url,
                    'category': categorize_item(title, description)
                }
                
                catalog_items.append(catalog_item)
                print(f"✓ {title[:80]}..." if len(title) > 80 else f"✓ {title}")
            
            all_catalog_items.extend(catalog_items)
            print(f"Page {page_num} extracted: {len(catalog_items)} items")
            print(f"Running total: {len(all_catalog_items)} items")
            
            # Check if there's a next page
            next_button = soup.find('a', {'aria-label': 'Next'})
            if not next_button or 'disabled' in next_button.get('class', []):
                print("\nNo more pages available.")
                break
            
            page_num += 1
            time.sleep(3)  # Delay between pages
        
        print(f"\n{'='*60}")
        print(f"Total items extracted: {len(all_catalog_items)}")
        return all_catalog_items
        
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
        'library_name': 'Orange County Public Library',
        'scrape_date': datetime.now().isoformat(),
        'total_items': len(items),
        'categories': categories
    }
    
    with open('oc_library_data.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Saved {len(items)} items to oc_library_data.json")
    
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
