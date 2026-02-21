#!/usr/bin/env python3
"""
Convert LA County scraped JSON to React format for mockData.js
"""

import json

def escape_js_string(text):
    """Escape special characters for JavaScript strings"""
    if not text:
        return ""
    return text.replace('\\', '\\\\').replace("'", "\\'").replace('\n', ' ').replace('\r', '')

def convert_to_react_format():
    """Convert LA County JSON data to React JavaScript format"""
    
    # Read the scraped data
    with open('la_county_enhanced_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    items = data['items']
    
    print(f"Converting {len(items)} LA County Library items to React format...\n")
    
    # Start building the JavaScript code
    js_code = "// LA COUNTY LIBRARY ITEMS - Auto-generated from scraper\n"
    js_code += f"// Total items: {len(items)}\n"
    js_code += f"// Scraped on: {data['scraped_at']}\n\n"
    
    for idx, item in enumerate(items, 1):
        item_id = str(idx)
        name = escape_js_string(item.get('name', 'Unknown Item'))
        category = item.get('category', 'Other Tools')
        
        # Get image URL - use real URL or placeholder
        image_url = item.get('image_url', '')
        if not image_url or 'no_image' in image_url:
            image_url = 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&auto=format&fit=crop'
        
        # Build description from physical description
        description = escape_js_string(item.get('description', ''))
        if not description:
            description = escape_js_string(item.get('physical_description', 'Tool available for checkout.'))
        
        # Get availability info
        copies_available = item.get('copies_available', 0)
        total_copies = item.get('total_copies', 0)
        
        # Get detail URL for linking to specific item page
        detail_url = item.get('detail_url', 'https://lacountylibrary.org/tools/')
        
        # Get general note
        general_note = item.get('general_note', '')
        
        # Determine loan period based on category
        if 'Musical' in category:
            loan_period = '21 days'
        else:
            loan_period = '7 days'
        
        # Generate tags based on category and name
        name_lower = name.lower()
        tags = []
        
        if 'power' in name_lower or 'drill' in name_lower or 'sander' in name_lower:
            tags = ['power tools', 'construction', 'DIY']
        elif 'guitar' in name_lower or 'keyboard' in name_lower or 'drum' in name_lower:
            tags = ['music', 'instruments', 'learning']
        elif 'sewing' in name_lower:
            tags = ['sewing', 'crafts', 'fabric']
        elif 'cake' in name_lower or 'pan' in name_lower or 'mixer' in name_lower:
            tags = ['baking', 'cooking', 'kitchen']
        elif 'bike' in name_lower:
            tags = ['bike', 'repair', 'cycling']
        elif 'saw' in name_lower or 'wrench' in name_lower or 'hammer' in name_lower:
            tags = ['hand tools', 'repair', 'DIY']
        else:
            tags = ['tools', 'equipment', 'lending']
        
        # Build the JavaScript object
        js_code += f"  {{\n"
        js_code += f"    id: '{item_id}',\n"
        js_code += f"    name: '{name}',\n"
        js_code += f"    category: '{category}',\n"
        js_code += f"    library: libraries[0], // LA County Library\n"
        js_code += f"    image: '{image_url}',\n"
        js_code += f"    description: '{description}',\n"
        js_code += f"    copiesAvailable: {copies_available},\n"
        js_code += f"    totalCopies: {total_copies},\n"
        js_code += f"    availability: {str(copies_available > 0).lower()},\n"
        js_code += f"    loanPeriod: '{loan_period}',\n"
        js_code += f"    tags: {json.dumps(tags)},\n"
        js_code += f"    reserveUrl: '{detail_url}'\n"
        js_code += f"  }},\n"
    
    # Save to file
    output_file = 'la_county_react_items.js'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_code)
    
    print(f"✓ Conversion complete!")
    print(f"✓ Output saved to: {output_file}")
    print(f"\nBreakdown by category:")
    for category, count in sorted(data['categories'].items(), key=lambda x: -x[1]):
        print(f"  {category}: {count}")
    
    print(f"\nItems with available copies: {sum(1 for item in items if item.get('copies_available', 0) > 0)}")
    print(f"Items currently unavailable: {sum(1 for item in items if item.get('copies_available', 0) == 0)}")

if __name__ == '__main__':
    convert_to_react_format()
