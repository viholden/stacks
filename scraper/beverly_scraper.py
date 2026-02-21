#!/usr/bin/env python3
"""
Beverly Public Library - Scraper
Scrapes Library of Things from Beverly Public Library
https://beverlypubliclibrary.org/collections/library-of-things/
"""

import json
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time
from urllib.parse import urljoin

BASE_URL = "https://beverlypubliclibrary.org"
MAIN_PAGE = f"{BASE_URL}/collections/library-of-things/"

def categorize_item(item_name):
    """Categorize items based on name"""
    name_lower = item_name.lower()
    
    # Technology
    if any(word in name_lower for word in ['hotspot', 'wifi', 'projector', 'camera', 'gopro', 'laptop', 'tablet', 'kindle', 'ipad', 'chromebook']):
        return 'Technology'
    # Musical Instruments
    elif any(word in name_lower for word in ['guitar', 'ukulele', 'keyboard', 'drum', 'instrument', 'music']):
        return 'Musical Instruments'
    # Games & Entertainment
    elif any(word in name_lower for word in ['game', 'puzzle', 'chess', 'monopoly', 'scrabble', 'playing cards']):
        return 'Games & Entertainment'
    # Cooking & Kitchen
    elif any(word in name_lower for word in ['cake pan', 'baking', 'bundt', 'cookie', 'mixer', 'blender', 'instant pot', 'air fryer', 'waffle', 'kitchen']):
        return 'Cooking & Kitchen'
    # Tools & Equipment
    elif any(word in name_lower for word in ['drill', 'tool', 'scanner', 'detector', 'meter', 'ladder', 'wrench']):
        return 'Tools & Equipment'
    # Outdoor & Recreation
    elif any(word in name_lower for word in ['tent', 'sleeping bag', 'backpack', 'telescope', 'binoculars', 'fishing', 'camping', 'hiking']):
        return 'Outdoor & Recreation'
    # Arts & Crafts
    elif any(word in name_lower for word in ['sewing', 'craft', 'art', 'cricut', 'paint', 'knitting', 'embroidery']):
        return 'Arts & Crafts'
    # Educational
    elif any(word in name_lower for word in ['kit', 'science', 'learn', 'educational', 'discovery', 'stem']):
        return 'Educational Kits'
    else:
        return 'Other'

def scrape_category_page(category_name, category_url):
    """Scrape items from a category page"""
    print(f"\nScraping category: {category_name}")
    print(f"URL: {category_url}")
    
    items = []
    
    try:
        response = requests.get(category_url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all item listings - Beverly library uses different HTML structure
        # Look for article elements, div.collection-item, or similar
        item_elements = soup.find_all(['article', 'div'], class_=re.compile(r'item|product|collection', re.I))
        
        if not item_elements:
            # Try finding by heading tags that might contain item names
            item_elements = soup.find_all(['h2', 'h3', 'h4'], class_=re.compile(r'title|name|heading', re.I))
        
        print(f"  Found {len(item_elements)} potential items")
        
        for elem in item_elements:
            # Extract item name
            name_elem = elem.find(['h1', 'h2', 'h3', 'h4', 'a'])
            if not name_elem:
                name_elem = elem
            
            item_name = name_elem.get_text(strip=True)
            
            # Skip if it's navigation or not an actual item
            if not item_name or len(item_name) < 3 or any(skip in item_name.lower() for skip in ['categories', 'filter', 'search', 'menu', 'home', 'about']):
                continue
            
            # Extract description
            desc_elem = elem.find(['p', 'div'], class_=re.compile(r'desc|summary|content', re.I))
            description = desc_elem.get_text(strip=True) if desc_elem else ""
            
            # Extract image
            img_elem = elem.find('img')
            image_url = ""
            if img_elem:
                image_url = img_elem.get('src', '') or img_elem.get('data-src', '')
                if image_url and not image_url.startswith('http'):
                    image_url = urljoin(BASE_URL, image_url)
            
            # Extract detail link
            detail_link = None
            link_elem = elem.find('a', href=True)
            if link_elem:
                detail_link = link_elem['href']
                if detail_link and not detail_link.startswith('http'):
                    detail_link = urljoin(BASE_URL, detail_link)
            
            item = {
                'name': item_name,
                'category': categorize_item(item_name),
                'original_category': category_name,
                'description': description,
                'image_url': image_url,
                'detail_url': detail_link or category_url,
                'total_copies': 1  # Default to 1 unless we can determine otherwise
            }
            
            items.append(item)
            print(f"    ✓ {item_name[:50]}...")
        
        time.sleep(2)  # Be nice to the server
        
    except Exception as e:
        print(f"  Error scraping {category_name}: {e}")
    
    return items

def scrape_main_page():
    """Scrape the main Library of Things page to find all categories"""
    print("Fetching main page...")
    
    try:
        response = requests.get(MAIN_PAGE, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Save HTML for debugging
        with open('beverly_main_page.html', 'w', encoding='utf-8') as f:
            f.write(response.text)
        print("✓ Saved main page HTML to beverly_main_page.html")
        
        # Look for category links
        # Common patterns: nav links, category cards, collection links
        categories = {}
        
        # Try finding links in navigation or category sections
        category_links = soup.find_all('a', href=re.compile(r'/collections/|/category/|library-of-things', re.I))
        
        for link in category_links:
            link_text = link.get_text(strip=True)
            link_url = link.get('href', '')
            
            if link_url and link_text and len(link_text) > 2:
                # Skip generic links
                if any(skip in link_text.lower() for skip in ['home', 'about', 'contact', 'search', 'all items', 'view all']):
                    continue
                
                full_url = urljoin(BASE_URL, link_url)
                categories[link_text] = full_url
        
        print(f"\nFound {len(categories)} potential categories:")
        for name, url in categories.items():
            print(f"  - {name}: {url}")
        
        return categories
        
    except Exception as e:
        print(f"Error fetching main page: {e}")
        return {}

def scrape_all_items():
    """Main scraping function"""
    print(f"Starting Beverly Public Library scrape...")
    print(f"{'='*60}\n")
    
    # Get categories from main page
    categories = scrape_main_page()
    
    if not categories:
        print("No categories found. Trying direct page scrape...")
        # Fallback: scrape main page directly
        categories = {"Library of Things": MAIN_PAGE}
    
    all_items = []
    
    # Scrape each category
    for category_name, category_url in categories.items():
        items = scrape_category_page(category_name, category_url)
        all_items.extend(items)
    
    return all_items

def save_results(items):
    """Save results to JSON file"""
    output = {
        'library': 'Beverly Public Library',
        'scraped_at': datetime.now().isoformat(),
        'total_items': len(items),
        'items': items,
        'categories': {}
    }
    
    # Count by category
    for item in items:
        category = item.get('category', 'Other')
        output['categories'][category] = output['categories'].get(category, 0) + 1
    
    filename = 'beverly_data.json'
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'='*60}")
    print(f"Scraping complete!")
    print(f"Total items scraped: {len(items)}")
    print(f"\nBreakdown by category:")
    for category, count in sorted(output['categories'].items(), key=lambda x: -x[1]):
        print(f"  {category}: {count}")
    print(f"\nResults saved to: {filename}")
    print(f"{'='*60}")

if __name__ == '__main__':
    items = scrape_all_items()
    if items:
        save_results(items)
    else:
        print("\n⚠ No items found. Check beverly_main_page.html for the page structure.")
