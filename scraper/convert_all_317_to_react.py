#!/usr/bin/env python3
"""
Convert all 317 Houston library items to React-ready JavaScript format
with auto-generated basic descriptions
"""

import json
import re

def generate_description(name, category):
    """Generate a basic description based on item name and category"""
    
    # Common templates by category
    templates = {
        'Crafts & Hobbies': 'Creative {item} kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.',
        'Tools & Equipment': 'Professional-grade {item} for home projects. Borrow this tool for your DIY needs without the purchase cost.',
        'Musical Instruments': 'Learn to play with this {item}. Great for beginners and music enthusiasts to explore new sounds and skills.',
        'Educational Kits': 'Educational {item} designed for hands-on learning. Explore STEAM concepts through interactive play and discovery.',
        'Games & Puzzles': 'Family-friendly {item} for game night. Enjoy quality time with friends and family with this entertaining game.',
    }
    
    # Specific item type descriptions
    if 'cake pan' in name.lower() or 'bundt' in name.lower() or 'pan' in name.lower():
        return f'{name} for creative baking projects. Make impressive themed cakes and desserts for special occasions.'
    elif 'tonie' in name.lower() or 'yoto' in name.lower():
        return f'{name} - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.'
    elif 'book club' in name.lower():
        match = re.search(r'Book Club Kit:\s*(.+)', name)
        title = match.group(1) if match else name
        return f'Book club discussion kit with multiple copies of "{title}". Includes reading guide and discussion questions for group reading.'
    elif 'discovery kit' in name.lower():
        return f'{name} - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.'
    elif 'musical instrument' in name.lower():
        instrument = name.replace('Musical Instrument:', '').strip()
        return f'{instrument} for musical exploration. Borrow to learn, practice, or try a new instrument without buying.'
    elif 'scanner' in name.lower() or 'detector' in name.lower() or 'meter' in name.lower():
        return f'{name} for diagnostic and measurement tasks. Professional tool for home projects and troubleshooting.'
    elif any(word in name.lower() for word in ['game', 'monopoly', 'chess', 'puzzle']):
        return f'{name} - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.'
    
    # Use category template if available
    template = templates.get(category, 'Library of Things item: {item}. Available for checkout from Houston Public Library.')
    
    # Clean up the name for the template
    clean_name = name.replace('Crafts & Hobbies', '').replace('Musical Instrument:', '').strip()
    
    return template.format(item=clean_name)

def generate_tags(name, category):
    """Generate relevant tags based on item name and category"""
    tags = []
    
    # Category-based tags
    category_tags = {
        'Crafts & Hobbies': ['crafts', 'DIY', 'creative'],
        'Tools & Equipment': ['tools', 'DIY', 'home improvement'],
        'Musical Instruments': ['music', 'instruments', 'learning'],
        'Educational Kits': ['education', 'STEAM', 'kids'],
        'Games & Puzzles': ['games', 'family', 'entertainment'],
    }
    tags.extend(category_tags.get(category, ['library']))
    
    # Name-based tags
    name_lower = name.lower()
    
    if 'cake' in name_lower or 'baking' in name_lower or 'bundt' in name_lower:
        tags.extend(['baking', 'cooking'])
    if 'kids' in name_lower or 'junior' in name_lower or 'children' in name_lower:
        tags.append('kids')
    if 'book club' in name_lower:
        tags.extend(['books', 'reading', 'discussion'])
    if 'tonie' in name_lower or 'yoto' in name_lower:
        tags.extend(['audio', 'kids', 'screen-free'])
    if 'discovery' in name_lower:
        tags.extend(['learning', 'science'])
    if 'game' in name_lower:
        tags.extend(['board games', 'strategy'])
    
    # Remove duplicates and limit to 4-5 tags
    return list(dict.fromkeys(tags))[:5]

def get_loan_period(category, name):
    """Determine loan period based on category"""
    if 'tool' in name.lower() or category == 'Tools & Equipment':
        return '7 days'
    elif 'book club' in name.lower():
        return '30 days'
    else:
        return '14 days'

def get_image_url(name, category):
    """Generate an appropriate Unsplash image URL"""
    
    # Map to relevant image queries
    if 'cake pan' in name.lower() or 'bundt' in name.lower():
        return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop'
    elif 'tonie' in name.lower():
        return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop'
    elif 'book club' in name.lower():
        return 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop'
    elif 'guitar' in name.lower():
        return 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&auto=format&fit=crop'
    elif 'ukulele' in name.lower():
        return 'https://images.unsplash.com/photo-1527568635781-3c8801874d06?w=400&auto=format&fit=crop'
    elif 'keyboard' in name.lower() or 'piano' in name.lower():
        return 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&auto=format&fit=crop'
    elif 'game' in name.lower() and 'board' not in name.lower():
        return 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop'
    elif 'puzzle' in name.lower() or 'board' in name.lower():
        return 'https://images.unsplash.com/photo-1611891490916-e80afc5a4166?w=400&auto=format&fit=crop'
    elif 'discovery' in name.lower() or 'kit' in name.lower():
        return 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop'
    elif category == 'Musical Instruments':
        return 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop'
    elif category == 'Tools & Equipment':
        return 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&auto=format&fit=crop'
    else:
        return 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop'

def convert_to_react():
    """Convert all items to React format"""
    
    # Read the scraped data
    with open('houston_all_317_copies.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    items = data['items']
    
    print(f"Converting {len(items)} items to React format...")
    print("=" * 70)
    
    # Generate JavaScript code
    js_items = []
    
    for idx, item in enumerate(items):
        item_id = 47 + idx  # Start from ID 47 (after LA County items)
        name = item['name']
        category = item['category']
        reserve_url = item['reserveUrl']
        
        description = generate_description(name, category)
        tags = generate_tags(name, category)
        loan_period = get_loan_period(category, name)
        image = get_image_url(name, category)
        
        # Generate JavaScript object
        js_obj = f"""  {{
    id: '{item_id}',
    name: {json.dumps(name)},
    category: {json.dumps(category)},
    library: libraries[1], // Houston Public Library
    image: {json.dumps(image)},
    description: {json.dumps(description)},
    condition: 'Excellent',
    availability: true,
    loanPeriod: {json.dumps(loan_period)},
    tags: {json.dumps(tags)},
    reserveUrl: {json.dumps(reserve_url)}
  }}"""
        
        js_items.append(js_obj)
        
        if (idx + 1) % 50 == 0:
            print(f"  Processed {idx + 1}/{len(items)} items...")
    
    # Write to output file
    output = f"""// Houston Public Library - All 317 Library of Things Items
// Generated from comprehensive scrape on {data['scrapedDate']}
// Total items: {len(items)}

// Add these items to mockData.js in the Houston Public Library section

const houstonItems = [
{','.join(js_items)}
];

export default houstonItems;
"""
    
    with open('houston_all_317_items_react.js', 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"\n✅ Converted {len(items)} items to React format")
    print(f"📁 Saved to: houston_all_317_items_react.js")
    
    # Statistics
    categories = {}
    for item in items:
        cat = item['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\n📊 Breakdown by category:")
    for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
        print(f"   {cat}: {count}")

if __name__ == '__main__':
    convert_to_react()
