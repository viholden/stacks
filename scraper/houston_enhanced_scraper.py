#!/usr/bin/env python3
"""
Houston Public Library - Enhanced Scraper
Scrapes all 317 items with:
- Real images from detail pages
- Real descriptions from detail pages  
- Copy counts and holds information
"""

import json
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time
from urllib.parse import urljoin, urlparse

BASE_URL = "https://halan.sdp.sirsi.net/client/en_US/hou/search/results"
DETAIL_BASE = "https://halan.sdp.sirsi.net"

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
    
    # Educational Kits
    if any(word in name_lower for word in ['tonie', 'yoto', 'discovery kit', 'book club', 
                                            'magna-tile', 'osmo', 'coding critter', 
                                            'robot mouse', 'owl pellet', 'ozobot', 'cubelets']):
        return 'Educational Kits'
    # Musical Instruments
    elif any(word in name_lower for word in ['musical instrument', 'handbell', 'ukulele', 
                                              'banjo', 'mandolin', 'keyboard', 'otamatone',
                                              'autoharp', 'guitar', 'singing bowl', 'steel tongue drum']):
        return 'Musical Instruments'
    # Games & Puzzles
    elif any(word in name_lower for word in ['chess', 'game', 'puzzle', 'sum swamp', 'mahjong',
                                              'catan', 'pandemic', 'ticket to ride',
                                              'money bunch', 'pete the cat', 'bears in pairs']):
        return 'Games & Puzzles'
    # Crafts & Hobbies  
    elif any(word in name_lower for word in ['craft', 'sumi-e', 'cookie cutter', 'mindfulness',
                                              'watercolor', 'wood carving', 'bird watching',
                                              'ghost hunting', 'yarn winding', 'magnet fishing']):
        return 'Crafts & Hobbies'
    # Tools & Equipment
    elif any(word in name_lower for word in ['tool', 'scanner', 'obd2', 'bicycle', 'repair',
                                              'screwdriver', 'multimeter', 'stud finder',
                                              'laser measure', 'metal detector', 'drill']):
        return 'Tools & Equipment'
    # Everything else (mostly bakeware, cake pans, etc)
    else:
        return 'Other'

