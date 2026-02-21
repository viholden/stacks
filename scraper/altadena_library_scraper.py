#!/usr/bin/env python3
"""
Altadena Library scraper - Library of Things
Info: https://www.altadenalibrary.org/libraryofthings
Catalog: https://catalog.altadenalibrary.org/cgi-bin/koha/opac-search.pl?idx=&q="library+of+things"&weight_search=1
"""

import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import time
import re

CATALOG_URL = 'https://catalog.altadenalibrary.org/cgi-bin/koha/opac-search.pl?idx=&q="library+of+things"&weight_search=1'
BASE_URL = "https://catalog.altadenalibrary.org"


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
    """Scrape items from Altadena Library Koha catalog"""
    print("Starting Altadena Library scrape...")
    print("=" * 60)
    print(f"Fetching catalog: {CATALOG_URL}\n")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(CATALOG_URL, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Save page for debugging
        with open('altadena_library_catalog.html', 'w', encoding='utf-8') as f:
            f.write(response.text)
        print("✓ Saved catalog page to altadena_library_catalog.html\n")
        
        soup = BeautifulSoup(response.text, 'html.parser')
        items = []
        
        # Koha uses specific result classes
        result_items = (
            soup.find_all('tr', class_=re.compile(r'(result|record)')) or
            soup.find_all('div', class_=re.compile(r'(result|record|biblioRecord)')) or
            soup.find_all('table', class_='resultscontrol')
        )
        
        # Also try to find by id patterns
        if not result_items:
            result_items = soup.find_all(id=re.compile(r'(result|record|bib)'))
        
        print(f"Found {len(result_items)} potential items\n")
        
        seen_names = set()
        
        for idx, result in enumerate(result_items[:100], 1):
            try:
                # Extract title - Koha typically uses specific classes
                title_elem = (
                    result.find('a', class_='title') or
                    result.find('a', title=True) or
                    result.find('span', class_='title') or
                    result.find('a', href=re.compile(r'opac-detail'))
                )
                
                if not title_elem:
                    continue
                
                name = title_elem.get_text(strip=True)
                # Clean up Koha formatting
                name = re.sub(r'\s+/', '', name)
                name = re.sub(r'\s+', ' ', name).strip()
                
                if not name or len(name) < 3 or name in seen_names:
                    continue
                
                seen_names.add(name)
                
                # Extract detail URL
                detail_url = ""
                if title_elem.name == 'a':
                    detail_url = title_elem.get('href', '')
                    if detail_url and not detail_url.startswith('http'):
                        if detail_url.startswith('/'):
                            detail_url = BASE_URL + detail_url
                        else:
                            detail_url = BASE_URL + '/cgi-bin/koha/' + detail_url
                
                # Extract image
                image_url = ""
                img = result.find('img', src=True)
                if img:
                    image_url = img.get('src', '')
                    if image_url and not image_url.startswith('http') and not image_url.startswith('data:'):
                        if image_url.startswith('/'):
                            image_url = BASE_URL + image_url
                
                # Extract description/author info
                description = ""
                desc_elem = (
                    result.find('span', class_='results_summary') or
                    result.find('p', class_='summary') or
                    result.find('div', class_='results_summary')
                )
                if desc_elem:
                    description = desc_elem.get_text(strip=True)
                
                item = {
                    "name": name,
                    "category": categorize_item(name, description),
                    "description": description,
                    "image_url": image_url,
                    "detail_url": detail_url,
                    "total_copies": 1
                }
                
                items.append(item)
                print(f"  {idx}. ✓ {name}")
                
            except Exception as e:
                continue
        
        return items
        
    except Exception as e:
        print(f"✗ Error scraping catalog: {e}")
        return []


def main():
    all_items = scrape_catalog()
    
    # Count items by category
    category_counts = {}
    for item in all_items:
        cat = item['category']
        category_counts[cat] = category_counts.get(cat, 0) + 1
    
    # Create output
    output = {
        "library": "Altadena Library",
        "scraped_at": datetime.now().isoformat(),
        "total_items": len(all_items),
        "items": all_items,
        "categories": category_counts
    }
    
    # Save to file
    output_file = "altadena_library_data.json"
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
