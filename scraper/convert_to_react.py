#!/usr/bin/env python3
"""
Convert scraped Houston library data to React app format
Adds descriptions and integrates with existing mockData.js structure
"""

import json
from pathlib import Path

# Item name to description mappings based on actual Houston library items
ITEM_DESCRIPTIONS = {
    "Crafts & Hobbies Sumi-e": "Japanese ink painting (Sumi-e) kit with brushes, ink stones, and rice paper. Learn traditional East Asian brush painting techniques with included instruction guide. Perfect for meditation and artistic expression.",
    
    "Ancel AD530 OBD2 Scanner Diagnostic Tool": "Professional-grade OBD2 diagnostic scanner for vehicle troubleshooting. Read and clear engine codes, monitor live data, view emissions readiness, and check O2 sensor tests. Color screen LCD display with multilingual support.",
    
    "Crafts & Hobbies Kit - Mindfulness": "Mindfulness and meditation craft kit featuring adult coloring books, guided journals, aromatherapy tools, and relaxation exercises. Promote mental wellness and reduce stress through creative mindful activities.",
    
    "Tonie box Princesas de Disney": "Toniebox audio player system with Disney Princess stories in Spanish. Screen-free, kid-friendly entertainment for ages 3+. Includes starter Tonie character figure. Durable, portable, and easy for little hands to use.",
    
    "Cookie Cutters - Dinosaurs": "Prehistoric-themed cookie cutter set with multiple dinosaur shapes including T-Rex, Triceratops, Stegosaurus, and more. Create fun treats for birthday parties, school events, or dinosaur enthusiasts of all ages.",
    
    "Cookie Cutters - Hanukkah": "Hanukkah celebration cookie cutter set featuring traditional symbols: dreidels, menorahs, Stars of David, and gelt coins. Perfect for holiday baking and celebrating the Festival of Lights with family.",
    
    "Musical Instrument: Kids Handbells": "8-piece colorful handbell set by Rhythm Band Instruments. Each bell produces a different musical note in the diatonic scale. Excellent for music education, group activities, and introducing children to melody and rhythm.",
    
    "Tonie box Canciones y Cuentos": "Toniebox with Spanish songs and stories collection. Screen-free bilingual audio entertainment for kids ages 3 and up. Educational content promoting Spanish language learning through music and storytelling.",
    
    "Bicycle repair kit": "Comprehensive Park Tool bicycle maintenance kit with essential tools for home bike repair. Includes tire levers, patch kit, multi-tool with hex keys, chain breaker, and spoke wrench. Keep your ride running smoothly.",
    
    "Book Club Kit: Saints of the household": "Teen book club discussion kit with 10 copies of 'Saints of the Household' by Ari Tison. Coming-of-age story about two Mexican-American brothers. Includes discussion guide, author bio, and reading group questions.",
    
    "Book Club Kit: The lion women of Tehran": "Adult book club kit with 10 copies of 'The Lion Women of Tehran' by Marjan Kamali. Historical fiction set in 1950s Iran following two best friends navigating love, loss, and revolution. Includes discussion guide.",
    
    "Tournament Chess Set - 4\" King": "Professional tournament-regulation chess set with weighted Staunton-style pieces and 4-inch king height. Includes roll-up vinyl board (20\"x20\"), algebraic notation, and storage tube. Perfect for serious players and club games."
}

# Category mappings
CATEGORY_MAP = {
    "Crafts & Hobbies Sumi-e": "Crafts & Hobbies",
    "Ancel AD530 OBD2 Scanner Diagnostic Tool": "Tools & Equipment",
    "Crafts & Hobbies Kit - Mindfulness": "Crafts & Hobbies",
    "Tonie box Princesas de Disney": "Educational Kits",
    "Cookie Cutters - Dinosaurs": "Crafts & Hobbies",
    "Cookie Cutters - Hanukkah": "Crafts & Hobbies",
    "Musical Instrument: Kids Handbells": "Musical Instruments",
    "Tonie box Canciones y Cuentos": "Educational Kits",
    "Bicycle repair kit": "Tools & Equipment",
    "Book Club Kit: Saints of the household": "Educational Kits",
    "Book Club Kit: The lion women of Tehran": "Educational Kits",
    "Tournament Chess Set - 4\" King": "Games & Puzzles"
}

# Load scraped data
with open('houston_library_items.json', 'r') as f:
    data = json.load(f)

# Get unique items (deduplicate)
unique_items = {}
for item in data['items']:
    name = item['name']
    if name and name not in unique_items:
        unique_items[name] = item

print(f"\n📊 Found {len(unique_items)} unique items from {data['totalItems']} total entries")
print("\nUnique items:")
for name in unique_items.keys():
    print(f"  - {name}")

# Generate JavaScript object for each item
print("\n\n" + "="*60)
print("JAVASCRIPT CODE FOR mockData.js")
print("="*60 + "\n")

print("// Add these Houston Public Library items to mockData.js\n")

id_counter = 76  # Start after existing items
for name, item in unique_items.items():
    category = CATEGORY_MAP.get(name, "Educational Kits")
    description = ITEM_DESCRIPTIONS.get(name, f"{name} - Part of Houston Public Library's Library of Things collection.")
    
    # Determine condition and availability
    condition = "Excellent"
    availability = True
    loan_period = "14 days"
    
    # Craft-specific details
    tags = []
    if "Cookie" in name:
        tags = ['baking', 'cookie cutters', 'holidays', 'kids']
    elif "Tonie" in name:
        tags = ['kids', 'audio', 'bilingual', 'screen-free']
        loan_period = "14 days"
    elif "Book Club" in name:
        tags = ['books', 'book club', 'reading', 'discussion']
        loan_period = "30 days"
    elif "Chess" in name:
        tags = ['games', 'chess', 'strategy', 'tournament']
    elif "Bicycle" in name:
        tags = ['bicycle', 'repair', 'tools', 'maintenance']
        loan_period = "7 days"
    elif "Handbell" in name:
        tags = ['music', 'handbells', 'kids', 'education']
    elif "OBD" in name or "Scanner" in name:
        tags = ['automotive', 'diagnostic', 'scanner', 'OBD2']
        loan_period = "7 days"
    elif  "Sumi-e" in name:
        tags = ['art', 'painting', 'Japanese', 'calligraphy']
    elif "Mindfulness" in name:
        tags = ['mindfulness', 'wellness', 'art therapy', 'meditation']
    
    # Choose appropriate image from Unsplash
    image_url = f"https://images.unsplash.com/photo-{1500000000 + id_counter}?w=400&auto=format&fit=crop"
    
    print(f"  {{")
    print(f"    id: '{id_counter}',")
    print(f"    name: '{name}',")
    print(f"    category: '{category}',")
    print(f"    library: libraries[1], // Houston Public Library")
    print(f"    image: '{image_url}',")
    print(f"    description: '{description}',")
    print(f"    condition: '{condition}',")
    print(f"    availability: {str(availability).lower()},")
    print(f"    loanPeriod: '{loan_period}',")
    print(f"    tags: {json.dumps(tags)},")
    print(f"    reserveUrl: '{item['reserveUrl']}'")
    print(f"  }},")
    
    id_counter += 1

print("\n" + "="*60)
print(f"✅ Generated {len(unique_items)} unique Houston library items")
print("="*60)
