#!/usr/bin/env python3
"""
Houston Public Library - Library of Things Scraper (Playwright Version)
Uses browser automation to handle JavaScript-rendered pagination
"""

import json
import re
import time
from datetime import datetime
from playwright.sync_api import sync_playwright

BASE_URL = "https://halan.sdp.sirsi.net/client/en_US/hou/search/results"
TOTAL_PAGES = 27

def extract_item_id(url):
    """Extract item ID from URL"""
    match = re.search(r'SD_ILS:(\d+)', url)
    return match.group(1) if match else None

def categorize_item(item_name):
    """Categorize items based on keywords"""
    name_lower = item_name.lower()
    
    if any(word in name_lower for word in ['craft', 'sumi-e', 'cookie cutter', 'mindfulness', 'kit']):
        return 'Crafts & Hobbies'
    elif any(word in name_lower for word in ['tool', 'scanner', 'obd2', 'bicycle repair', 'repair kit']):
        return 'Tools & Equipment'
    elif any(word in name_lower for word in ['handbell', 'musical', 'instrument']):
        return 'Musical Instruments'
    elif any(word in name_lower for word in ['tonie', 'book club', 'kit']):
        return 'Educational Kits'
    elif any(word in name_lower for word in ['chess', 'game', 'puzzle']):
        return 'Games & Puzzles'
    else:
        return 'Other'

def scrape_page_with_playwright(page, page_num):
    """Scrape a single page using Playwright"""
    url = f"{BASE_URL}?lm=LIBTHINGS&ps=12&pg={page_num}"
    
    print(f"\nScraping page {page_num}...")
    
    try:
        # Navigate to the page
        page.goto(url, wait_until='networkidle', timeout=30000)
        
        # Wait for items to load - try multiple selectors
        try:
            page.wait_for_selector('a.displayDetailLink', timeout=10000)
        except:
            print(f"  ⚠️  No items found with displayDetailLink selector, trying alternatives...")
            try:
                page.wait_for_selector('[class*="detail"]', timeout=5000)
            except:
                print(f"  ❌ No items found on page {page_num}")
                return []
        
        # Give JavaScript time to fully render
        time.sleep(2)
        
        # Extract all item links
        items = []
        
        # Try primary selector
        item_elements = page.query_selector_all('a.displayDetailLink')
        
        if not item_elements:
            # Try alternative selectors
            item_elements = page.query_selector_all('[class*="displayDetail"]')
        
        for element in item_elements:
            try:
                # Get the link and title
                href = element.get_attribute('href')
                title = element.inner_text().strip()
                
                if not title or not href:
                    continue
                
                # Extract additional metadata from the item card
                item_id = extract_item_id(href)
                
                # Try to find publication info, format, holds
                parent = element.evaluate('el => el.closest(".displayDetailResult") || el.closest("[class*=\'result\']")')
                
                publication_info = ""
                format_info = ""
                holds_count = 0
                
                # Try to extract metadata from parent element
                if parent:
                    text_content = page.evaluate('el => el.textContent', parent)
                    
                    # Extract publication year
                    pub_match = re.search(r'(\d{4})', text_content)
                    if pub_match:
                        publication_info = pub_match.group(1)
                    
                    # Extract format
                    if 'Kit' in text_content or 'kit' in text_content:
                        format_info = "Kit"
                    elif 'Tool' in text_content:
                        format_info = "Tool"
                    elif 'Instrument' in text_content:
                        format_info = "Instrument"
                    
                    # Extract holds
                    holds_match = re.search(r'(\d+)\s+hold', text_content, re.IGNORECASE)
                    if holds_match:
                        holds_count = int(holds_match.group(1))
                
                # Build the full reserve URL
                reserve_url = f"https://halan.sdp.sirsi.net{href}" if href.startswith('/') else href
                
                item = {
                    'id': item_id,
                    'name': title,
                    'category': categorize_item(title),
                    'publicationInfo': publication_info,
                    'format': format_info,
                    'holds': holds_count,
                    'reserveUrl': reserve_url
                }
                
                items.append(item)
                print(f"  ✓ {title}")
                
            except Exception as e:
                print(f"  ⚠️  Error extracting item: {e}")
                continue
        
        print(f"Page {page_num}/{TOTAL_PAGES} complete. Found {len(items)} items.")
        return items
        
    except Exception as e:
        print(f"  ❌ Error loading page {page_num}: {e}")
        return []

def scrape_all_pages():
    """Scrape all pages using Playwright"""
    all_items = []
    
    print("=" * 60)
    print("HOUSTON PUBLIC LIBRARY - LIBRARY OF THINGS SCRAPER")
    print("Playwright Browser Automation Version")
    print("=" * 60)
    print(f"\n🚀 Starting comprehensive scrape of {TOTAL_PAGES} pages...")
    print("=" * 60)
    
    with sync_playwright() as p:
        # Launch browser (headless mode for efficiency)
        browser = p.chromium.launch(headless=True)
        
        # Create a new page
        page = browser.new_page()
        
        # Set a reasonable viewport
        page.set_viewport_size({"width": 1920, "height": 1080})
        
        try:
            for page_num in range(1, TOTAL_PAGES + 1):
                items = scrape_page_with_playwright(page, page_num)
                all_items.extend(items)
                
                print(f"Total items so far: {len(all_items)}")
                
                # Be polite - wait between pages
                if page_num < TOTAL_PAGES:
                    time.sleep(1)
            
        finally:
            browser.close()
    
    return all_items

def save_results(items, filename='houston_library_items_playwright.json'):
    """Save results to JSON file"""
    data = {
        'scrapedDate': datetime.now().isoformat(),
        'totalItems': len(items),
        'source': 'Houston Public Library - Library of Things',
        'scraper': 'Playwright Browser Automation',
        'items': items
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Saved {len(items)} items to {filename}")
    
    # Show category breakdown
    categories = {}
    for item in items:
        cat = item.get('category', 'Unknown')
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\nBreakdown by category:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count}")
    
    # Show unique items count
    unique_names = set(item['name'] for item in items)
    print(f"\n📊 Unique items: {len(unique_names)}")
    if len(unique_names) < len(items):
        print(f"   (Found {len(items) - len(unique_names)} duplicates)")

if __name__ == '__main__':
    items = scrape_all_pages()
    save_results(items)
    
    print("\n" + "=" * 60)
    print(f"🎉 SCRAPING COMPLETE! Total items collected: {len(items)}")
    print("=" * 60)
