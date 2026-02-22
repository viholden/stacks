#!/usr/bin/env python3
"""
Test script to debug availability parsing for LA County Library
"""

import requests
from bs4 import BeautifulSoup
import re

# Test with Trowel (user said it has 9 available)
url = "https://catalog.lacountylibrary.org/client/en_US/default/search/detailnonmodal?qu=TITLE%3DTrowel&qf=ITYPE%09Material+Type%091%3ATOOL%091%3ATOOL"

print(f"Fetching: {url}\n")
response = requests.get(url, timeout=30)

soup = BeautifulSoup(response.content, 'html.parser')

# Try to find "Available: X" in different ways
print("1. Searching all text for 'Available:'...")
page_text = soup.get_text()
if 'Available:' in page_text:
    # Print context around it
    idx = page_text.find('Available:')
    print(f"  Found at position {idx}")
    print(f"  Context: ...{page_text[max(0, idx-50):idx+100]}...")
else:
    print("  NOT FOUND in page text")

print("\n2. RegEx search for 'Available: \\d+'...")
match = re.search(r'Available:\s*(\d+)', page_text, re.I)
if match:
    print(f"  FOUND: {match.group(0)} -> {match.group(1)} available")
else:
    print("  NOT FOUND via regex")

print("\n3. Searching for status table...")
status_table = soup.find('table', class_=re.compile(r'item|holdings', re.I))
if not status_table:
    status_table = soup.find('table', id=re.compile(r'item|holdings', re.I))

if status_table:
    print("  Table FOUND!")
    rows = status_table.find_all('tr')
    print(f"  Total rows: {len(rows)}")
    print(f"  Total items (excluding header): {len(rows) - 1}")
    
    print("\n4. Checking row statuses...")
    for i, row in enumerate(rows[1:6], 1):  # First 5 rows
        cells = row.find_all('td')
        if cells:
            location = cells[-1].get_text(strip=True) if len(cells) > 0 else ""
            print(f"  Row {i}: {location[:60]}")
else:
    print("  Table NOT FOUND")

print("\n5. Saving HTML snippet to debug.html for inspection...")
with open('debug_trowel.html', 'w', encoding='utf-8') as f:
    f.write(response.text)
print("  Saved to debug_trowel.html")
