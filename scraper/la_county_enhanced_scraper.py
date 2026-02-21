#!/usr/bin/env python3
"""
LA County Library - Enhanced Scraper
Scrapes all items from the Tool Lending Library with:
- Real images from detail pages
- Real descriptions (Physical Description)
- Copy counts and availability information
- Subject terms and notes
"""

import json
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time
from urllib.parse import urljoin, quote

# LA County Library catalog base URLs
CATALOG_BASE = "https://catalog.lacountylibrary.org"
SEARCH_BASE = f"{CATALOG_BASE}/client/en_US/default/search/results"

# Comprehensive tool list from LA County Library
TOOLS_LIST = [
    # POWER TOOLS
    "Cordless drill driver", "Drill & screwdriver bit set", "Orbital sander", 
    "Belt sander", "Power washer",
    
    # HAND TOOLS
    "Claw hammer", "Ball pein hammer", "Dead blow hammer", "Rubber mallet", 
    "Awl", "Nail puller", "Nail set / punches", "Pocket screwdriver", 
    "Screwdriver set", "Precision screwdriver set", "Screw extractor set",
    "Drill bit set", "Socket set", "Adjustable wrench", "Monkey wrench",
    "Wood chisel set", "Staple gun", "Plier set 1", "Plier set 2",
    "Bolt cutter, 24 in.", "Bolt cutter, 14 in.", "Cable cutter",
    "Plier (tongue & groove) – 12 in.", 
    "Pliers (tongue & groove) – 9.5 in. and 6.5 in.",
    "Hex key set", "Magnet, retrieving", "Light bulb changer kit",
    
    # MEASURING AND LAYOUT
    "Stud finder / Stud sensor", "Tape measure", "Laser level", 
    "48 in. level", "24 in. level", "T-Square", "Square – combination",
    "Square – rafter", "Square – universal square", "Contour marking gauge",
    "Caliper, digital",
    
    # CLAMPS AND JIGS
    "Trigger clamp", "Bar clamp", "C-clamp", "3-way edging clamp",
    "Spring clamp", "Locking pliers, Vise grip", "Hand screw clamp",
    "Assembly square", "Angle clamp", "Pocket hole jig",
    
    # TECHNOLOGY
    "DVD Player",
    
    # MUSICAL INSTRUMENTS
    "Acoustic Guitars", "Keyboards", "Electronic Drum Kits",
    
    # ELECTRICAL
    "Extension cord – 25 feet", "Extension cord – 50 feet", 
    "Extension cord – 100 feet", "Work light, LED", "Circuit breaker finder",
    "Multimeter", "Voltage detector", "Armored cable cutter",
    "Wire stripper / cutter", "Cable / wire tacker",
    
    # GARDENING AND DIGGING
    "Pruning shears", "Trowel", "Bulb planter", "Garden hoe", 
    "Seed spreader", "Shovel", "Fruit picker", "Tamper",
    
    # BIKE REPAIR
    "Bike repair kit", "Bike pump", "Bike repair stand",
    
    # SEWING AND CLOTHING REPAIR
    "Sewing machine", "Sewing machine presser feet", "Seam ripper set",
    "Fabric scissors", "Thread snips", "Cutting mat", "Buttonhole cutter",
    "Turner and pressing tool", "Tailors clapper", "Pressing ham",
    "Garment steamer", "Mending Kit",
    
    # COOKING AND BAKING
    "6 in. round cake pan", "8 in. round cake pan", "9 in. round cake pan",
    "8 in. square cake pan", "9 in. x 13 in. cake pan",
    "Heart shaped cake pan, 10 in.", "10 in. springform cake pan",
    "Muffin tin", "Bundt cake pan", "Cookie cutters", "Hand mixer",
    
    # CRAFTING AND CREATING
    "Hot glue gun", "Engraving tool", "Cricut Explore Air 2",
    "Cricut basic tool set", "Jewelry making tool kit",
    
    # AUTO REPAIR
    "Auto engine code reader", "Oil filter wrench", "Wrench set",
    "Ratchet and socket set", "Pry bar set", "Portable work light"
]

