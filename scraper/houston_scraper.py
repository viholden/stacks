#!/usr/bin/env python3
"""
Houston Public Library "Library of Things" Comprehensive Scraper
Extracts all 317 items with complete metadata
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from urllib.parse import urljoin

# Configuration
BASE_URL = "https://halan.sdp.sirsi.net/client/en_US/hou/search/results"
PARAMS_TEMPLATE = {
    "lm": "LIBTHINGS",
    "ps": "12",  # 12 items per page
    "pg": None   # Will be set for each page
}

def scrape_page(page_num):
    """Scrape a single page of results"""
    print(f"Scraping page {page_num}...")
    
    params = PARAMS_TEMPLATE.copy()
    params["pg"] = str(page_num)
    
    try:
        response = requests.get(BASE_URL, params=params, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        items = []
        
        # Try multiple strategies to find item entries
        # Strategy 1: Look for links with class 'displayDetailLink'
        result_items = soup.find_all('a', class_='displayDetailLink')
        
        if not result_items:
            # Strategy 2: Look for any links in div with results
            results_div = soup.find('div', class_='results_wrapper') or soup.find('div', id='results_wrapper')
            if results_div:
                result_items = results_div.find_all('a', href=re.compile(r'/search/detailnonmodal/'))
        
        for idx, item_link in enumerate(result_items, 1):
            try:
                # Extract item name/title from link text
                title = item_link.get_text(strip=True)
                link = item_link.get('href', '')
                
                # Skip if no title or link
                if not title or not link:
                    continue
                
                # Extract item ID from URL
                item_id_match = re.search(r'SD_ILS:(\d+)', link)
                item_id = item_id_match.group(1) if item_id_match else None
                
                # Build full URL
                full_url = urljoin("https://halan.sdp.sirsi.net", link) if link else None
                
                # Try to find the parent container for more metadata
                parent = item_link.find_parent('div', class_='resultitem') or item_link.find_parent('div')
                
                # Extract publication/format info
                pub_info = ""
                format_info = ""
                
                if parent:
                    # Look for publication
                    pub_search = parent.find(string=re.compile(r'Publication:', re.IGNORECASE))
                    if pub_search:
                        pub_elem = pub_search.find_next()
                        if pub_elem:
                            pub_info = pub_elem.get_text(strip=True)
                    
                    # Look for format
                    fmt_search = parent.find(string=re.compile(r'Format:', re.IGNORECASE))
                    if fmt_search:
                        fmt_elem = fmt_search.find_next()
                        if fmt_elem:
                            format_info = fmt_elem.get_text(strip=True)
                    
                    # Extract holds
                    holds_search = parent.find(string=re.compile(r'Holds:', re.IGNORECASE))
                    holds = None
                    if holds_search:
                        holds_elem = holds_search.find_next()
                        if holds_elem:
                            holds_text = holds_elem.get_text(strip=True)
                            holds_match = re.search(r'(\d+)', holds_text)
                            if holds_match:
                                holds = int(holds_match.group(1))
                
                item_data = {
                    "id": item_id,
                    "name": title,
                    "publication": pub_info,
                    "format": format_info if format_info else "Library of Things",
                    "holds": holds,
                    "reserveUrl": full_url,
                    "page": page_num
                }
                
                items.append(item_data)
                print(f"  ✓ {title[:50]}")
                
            except Exception as e:
                print(f"  ✗ Error parsing item: {e}")
                continue
        
        return items
        
    except Exception as e:
        print(f"  ✗ Error scraping page {page_num}: {e}")
        return []

def scrape_all_pages(total_pages=27):
    """Scrape all pages and compile complete dataset"""
    all_items = []
    
    print(f"\n🚀 Starting comprehensive scrape of {total_pages} pages...")
    print("=" * 60)
    
    for page in range(1, total_pages + 1):
        items = scrape_page(page)
        all_items.extend(items)
        
        # Be polite - don't hammer the server
        time.sleep(1)
        
        print(f"Page {page}/{total_pages} complete. Total items: {len(all_items)}\n")
    
    return all_items

def categorize_item(item):
    """Infer category from item name and format"""
    name_lower = item['name'].lower()
    
    if any(word in name_lower for word in ['book club', 'book kit']):
        return 'Educational Kits'
    elif any(word in name_lower for word in ['tonie', 'audio', 'speaker']):
        return 'Educational Kits'
    elif any(word in name_lower for word in ['cookie', 'cake', 'baking', 'pan']):
        return 'Crafts & Hobbies'
    elif any(word in name_lower for word in ['craft', 'hobby', 'sewing', 'sumi']):
        return 'Crafts & Hobbies '
    elif any(word in name_lower for word in ['tool', 'scanner', 'obd', 'repair', 'drill']):
        return 'Tools & Equipment'
    elif any(word in name_lower for word in ['hotspot', 'wifi', 'tablet', 'laptop', 'projector']):
        return 'Technology'
    elif any(word in name_lower for word in ['guitar', 'ukulele', 'keyboard', 'drum', 'handbell', 'instrument']):
        return 'Musical Instruments'
    elif any(word in name_lower for word in ['chess', 'game', 'puzzle']):
        return 'Games & Puzzles'
    elif any(word in name_lower for word in ['GoPro', 'camera', 'video']):
        return 'Technology'
    else:
        return 'Educational Kits'

def save_results(items, filename='houston_library_items.json'):
    """Save scraped data to JSON file"""
    
    # Add categories and clean data
    for idx, item in enumerate(items, start=100):  # Start from ID 100 to avoid conflicts
        item['generatedId'] = f"hou_{idx}"
        item['category'] = categorize_item(item)
        item['libraryName'] = 'Houston Public Library'
    
    output = {
        "totalItems": len(items),
        "scrapedDate": time.strftime("%Y-%m-%d %H:%M:%S"),
        "items": items
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Saved {len(items)} items to {filename}")
    print(f"\nBreakdown by category:")
    
    categories = {}
    for item in items:
        cat = item.get('category', 'Unknown')
        categories[cat] = categories.get(cat, 0) + 1
    
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count}")

if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("HOUSTON PUBLIC LIBRARY - LIBRARY OF THINGS SCRAPER")
    print("=" * 60)
    
    # Scrape all pages
    items = scrape_all_pages(total_pages=27)
    
    # Save results
    save_results(items)
    
    print("\n" + "=" * 60)
    print(f"🎉 SCRAPING COMPLETE! Total items collected: {len(items)}")
    print("=" * 60 + "\n")
