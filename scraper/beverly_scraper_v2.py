#!/usr/bin/env python3
"""
Beverly Public Library scraper - Version 2
Scrapes physical Library of Things items from their catalog system
"""

import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import time
import re

# Category catalog URLs from the Library of Things page
CATEGORIES = {
    "Kids": "https://beverly.noblenet.org/MyAccount/MyList/363",
    "Puzzles & Games": "https://beverly.noblenet.org/MyAccount/MyList/365?pageSize=100",
    "Crafts": "https://beverly.noblenet.org/MyAccount/MyList/359?pageSize=100",
    "Music & Instruments": "https://beverly.noblenet.org/MyAccount/MyList/364?pageSize=100",
    "Science & Technology": "https://beverly.noblenet.org/MyAccount/MyList/366?pageSize=100",
    "Home Equipment": "https://beverly.noblenet.org/MyAccount/MyList/362?pageSize=100",
    "Health & Wellness": "https://beverly.noblenet.org/MyAccount/MyList/361?pageSize=100",
    "Farms Branch": "https://beverly.noblenet.org/MyAccount/MyList/360?pageSize=100",
}

# In-library use only items (manually extracted from the page)
IN_LIBRARY_ITEMS = [
    {
        "name": "Chromebook",
        "category": "Technology",
        "description": "Borrow a Chromebook for use inside the library.",
        "location": "Main Library - Reference Desk",
        "in_library_only": True
    },
    {
        "name": "Grabber Tool",
        "category": "Tools",
        "description": "32\" reacher grabber tool",
        "location": "Main Library - Reference Desk",
        "in_library_only": True
    },
    {
        "name": "Large Print Keyboard",
        "category": "Technology",
        "description": "Backlit large print keyboard",
        "location": "Main Library - Reference Desk",
        "in_library_only": True
    },
    {
        "name": "Magnifying Glass",
        "category": "Tools",
        "description": "30x handheld magnifier with light",
        "location": "Main Library - Reference Desk",
        "in_library_only": True
    },
    {
        "name": "Memory Card Reader-Writer",
        "category": "Technology",
        "description": "Universal Memory Bank, 56-in-1 memory card reader/writer",
        "location": "Main Library - Reference Desk",
        "in_library_only": True
    },
    {
        "name": "Phone Chargers",
        "category": "Technology",
        "description": "Apple Watch, iPhone, iPad, Android, micro USB, USB-A and USB-C chargers",
        "location": "Main Library - Reference Desk",
        "in_library_only": True
    },
    {
        "name": "Tabletop Magnifier",
        "category": "Tools",
        "description": "5x hands-free full page magnifier",
        "location": "Main Library - Reference Desk",
        "in_library_only": True
    }
]


def categorize_item(name, original_category=None):
    """Map items to our standard categories"""
    name_lower = name.lower()
    
    # Use original category mapping first
    if original_category:
        cat_lower = original_category.lower()
        if 'kid' in cat_lower or 'child' in cat_lower:
            return "Educational Kits"
        if 'game' in cat_lower or 'puzzle' in cat_lower:
            return "Games & Recreation"
        if 'craft' in cat_lower or 'art' in cat_lower:
            return "Arts & Crafts"
        if 'music' in cat_lower or 'instrument' in cat_lower:
            return "Musical Instruments"
        if 'tech' in cat_lower or 'science' in cat_lower:
            return "Technology"
        if 'home' in cat_lower or 'equipment' in cat_lower:
            return "Home & Kitchen"
        if 'health' in cat_lower or 'wellness' in cat_lower:
            return "Sports & Outdoors"
    
    # Name-based categorization
    if any(word in name_lower for word in ['game', 'puzzle', 'chess', 'monopoly', 'cards']):
        return "Games & Recreation"
    if any(word in name_lower for word in ['guitar', 'piano', 'drum', 'ukulele', 'instrument', 'keyboard']):
        return "Musical Instruments"
    if any(word in name_lower for word in ['craft', 'sewing', 'knit', 'paint', 'art', 'create']):
        return "Arts & Crafts"
    if any(word in name_lower for word in ['camera', 'projector', 'laptop', 'tablet', 'chromebook', 'tech', 'digital']):
        return "Technology"
    if any(word in name_lower for word in ['tool', 'drill', 'saw', 'wrench', 'hammer']):
        return "Tools & Equipment"
    if any(word in name_lower for word in ['cake', 'pan', 'kitchen', 'cook', 'bake', 'food']):
        return "Home & Kitchen"
    if any(word in name_lower for word in ['tent', 'camping', 'hike', 'bike', 'sport', 'fitness', 'yoga', 'wellness']):
        return "Sports & Outdoors"
    if any(word in name_lower for word in ['science', 'telescope', 'microscope', 'learn', 'educational']):
        return "Educational Kits"
    
    return "Other"