def scrape_item_details(detail_url):
    """
    Scrape detailed information from an item's detail page
    Returns: {image_url, description, copies_available, total_copies, holds}
    """
    try:
        print(f"  Fetching details from: {detail_url[:80]}...")
        response = requests.get(detail_url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract image
        image_url = None
        img_tag = soup.find('img', class_=re.compile(r'jacketCover|cover'))
        if not img_tag:
            # Try different selectors
            img_tag = soup.find('img', id=re.compile(r'jacket|cover', re.I))
        if img_tag:
            image_url = img_tag.get('src', '')
            if image_url and not image_url.startswith('http'):
                image_url = urljoin(DETAIL_BASE, image_url)
        
        # Extract description/summary
        description = ""
        # Look for summary or description div
        desc_div = soup.find('div', class_=re.compile(r'summary|description', re.I))
        if desc_div:
            description = desc_div.get_text(strip=True)
        else:
            # Try finding in display details
            display_details = soup.find_all('div', class_='displayDetailLink')
            for detail in display_details:
                text = detail.get_text(strip=True)
                if len(text) > 50:  # Likely a description
                    description = text
                    break
        
        # Extract copies and holds information
        copies_available = 0
        total_copies = 0
        holds = 0
        
        # Look for item status table
        status_table = soup.find('table', id=re.compile(r'item.*status', re.I))
        if not status_table:
            status_table = soup.find('table', class_=re.compile(r'item.*table', re.I))
        
        if status_table:
            # Count rows to get total copies
            rows = status_table.find_all('tr')[1:]  # Skip header
            total_copies = len(rows)
            
            # Count available copies (look for "Available" status)
            for row in rows:
                status_cell = row.find('td', class_=re.compile(r'status', re.I))
                if status_cell:
                    status_text = status_cell.get_text(strip=True).lower()
                    if 'available' in status_text or 'on shelf' in status_text:
                        copies_available += 1
        
        # Look for holds count
        holds_div = soup.find('div', string=re.compile(r'hold', re.I))
        if holds_div:
            holds_text = holds_div.get_text()
            holds_match = re.search(r'(\d+)\s*hold', holds_text, re.I)
            if holds_match:
                holds = int(holds_match.group(1))
        
        return {
            'image_url': image_url,
            'description': description,
            'copies_available': copies_available,
            'total_copies': total_copies,
            'holds': holds
        }
        
    except Exception as e:
        print(f"  Error fetching details: {e}")
        return {
            'image_url': None,
            'description': "",
            'copies_available': 0,
            'total_copies': 0,
            'holds': 0
        }

def scrape_page(rw):
    """Scrape a single page using the rw (row start) parameter"""
    url = f"{BASE_URL}?lm=LIBTHINGS&isd=true&rw={rw}"
    
    print(f"\nScraping page (items {rw + 1}-{rw + 12})...")
    
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
                
                # Build detail URL
                if href.startswith('/'):
                    detail_url = f"{DETAIL_BASE}{href}"
                else:
                    detail_url = href
                
                # Add isd=true parameter if not present
                if 'isd=true' not in detail_url:
                    detail_url += '&isd=true' if '?' in detail_url else '?isd=true'
                
                # Build reserve URL
                reserve_url = detail_url
                if 'lm=LIBTHINGS' not in reserve_url:
                    reserve_url += '&lm=LIBTHINGS'
                
                # Get category
                category = categorize_item(title)
                
                # Scrape detailed information
                details = scrape_item_details(detail_url)
                
                # Create item record
                item = {
                    'copyId': f"{item_id}-{rw + idx}",
                    'itemId': item_id,
                    'name': title,
                    'category': category,
                    'image': details['image_url'],
                    'description': details['description'],
                    'copiesAvailable': details['copies_available'],
                    'totalCopies': details['total_copies'],
                    'holds': details['holds'],
                    'branchLocation': 'Houston Public Library',
                    'rowPosition': rw + idx,
                    'reserveUrl': reserve_url
                }
                
                items.append(item)
                print(f"  ✓ {title[:50]}... (copies: {details['copies_available']}/{details['total_copies']}, holds: {details['holds']})")
                
                # Be nice to the server
                time.sleep(1)
                
            except Exception as e:
                print(f"  Error processing item: {e}")
                continue
        
        return items
        
    except Exception as e:
        print(f"Error scraping page: {e}")
        return []

def main():
    """Main scraping function"""
    print("=" * 80)
    print("Houston Public Library - Enhanced Scraper")
    print("Scraping all 317 items with images, descriptions, copies, and holds")
    print("=" * 80)
    
    all_items = []
    
    for rw in ROW_STARTS:
        page_items = scrape_page(rw)
        all_items.extend(page_items)
        
        # Progress update
        print(f"\nProgress: {len(all_items)}/317 items scraped")
        
        # Longer pause between pages
        time.sleep(2)
    
    # Save results
    output_file = 'houston_enhanced_data.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_items, f, indent=2, ensure_ascii=False)
    
    # Summary statistics
    print("\n" + "=" * 80)
    print("SCRAPING COMPLETE!")
    print("=" * 80)
    print(f"Total items scraped: {len(all_items)}")
    print(f"Output file: {output_file}")
    
    # Category breakdown
    categories = {}
    items_with_images = 0
    items_with_descriptions = 0
    
    for item in all_items:
        cat = item['category']
        categories[cat] = categories.get(cat, 0) + 1
        if item['image']:
            items_with_images += 1
        if item['description']:
            items_with_descriptions += 1
    
    print("\nCategory breakdown:")
    for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
        print(f"  {cat}: {count}")
    
    print(f"\nItems with images: {items_with_images}/{len(all_items)}")
    print(f"Items with descriptions: {items_with_descriptions}/{len(all_items)}")
    
    # Sample item
    if all_items:
        print("\nSample item:")
        print(json.dumps(all_items[0], indent=2))

if __name__ == "__main__":
    main()