def categorize_item(item_name):
    """Categorize items based on type"""
    name_lower = item_name.lower()
    
    # Musical Instruments
    if any(word in name_lower for word in ['guitar', 'keyboard', 'drum', 'musical']):
        return 'Musical Instruments'
    # Technology
    elif any(word in name_lower for word in ['dvd player', 'cricut', 'code reader', 'multimeter']):
        return 'Technology'
    # Power Tools
    elif any(word in name_lower for word in ['drill', 'sander', 'washer', 'power']):
        return 'Power Tools'
    # Electrical Tools
    elif any(word in name_lower for word in ['extension cord', 'circuit', 'voltage', 'wire', 'cable cutter', 'work light']):
        return 'Electrical Tools'
    # Measuring & Layout
    elif any(word in name_lower for word in ['level', 'square', 'tape measure', 'caliper', 'laser', 'stud finder']):
        return 'Measuring & Layout'
    # Clamps & Jigs
    elif any(word in name_lower for word in ['clamp', 'jig', 'vise grip']):
        return 'Clamps & Jigs'
    # Hand Tools
    elif any(word in name_lower for word in ['hammer', 'wrench', 'screwdriver', 'chisel', 
                                              'plier', 'cutter', 'awl', 'nail', 'socket set']):
        return 'Hand Tools'
    # Gardening
    elif any(word in name_lower for word in ['pruning', 'trowel', 'planter', 'hoe', 
                                              'seed', 'shovel', 'tamper', 'garden']):
        return 'Gardening Tools'
    # Bike Repair
    elif any(word in name_lower for word in ['bike', 'bicycle']):
        return 'Bike Repair'
    # Sewing
    elif any(word in name_lower for word in ['sewing', 'seam', 'fabric', 'thread', 
                                              'buttonhole', 'steamer', 'mending']):
        return 'Sewing & Clothing'
    # Baking
    elif any(word in name_lower for word in ['cake pan', 'muffin', 'bundt', 'mixer', 
                                              'cookie cutter', 'springform']):
        return 'Baking Equipment'
    # Crafting
    elif any(word in name_lower for word in ['glue gun', 'engraving', 'cricut', 'jewelry']):
        return 'Crafting Tools'
    # Auto Repair
    elif any(word in name_lower for word in ['auto', 'oil filter', 'pry bar', 'engine']):
        return 'Auto Repair'
    else:
        return 'Other Tools'

