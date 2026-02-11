#!/usr/bin/env python3
"""
Houston Public Library - All 317 Individual Copies Scraper
Extracts each physical copy at each branch location as a separate item
"""

import json
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time

BASE_URL = "https://halan.sdp.sirsi.net/client/en_US/hou/search/results"

# All row start positions for 27 pages (12 items per page)
ROW_STARTS = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 
              180, 192, 204, 216, 228, 240, 252, 264, 276, 288, 300, 312]

def extract_item_id(url):
    """Extract item ID from URL"""
    match = re.search(r'SD_ILS:(\d+)', url)
    return match.group(1) if match else None

def categorize_item(item_name):
    """Categorize items based on keywords"""
    name_lower = item_name.lower()
    
    if any(word in name_lower for word in ['craft', 'sumi-e', 'cookie cutter', 'mindfulness']):
        return 'Crafts & Hobbies'
    elif any(word in name_lower for word in ['tool', 'scanner', 'obd2', 'bicycle', 'repair']):
        return 'Tools & Equipment'
    elif any(word in name_lower for word in ['handbell', 'musical', 'instrument']):
        return 'Musical Instruments'
    elif any(word in name_lower for word in ['tonie', 'book club', 'kit']):
        return 'Educational Kits'
    elif any(word in name_lower for word in ['chess', 'game', 'puzzle']):
        return 'Games & Puzzles'
    else:
        return 'Other'

def scrape_page(rw):
    """Scrape a single page using the rw (row start) parameter"""
    url = f"{BASE_URL}?lm=LIBTHINGS&isd=true&rw={rw}"
    
    print(f"\nScraping items {rw + 1}-{rw + 12}...")
    
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all item result containers
        items = []
        result_divs = soup.find_all('div', class_=re.compile(r'results_bio'))
        
        for idx, result_div in enumerate(result_divs):
            try:
                # Find the title link
                title_link = result_div.find('a', class_='detailLink')
                if not title_link:
                    continue
                
                title = title_link.get_text(strip=True)
                href = title_link.get('href', '')
                item_id = extract_item_id(href)
                
                if not title or not item_id:
                    continue
                
                # Extract publication info
                pub_div = result_div.find('div', class_='displayElementText', string=re.compile(r'\d{4}'))
                publication = pub_div.get_text(strip=True) if pub_div else ""
                
                # Build reserve URL
                if href.startswith('/'):
                    reserve_url = f"https://halan.sdp.sirsi.net{href}"
                else:
                    reserve_url = href
                
                if 'lm=LIBTHINGS' not in reserve_url:
                    reserve_url += '&lm=LIBTHINGS' if '?' in reserve_url else '?lm=LIBTHINGS'
                
                # Extract branch/location info from availability table if present
                # Look for the parent container that might have location data
                parent_container = result_div.find_parent('div', class_=re.compile(r'results_cell'))
                
                branch_location = "Houston Public Library"
                call_number = ""
                
                # Try to find location in availability section
                if parent_container:
                    # Look for hidden fields or availability data
                    location_divs = parent_container.find_all('div', class_=re.compile(r'LOCATION|CUSTOM_LOCATION'))
                    for loc_div in location_divs:
                        loc_text = loc_div.get_text(strip=True)
                        if loc_text and loc_text != "LIBTHINGS":
                            branch_location = loc_text
                            break
                
                item = {
                    'id': item_id,
                    'copyId': f"{item_id}-{rw + idx + 1}",  # Unique ID for this copy
                    'name': title,
                    'category': categorize_item(title),
                    'publication': publication,
                    'branchLocation': branch_location,
                    'callNumber': call_number,
                    'rowPosition': rw + idx + 1,
                    'reserveUrl': reserve_url
                }
                
                items.append(item)
                print(f"  ✓ [{rw + idx + 1}] {title} (ID: {item_id})")
                
            except Exception as e:
                print(f"  ⚠️  Error extracting item: {e}")
                continue
        
        return items
        
    except Exception as e:
        print(f"  ❌ Error loading page rw={rw}: {e}")
        return []

def scrape_all_pages():
    """Scrape all pages to get all 317 individual copies"""
    all_items = []
    
    print("=" * 70)
    print("HOUSTON PUBLIC LIBRARY - ALL 317 INDIVIDUAL COPIES SCRAPER")
    print("=" * 70)
    print(f"\n🚀 Starting scrape of {len(ROW_STARTS)} pages...")
    print("=" * 70)
    
    for page_num, rw in enumerate(ROW_STARTS, 1):
        items = scrape_page(rw)
        all_items.extend(items)
        
        print(f"Page {page_num}/{len(ROW_STARTS)} complete. Total items: {len(all_items)}")
        
        # Be polite - wait between requests
        if page_num < len(ROW_STARTS):
            time.sleep(1)
    
    return all_items

def save_results(items, filename='houston_all_317_copies.json'):
    """Save results to JSON file"""
    data = {
        'scrapedDate': datetime.now().isoformat(),
        'totalCopies': len(items),
        'source': 'Houston Public Library - Library of Things (All Individual Copies)',
        'items': items
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Saved {len(items)} individual copies to {filename}")
    
    # Show statistics
    categories = {}
    unique_titles = set()
    for item in items:
        cat = item.get('category', 'Unknown')
        categories[cat] = categories.get(cat, 0) + 1
        unique_titles.add(item['name'])
    
    print("\n📊 Statistics:")
    print(f"   Total individual copies: {len(items)}")
    print(f"   Unique titles: {len(unique_titles)}")
    
    print("\nBreakdown by category:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count}")

if __name__ == '__main__':
    items = scrape_all_pages()
    save_results(items)
    
    print("\n" + "=" * 70)
    print(f"🎉 SCRAPING COMPLETE! Collected {len(items)} individual copies")
    print("=" * 70)
