#!/usr/bin/env python3
"""
Houston Public Library - Library of Things Scraper (Optimized Single Request)
Request all items at once with ps=500
"""

import json
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime

BASE_URL = "https://halan.sdp.sirsi.net/client/en_US/hou/search/results"

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

def scrape_all_items():
    """Scrape all items in a single request"""
    # Request with high page size to get all items at once
    url = f"{BASE_URL}?lm=LIBTHINGS&ps=500"
    
    print("=" * 60)
    print("HOUSTON PUBLIC LIBRARY - LIBRARY OF THINGS SCRAPER")
    print("Optimized Single-Request Version")
    print("=" * 60)
    print(f"\n🚀 Fetching all items from: {url}")
    print("=" * 60)
    
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all item links
        item_links = soup.find_all('a', class_='displayDetailLink')
        
        print(f"\n✓ Found {len(item_links)} item links")
        
        items = []
        seen_ids = set()
        
        for link in item_links:
            try:
                title = link.get_text(strip=True)
                href = link.get('href', '')
                
                if not title or not href:
                    continue
                
                item_id = extract_item_id(href)
                
                # Skip duplicates
                if item_id in seen_ids:
                    continue
                seen_ids.add(item_id)
                
                # Try to find the parent container for metadata
                parent = link.find_parent('div', class_=re.compile(r'displayDetail'))
                
                publication_info = ""
                format_info = ""
                holds_count = 0
                
                if parent:
                    text = parent.get_text()
                    
                    # Extract publication year
                    pub_match = re.search(r'(\d{4})', text)
                    if pub_match:
                        publication_info = pub_match.group(1)
                    
                    # Extract holds
                    holds_match = re.search(r'(\d+)\s+hold', text, re.IGNORECASE)
                    if holds_match:
                        holds_count = int(holds_match.group(1))
                
                # Build full reserve URL
                if href.startswith('/'):
                    reserve_url = f"https://halan.sdp.sirsi.net{href}"
                else:
                    reserve_url = href
                
                # Add lm=LIBTHINGS parameter if not present
                if 'lm=LIBTHINGS' not in reserve_url and '?' in reserve_url:
                    reserve_url += '&lm=LIBTHINGS'
                elif 'lm=LIBTHINGS' not in reserve_url:
                    reserve_url += '?lm=LIBTHINGS'
                
                item = {
                    'id': item_id,
                    'name': title,
                    'category': categorize_item(title),
                    'publicationInfo': publication_info,
                    'holds': holds_count,
                    'reserveUrl': reserve_url
                }
                
                items.append(item)
                print(f"  ✓ {title} (ID: {item_id})")
                
            except Exception as e:
                print(f"  ⚠️  Error extracting item: {e}")
                continue
        
        return items
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return []

def save_results(items, filename='houston_library_all_items.json'):
    """Save results to JSON file"""
    data = {
        'scrapedDate': datetime.now().isoformat(),
        'totalItems': len(items),
        'source': 'Houston Public Library - Library of Things',
        'scraper': 'Optimized Single Request',
        'items': items
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Saved {len(items)} unique items to {filename}")
    
    # Show category breakdown
    categories = {}
    for item in items:
        cat = item.get('category', 'Unknown')
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\nBreakdown by category:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count}")

if __name__ == '__main__':
    items = scrape_all_items()
    save_results(items)
    
    print("\n" + "=" * 60)
    print(f"🎉 SCRAPING COMPLETE! Total unique items: {len(items)}")
    print("=" * 60)