def scrape_catalog_page(category_name, url):
    """Scrape items from a catalog page"""
    print(f"\nScraping category: {category_name}")
    print(f"URL: {url}")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Save page for debugging
        filename = f"beverly_{category_name.replace(' ', '_').replace('&', 'and').lower()}.html"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(response.text)
        print(f"  ✓ Saved page to {filename}")
        
        soup = BeautifulSoup(response.text, 'html.parser')
        items = []
        
        # Find all result items in the catalog
        # Try different possible selectors
        result_items = soup.find_all('div', class_=re.compile(r'result|item|record|row'))
        if not result_items:
            result_items = soup.find_all('tr', class_=re.compile(r'result|item|record'))
        
        print(f"  Found {len(result_items)} potential items")
        
        for result in result_items[:20]:  # Limit to first 20 per category
            try:
                # Extract title
                title_elem = result.find(['a', 'h2', 'h3', 'span'], class_=re.compile(r'title|name'))
                if not title_elem:
                    title_elem = result.find('a', href=re.compile(r'/Record/'))
                if not title_elem:
                    continue
                
                name = title_elem.get_text(strip=True)
                if not name or len(name) < 3:
                    continue
                
                # Extract detail URL
                detail_url = ""
                if title_elem.name == 'a':
                    detail_url = title_elem.get('href', '')
                    if detail_url and not detail_url.startswith('http'):
                        detail_url = 'https://beverly.noblenet.org' + detail_url
                
                # Extract image
                image_url = ""
                img = result.find('img')
                if img:
                    image_url = img.get('src', '')
                    if image_url and not image_url.startswith('http') and not image_url.startswith('data:'):
                        image_url = 'https://beverly.noblenet.org' + image_url
                
                # Extract description
                description = ""
                desc_elem = result.find(['p', 'div'], class_=re.compile(r'description|summary|note'))
                if desc_elem:
                    description = desc_elem.get_text(strip=True)
                
                item = {
                    "name": name,
                    "category": categorize_item(name, category_name),
                    "original_category": category_name,
                    "description": description,
                    "image_url": image_url,
                    "detail_url": detail_url,
                    "total_copies": 1,  # Default, would need detail page to get actual count
                    "in_library_only": False
                }
                
                items.append(item)
                print(f"    ✓ {name}")
                
            except Exception as e:
                continue
        
        return items
        
    except Exception as e:
        print(f"  ✗ Error scraping {category_name}: {e}")
        return []


def main():
    print("Starting Beverly Public Library scrape...")
    print("=" * 60)
    
    all_items = []
    category_counts = {}
    
    # Scrape catalog categories
    for category_name, url in CATEGORIES.items():
        items = scrape_catalog_page(category_name, url)
        all_items.extend(items)
        time.sleep(2)  # Be polite
    
    # Add in-library only items
    print(f"\nAdding {len(IN_LIBRARY_ITEMS)} in-library only items...")
    all_items.extend(IN_LIBRARY_ITEMS)
    
    # Count items by category
    for item in all_items:
        cat = item['category']
        category_counts[cat] = category_counts.get(cat, 0) + 1
    
    # Create output
    output = {
        "library": "Beverly Public Library",
        "scraped_at": datetime.now().isoformat(),
        "total_items": len(all_items),
        "items": all_items,
        "categories": category_counts
    }
    
    # Save to file
    output_file = "beverly_data_v2.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 60)
    print("Scraping complete!")
    print(f"Total items scraped: {len(all_items)}")
    print(f"\nBreakdown by category:")
    for cat, count in sorted(category_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"  {cat}: {count}")
    print(f"\nResults saved to: {output_file}")
    print("=" * 60)


if __name__ == "__main__":
    main()