def search_item(tool_name):
    """
    Search for an item and return the detail page URL
    """
    try:
        # Clean the tool name for searching
        search_query = tool_name.replace('/', ' ').replace('–', '-')
        
        # Construct search URL - search for tools only
        params = {
            'qu': f'TITLE={search_query}',
            'qf': 'ITYPE\tMaterial Type\t1:TOOL\t1:TOOL'
        }
        
        search_url = f"{SEARCH_BASE}?qu={quote(search_query)}&qf=ITYPE%09Material+Type%091%3ATOOL%091%3ATOOL"
        
        print(f"  Searching: {tool_name}")
        response = requests.get(search_url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the first search result link
        result_link = soup.find('a', class_=re.compile(r'resultTitle|title'))
        if not result_link:
            # Try finding detail link
            result_link = soup.find('a', href=re.compile(r'detailnonmodal'))
        
        if result_link:
            detail_url = result_link.get('href', '')
            if detail_url and not detail_url.startswith('http'):
                detail_url = urljoin(CATALOG_BASE, detail_url)
            return detail_url
        
        return None
        
    except Exception as e:
        print(f"  Error searching for {tool_name}: {e}")
        return None

def scrape_item_details(detail_url, tool_name):
    """
    Scrape detailed information from an item's detail page
    Returns: {name, image_url, description, physical_description, subject_terms, 
              general_note, copies_available, total_copies, locations}
    """
    try:
        print(f"    Fetching details from: {detail_url[:80]}...")
        response = requests.get(detail_url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract title
        title_elem = soup.find('h1', class_=re.compile(r'title|detailTitle'))
        if not title_elem:
            title_elem = soup.find('span', class_='title-main')
        item_name = title_elem.get_text(strip=True) if title_elem else tool_name
        
        # Extract image
        image_url = None
        img_tag = soup.find('img', class_=re.compile(r'jacket|cover', re.I))
        if not img_tag:
            img_tag = soup.find('img', id=re.compile(r'jacket|cover', re.I))
        if img_tag:
            image_url = img_tag.get('src', '')
            if image_url and not image_url.startswith('http'):
                image_url = urljoin(CATALOG_BASE, image_url)
        
        # Extract Physical Description
        physical_description = ""
        phys_desc = soup.find('div', string=re.compile(r'Physical Description', re.I))
        if phys_desc:
            # Get the next sibling or parent's text
            parent = phys_desc.find_parent()
            if parent:
                desc_text = parent.get_text(strip=True)
                # Remove the label
                physical_description = desc_text.replace('Physical Description:', '').strip()
        
        # If not found, try another method
        if not physical_description:
            for div in soup.find_all('div', class_=re.compile(r'displayElement|detail')):
                text = div.get_text(strip=True)
                if 'Physical Description:' in text:
                    physical_description = text.split('Physical Description:')[-1].strip()
                    break
        
        # Extract Subject Terms
        subject_terms = []
        subject_section = soup.find('div', string=re.compile(r'Subject Term', re.I))
        if subject_section:
            parent = subject_section.find_parent()
            if parent:
                # Find all links in subject section
                subject_links = parent.find_all('a')
                subject_terms = [link.get_text(strip=True) for link in subject_links]
        
        # Extract General Note
        general_note = ""
        note_section = soup.find('div', string=re.compile(r'General Note', re.I))
        if note_section:
            parent = note_section.find_parent()
            if parent:
                note_text = parent.get_text(strip=True)
                general_note = note_text.replace('General Note:', '').strip()
        
        # Build description from physical description and usage note
        description_parts = []
        if physical_description:
            description_parts.append(physical_description)
        
        # Look for usage description in the detail
        for div in soup.find_all('div'):
            text = div.get_text(strip=True)
            if ('Used for' in text or 'Borrower supplies' in text) and text not in description_parts:
                if len(text) < 500:  # Reasonable description length
                    description_parts.append(text)
                    break
        
        description = ' '.join(description_parts)
        
        # Extract availability information
        copies_available = 0
        total_copies = 0
        locations = []
        
        # Look for "Available: X" text - search in all page text
        page_text = soup.get_text()
        available_match = re.search(r'Available:\s*(\d+)', page_text, re.I)
        if available_match:
            copies_available = int(available_match.group(1))
            print(f"    Found availability: {copies_available} available")
        
        # Look for item status table
        status_table = soup.find('table', class_=re.compile(r'item|holdings', re.I))
        if not status_table:
            status_table = soup.find('table', id=re.compile(r'item|holdings', re.I))
        
        if status_table:
            rows = status_table.find_all('tr')[1:]  # Skip header
            total_copies = len(rows)
            
            # Parse each location
            for row in rows:
                cells = row.find_all('td')
                if len(cells) >= 3:
                    library_cell = cells[0]
                    location_cell = cells[-1]
                    
                    library_name = library_cell.get_text(strip=True)
                    status = location_cell.get_text(strip=True)
                    
                    locations.append({
                        'library': library_name,
                        'status': status
                    })
        
        # If we didn't find availability from "Available: X" text, count from locations
        if copies_available == 0 and locations:
            # Count locations where status doesn't contain "Checked Out" or "checked out"
            for loc in locations:
                status_lower = loc['status'].lower()
                if 'checked out' not in status_lower and 'check out' not in status_lower:
                    # If it says "see staff" or similar, it's available
                    if 'staff' in status_lower or 'available' in status_lower:
                        copies_available += 1
        
        return {
            'name': item_name,
            'image_url': image_url,
            'description': description,
            'physical_description': physical_description,
            'subject_terms': subject_terms,
            'general_note': general_note,
            'copies_available': copies_available,
            'total_copies': total_copies,
            'locations': locations,
            'detail_url': detail_url
        }
        
    except Exception as e:
        print(f"    Error fetching details: {e}")
        return None

def scrape_all_tools():
    """
    Scrape all tools from the LA County Library catalog
    """
    all_items = []
    
    print(f"Starting LA County Library scrape...")
    print(f"Total tools to search: {len(TOOLS_LIST)}\n")
    
    for idx, tool_name in enumerate(TOOLS_LIST, 1):
        print(f"[{idx}/{len(TOOLS_LIST)}] Processing: {tool_name}")
        
        # Search for the tool
        detail_url = search_item(tool_name)
        
        if not detail_url:
            print(f"  ✗ Could not find detail page for: {tool_name}")
            time.sleep(1)
            continue
        
        # Scrape the detail page
        item_data = scrape_item_details(detail_url, tool_name)
        
        if item_data:
            # Add category
            item_data['category'] = categorize_item(item_data['name'])
            
            all_items.append(item_data)
            
            status_emoji = "✓" if item_data['copies_available'] > 0 else "✗"
            print(f"  {status_emoji} {item_data['category']}: {item_data['name'][:50]}...")
            print(f"    Copies: {item_data['copies_available']}/{item_data['total_copies']} available")
            print(f"    Locations: {len(item_data['locations'])}")
        else:
            print(f"  ✗ Failed to scrape details for: {tool_name}")
        
        # Be nice to the server - 2 second delay between requests
        time.sleep(2)
        
        # Progress update every 10 items
        if idx % 10 == 0:
            print(f"\nProgress: {idx}/{len(TOOLS_LIST)} tools processed")
            print(f"Successfully scraped: {len(all_items)} items\n")
    
    return all_items

def save_results(items):
    """Save results to JSON file"""
    output = {
        'library': 'LA County Library',
        'scraped_at': datetime.now().isoformat(),
        'total_items': len(items),
        'items': items,
        'categories': {}
    }
    
    # Count by category
    for item in items:
        category = item.get('category', 'Other Tools')
        output['categories'][category] = output['categories'].get(category, 0) + 1
    
    filename = 'la_county_enhanced_data.json'
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
    items = scrape_all_tools()
    save_results(items)
