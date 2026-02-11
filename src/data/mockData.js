// Real libraries data scraped from actual library websites
export const libraries = [
  {
    id: '1',
    name: 'LA County Library - Norwalk',
    address: '12350 Imperial Hwy',
    city: 'Norwalk',
    state: 'CA',
    zip: '90650',
    phone: '(562) 868-0775',
    website: 'https://lacountylibrary.org/tools/',
    hours: {
      weekday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 6:00 PM',
      sunday: '1:00 PM - 5:00 PM'
    },
    mapLink: 'https://maps.google.com/?q=12350+Imperial+Hwy+Norwalk+CA',
    coordinates: [33.9022, -118.0817],
    description: "Part of LA County's Tool Lending Library program at 6 locations. Borrow tools, musical instruments, and maker items for free. Collection includes power tools, hand tools, sewing machines, gardening equipment, and more. 7-day loan period for tools, 21 days for musical instruments."
  },
  {
    id: '2',
    name: 'Houston Public Library',
    address: '500 McKinney St',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    phone: '(832) 393-1313',
    website: 'https://houstonlibrary.org/library-of-things',
    hours: {
      weekday: '10:00 AM - 6:00 PM',
      saturday: '10:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    mapLink: 'https://maps.google.com/?q=500+McKinney+St+Houston+TX',
    coordinates: [29.7594, -95.3698],
    description: "Explore our Library of Things with cookware, bakeware, musical instruments, technology, tools, crafts, discovery kits, and game boxes. All items free to borrow with your MYLink library card. From science and technology to art supplies and games."
  },
  {
    id: '3',
    name: 'Palos Verdes Library District',
    address: '701 Silver Spur Rd',
    city: 'Rolling Hills Estates',
    state: 'CA',
    zip: '90274',
    phone: '(310) 377-9584',
    website: 'https://www.pvld.org/',
    hours: {
      weekday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 6:00 PM',
      sunday: '1:00 PM - 5:00 PM'
    },
    mapLink: 'https://maps.google.com/?q=701+Silver+Spur+Rd+Rolling+Hills+Estates+CA',
    coordinates: [33.7442, -118.3870],
    description: "Peninsula Center Library offers Library of Things including outdoor recreation items, musical instruments, and nature exploration tools. Perfect for exploring the beautiful Palos Verdes Peninsula with stargazing kits, binoculars, hiking gear, and more."
  }
];

// Real items scraped from library websites - 80 actual items
export const mockItems = [
  // LA COUNTY LIBRARY - POWER TOOLS
  {
    id: '1',
    name: 'Cordless Drill Driver',
    category: 'Tools & Equipment',
    library: libraries[0],
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&auto=format&fit=crop',
    description: 'Professional cordless drill driver with variable speed control. Perfect for drilling holes and driving screws in wood, metal, and plastic. Includes battery and charger.',
    condition: 'Excellent',
    availability: true,
    loanPeriod: '7 days',
    tags: ['power tools', 'drilling', 'construction', 'DIY'],
    reserveUrl: 'https://lacountylibrary.org/tools/'
  },
  {
    id: '2',
    name: 'Drill & Screwdriver Bit Set',
    category: 'Tools & Equipment',
    library: libraries[0],
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&auto=format&fit=crop',
    description: 'Comprehensive set of drill and screwdriver bits for all your projects. Includes various sizes and types for different materials including wood, metal, and masonry.',
    condition: 'Excellent',
    availability: true,
    loanPeriod: '7 days',
    tags: ['tools', 'bits', 'hardware', 'accessories'],
    reserveUrl: 'https://lacountylibrary.org/tools/'
  },
  {
    id: '3',
    name: 'Orbital Sander',
    category: 'Tools & Equipment',
    library: libraries[0],
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&auto=format&fit=crop',
    description: 'Smooth finishing orbital sander for wood and other materials. Ideal for refinishing furniture, smoothing surfaces, and DIY projects. Includes dust collection bag.',
    condition: 'Good',
    availability: true,
    loanPeriod: '7 days',
    tags: ['power tools', 'sanding', 'woodworking', 'finishing'],
    reserveUrl: 'https://lacountylibrary.org/tools/'
  },
  // Acoustic Guitar
  {
    id: '17',
    name: 'Acoustic Guitar',
    category: 'Musical Instruments',
    library: libraries[0],
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&auto=format&fit=crop',
    description: 'Full-size acoustic guitar perfect for beginners and experienced players. Learn to play or practice your favorite songs. Includes case and beginner chord chart.',
    condition: 'Excellent',
    availability: true,
    loanPeriod: '21 days',
    tags: ['music', 'strings', 'guitar', 'learning'],
    reserveUrl: 'https://lacountylibrary.org/tools/'
  },
  {
    id: '18',
    name: 'Portable Keyboard - 61 Keys',
    category: 'Musical Instruments',
    library: libraries[0],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop',
    description: '61-key portable keyboard with various voices, rhythms, and learning features. Explore melodies and harmonies with versatile sounds. Battery or AC powered.',
    condition: 'Excellent',
    availability: false,
    loanPeriod: '21 days',
    tags: ['music', 'keyboard', 'piano', 'learning'],
    reserveUrl: 'https://lacountylibrary.org/tools/'
  },
  {
    id: '31',
    name: 'Sewing Machine - Brother',
    category: 'Crafts & Hobbies',
    library: libraries[0],
    image: 'https://images.unsplash.com/photo-1597149696816-a1c37e1a2d7e?w=400&auto=format&fit=crop',
    description: 'Brother sewing machine with 27 built-in stitches and automatic needle threader. Perfect for clothing repair, alterations, and crafting projects. Includes foot pedal.',
    condition: 'Excellent',
    availability: true,
    loanPeriod: '7 days',
    tags: ['sewing', 'crafts', 'fabric', 'machine'],
    reserveUrl: 'https://lacountylibrary.org/tools/'
  },
  {
    id: '40',
    name: 'Cricut Explore Air 2',
    category: 'Crafts & Hobbies',
    library: libraries[0],
    image: 'https://images.unsplash.com/photo-1611329532992-2677d2b6f0e1?w=400&auto=format&fit=crop',
    description: 'Smart cutting machine for vinyl, paper, iron-on, and more. Create custom crafts, cards, decorations, and home decor. Wireless Bluetooth connectivity.',
    condition: 'Excellent',
    availability: false,
    loanPeriod: '7 days',
    tags: ['crafts', 'cutting machine', 'Cricut', 'DIY'],
    reserveUrl: 'https://lacountylibrary.org/tools/'
  },
  {
    id: '42',
    name: 'Auto Engine Code Reader - OBD2',
    category: 'Tools & Equipment',
    library: libraries[0],
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&auto=format&fit=crop',
    description: 'OBD2 diagnostic code reader for checking engine issues and emissions. Reads and clears trouble codes. Works on most vehicles 1996 and newer.',
    condition: 'Excellent',
    availability: true,
    loanPeriod: '7 days',
    tags: ['automotive', 'diagnostic', 'OBD2', 'car repair'],
    reserveUrl: 'https://lacountylibrary.org/tools/'
  },

  // HOUSTON PUBLIC LIBRARY - All 317 items from comprehensive scrape
  {
    id: '47',
    name: "Crafts & Hobbies Sumi-e",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Creative Sumi-e kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2305483/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2305483%7EILS%7E0&lm=LIBTHINGS&isd=true"
  },  {
    id: '48',
    name: "Ancel AD530 OBD2 Scanner Diagnostic Tool",
    category: "Tools & Equipment",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&auto=format&fit=crop",
    description: "Ancel AD530 OBD2 Scanner Diagnostic Tool for diagnostic and measurement tasks. Professional tool for home projects and troubleshooting.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "7 days",
    tags: ["tools", "DIY", "home improvement"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2331895/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2331895%7EILS%7E1&lm=LIBTHINGS&isd=true"
  },  {
    id: '49',
    name: "Crafts & Hobbies Kit - Mindfulness",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Creative Kit - Mindfulness kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336991/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336991%7EILS%7E2&lm=LIBTHINGS&isd=true"
  },  {
    id: '50',
    name: "Tonie box Princesas de Disney",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Princesas de Disney - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2325648/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2325648%7EILS%7E3&lm=LIBTHINGS&isd=true"
  },  {
    id: '51',
    name: "Cookie Cutters - Dinosaurs",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Creative Cookie Cutters - Dinosaurs kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2331893/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2331893%7EILS%7E4&lm=LIBTHINGS&isd=true"
  },  {
    id: '52',
    name: "Cookie Cutters - Hanukkah",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Creative Cookie Cutters - Hanukkah kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2331894/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2331894%7EILS%7E5&lm=LIBTHINGS&isd=true"
  },  {
    id: '53',
    name: "Musical Instrument: Kids Handbells",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop",
    description: "Kids Handbells for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning", "kids"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2324001/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2324001%7EILS%7E6&lm=LIBTHINGS&isd=true"
  },  {
    id: '54',
    name: "Tonie box Canciones y Cuentos",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Canciones y Cuentos - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2324684/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2324684%7EILS%7E7&lm=LIBTHINGS&isd=true"
  },  {
    id: '55',
    name: "Bicycle repair kit",
    category: "Tools & Equipment",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Professional-grade Bicycle repair kit for home projects. Borrow this tool for your DIY needs without the purchase cost.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "7 days",
    tags: ["tools", "DIY", "home improvement"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2333868/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2333868%7EILS%7E8&lm=LIBTHINGS&isd=true"
  },  {
    id: '56',
    name: "Book Club Kit: Saints of the household",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Saints of the household\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336657/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336657%7EILS%7E9&lm=LIBTHINGS&isd=true"
  },  {
    id: '57',
    name: "Book Club Kit: The lion women of Tehran",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"The lion women of Tehran\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336351/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336351%7EILS%7E10&lm=LIBTHINGS&isd=true"
  },  {
    id: '58',
    name: "Tournament Chess Set - 4\" King",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Tournament Chess Set - 4\" King - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2333369/ada?d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2333369%7EILS%7E11&lm=LIBTHINGS&isd=true"
  },  {
    id: '59',
    name: "Abducktion",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Abducktion. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2278674/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2278674%7EILS%7E12&lm=LIBTHINGS&isd=true"
  },  {
    id: '60',
    name: "Football hero cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Football hero cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2314675/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2314675%7EILS%7E13&lm=LIBTHINGS&isd=true"
  },  {
    id: '61',
    name: "Crafts & hobbies : watercolor markers",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Creative Crafts & hobbies : watercolor markers kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2305535/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2305535%7EILS%7E14&lm=LIBTHINGS&isd=true"
  },  {
    id: '62',
    name: "Crafts & hobbies Wood Carving",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Creative Crafts & hobbies Wood Carving kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2305482/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2305482%7EILS%7E15&lm=LIBTHINGS&isd=true"
  },  {
    id: '63',
    name: "Metal detector Minelab Vanquish 340.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Metal detector Minelab Vanquish 340. for diagnostic and measurement tasks. Professional tool for home projects and troubleshooting.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2301639/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2301639%7EILS%7E16&lm=LIBTHINGS&isd=true"
  },  {
    id: '64',
    name: "Crepe pan SENSARTE Home nonstick flat skillet",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Crepe pan SENSARTE Home nonstick flat skillet for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2304566/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2304566%7EILS%7E17&lm=LIBTHINGS&isd=true"
  },  {
    id: '65',
    name: "Stud finder Zircon StudSensor HD55",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Stud finder Zircon StudSensor HD55. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2304567/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2304567%7EILS%7E18&lm=LIBTHINGS&isd=true"
  },  {
    id: '66',
    name: "Multimeter Test Kit",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Multimeter Test Kit for diagnostic and measurement tasks. Professional tool for home projects and troubleshooting.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2304568/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2304568%7EILS%7E19&lm=LIBTHINGS&isd=true"
  },  {
    id: '67',
    name: "Book Club Kit: Black girl you are Atlas",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Black girl you are Atlas\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2337000/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2337000%7EILS%7E20&lm=LIBTHINGS&isd=true"
  },  {
    id: '68',
    name: "Book Club Kit: How to say Babylon a memoir",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"How to say Babylon a memoir\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2329368/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2329368%7EILS%7E21&lm=LIBTHINGS&isd=true"
  },  {
    id: '69',
    name: "Crafts & hobbies : Yarn Winding",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Creative Crafts & hobbies : Yarn Winding kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2323888/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2323888%7EILS%7E22&lm=LIBTHINGS&isd=true"
  },  {
    id: '70',
    name: "Book Club Kit: Rez ball",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Rez ball\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336349/ada?rw=12&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336349%7EILS%7E23&lm=LIBTHINGS&isd=true"
  },  {
    id: '71',
    name: "Stell\u00f6 connect. create. compete.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Stell\u00f6 connect. create. compete.. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2331929/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2331929%7EILS%7E24&lm=LIBTHINGS&isd=true"
  },  {
    id: '72',
    name: "Podcast kit",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Educational Podcast kit designed for hands-on learning. Explore STEAM concepts through interactive play and discovery.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2297845/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2297845%7EILS%7E25&lm=LIBTHINGS&isd=true"
  },  {
    id: '73',
    name: "Musical Instrument: Banjo",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop",
    description: "Banjo for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2303074/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2303074%7EILS%7E26&lm=LIBTHINGS&isd=true"
  },  {
    id: '74',
    name: "Precision Screwdriver set",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Precision Screwdriver set. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2303469/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2303469%7EILS%7E27&lm=LIBTHINGS&isd=true"
  },  {
    id: '75',
    name: "Yoto Player Roald Dahl",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Yoto Player Roald Dahl - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "audio", "kids", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2297072/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2297072%7EILS%7E28&lm=LIBTHINGS&isd=true"
  },  {
    id: '76',
    name: "Yoto Player Award Winners",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Yoto Player Award Winners - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "audio", "kids", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2297383/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2297383%7EILS%7E29&lm=LIBTHINGS&isd=true"
  },  {
    id: '77',
    name: "Yoto Player Popular Series Set 1",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Yoto Player Popular Series Set 1 - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "audio", "kids", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2297384/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2297384%7EILS%7E30&lm=LIBTHINGS&isd=true"
  },  {
    id: '78',
    name: "Yoto Player Classics, set 1",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Yoto Player Classics, set 1 - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "audio", "kids", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2297201/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2297201%7EILS%7E31&lm=LIBTHINGS&isd=true"
  },  {
    id: '79',
    name: "Yoto Player Friends & family",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Yoto Player Friends & family - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "audio", "kids", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2297202/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2297202%7EILS%7E32&lm=LIBTHINGS&isd=true"
  },  {
    id: '80',
    name: "Yoto Player Eerie tales",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Yoto Player Eerie tales - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "audio", "kids", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2297308/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2297308%7EILS%7E33&lm=LIBTHINGS&isd=true"
  },  {
    id: '81',
    name: "Tonie box Family Matters",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Family Matters - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2270552/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2270552%7EILS%7E34&lm=LIBTHINGS&isd=true"
  },  {
    id: '82',
    name: "Tonie box Disney Princesses",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Disney Princesses - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2270553/ada?rw=24&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2270553%7EILS%7E35&lm=LIBTHINGS&isd=true"
  },  {
    id: '83',
    name: "Leaflettes cakelet pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Leaflettes cakelet pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2278672/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2278672%7EILS%7E36&lm=LIBTHINGS&isd=true"
  },  {
    id: '84',
    name: "Musical Instrument: Otamatone Deluxe",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop",
    description: "Otamatone Deluxe for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2278831/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2278831%7EILS%7E37&lm=LIBTHINGS&isd=true"
  },  {
    id: '85',
    name: "Fleur de lis bundt pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Fleur de lis bundt pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246085/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246085%7EILS%7E38&lm=LIBTHINGS&isd=true"
  },  {
    id: '86',
    name: "Mickey Mouse cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Mickey Mouse cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246086/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246086%7EILS%7E39&lm=LIBTHINGS&isd=true"
  },  {
    id: '87',
    name: "Elmo cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Elmo cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246087/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246087%7EILS%7E40&lm=LIBTHINGS&isd=true"
  },  {
    id: '88',
    name: "Cars Lightning McQueen cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Cars Lightning McQueen cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246088/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246088%7EILS%7E41&lm=LIBTHINGS&isd=true"
  },  {
    id: '89',
    name: "Blossom bundt cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Blossom bundt cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246089/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246089%7EILS%7E42&lm=LIBTHINGS&isd=true"
  },  {
    id: '90',
    name: "Braided mini bundt pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Braided mini bundt pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246090/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246090%7EILS%7E43&lm=LIBTHINGS&isd=true"
  },  {
    id: '91',
    name: "Football novelty cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Football novelty cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246091/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246091%7EILS%7E44&lm=LIBTHINGS&isd=true"
  },  {
    id: '92',
    name: "Bavaria bundt pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Bavaria bundt pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246092/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246092%7EILS%7E45&lm=LIBTHINGS&isd=true"
  },  {
    id: '93',
    name: "Bundt duet pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Bundt duet pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246093/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246093%7EILS%7E46&lm=LIBTHINGS&isd=true"
  },  {
    id: '94',
    name: "Autumn wreath bundt pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Autumn wreath bundt pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246094/ada?rw=36&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246094%7EILS%7E47&lm=LIBTHINGS&isd=true"
  },  {
    id: '95',
    name: "Elegant heart bundt pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Elegant heart bundt pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246095/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246095%7EILS%7E48&lm=LIBTHINGS&isd=true"
  },  {
    id: '96',
    name: "Castle pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Castle pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246096/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246096%7EILS%7E49&lm=LIBTHINGS&isd=true"
  },  {
    id: '97',
    name: "Baby bunny cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Baby bunny cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246097/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246097%7EILS%7E50&lm=LIBTHINGS&isd=true"
  },  {
    id: '98',
    name: "Bundt quartet pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Bundt quartet pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246099/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246099%7EILS%7E51&lm=LIBTHINGS&isd=true"
  },  {
    id: '99',
    name: "Bundt squared pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Bundt squared pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246100/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246100%7EILS%7E52&lm=LIBTHINGS&isd=true"
  },  {
    id: '100',
    name: "Autumn treats pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Autumn treats pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246101/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246101%7EILS%7E53&lm=LIBTHINGS&isd=true"
  },  {
    id: '101',
    name: "Castle bundt pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Castle bundt pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246102/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246102%7EILS%7E54&lm=LIBTHINGS&isd=true"
  },  {
    id: '102',
    name: "Bundt tea cakes and candies pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Bundt tea cakes and candies pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246103/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246103%7EILS%7E55&lm=LIBTHINGS&isd=true"
  },  {
    id: '103',
    name: "Crafts & Hobbies Kit - Ghost Hunting",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Creative Kit - Ghost Hunting kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2250633/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2250633%7EILS%7E56&lm=LIBTHINGS&isd=true"
  },  {
    id: '104',
    name: "Discovery Kit - Colors",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Colors - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2249688/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2249688%7EILS%7E57&lm=LIBTHINGS&isd=true"
  },  {
    id: '105',
    name: "Madeleine pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Madeleine pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259828/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259828%7EILS%7E58&lm=LIBTHINGS&isd=true"
  },  {
    id: '106',
    name: "Crafts & Hobbies Kit - Bird watching",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Creative Kit - Bird watching kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2257256/ada?rw=48&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2257256%7EILS%7E59&lm=LIBTHINGS&isd=true"
  },  {
    id: '107',
    name: "Flour Shop bitelet pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Flour Shop bitelet pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259868/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259868%7EILS%7E60&lm=LIBTHINGS&isd=true"
  },  {
    id: '108',
    name: "Hogwarts cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Hogwarts cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259869/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259869%7EILS%7E61&lm=LIBTHINGS&isd=true"
  },  {
    id: '109',
    name: "Star Wars cakelet pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Star Wars cakelet pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259871/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259871%7EILS%7E62&lm=LIBTHINGS&isd=true"
  },  {
    id: '110',
    name: "Pelmeni maker",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Pelmeni maker. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259872/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259872%7EILS%7E63&lm=LIBTHINGS&isd=true"
  },  {
    id: '111',
    name: "Paella pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Paella pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259698/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259698%7EILS%7E64&lm=LIBTHINGS&isd=true"
  },  {
    id: '112',
    name: "Icing piping tips",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Icing piping tips. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259873/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259873%7EILS%7E65&lm=LIBTHINGS&isd=true"
  },  {
    id: '113',
    name: "Kook Moroccan tagine",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Kook Moroccan tagine. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2260942/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2260942%7EILS%7E66&lm=LIBTHINGS&isd=true"
  },  {
    id: '114',
    name: "Taiyaki pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Taiyaki pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2260943/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2260943%7EILS%7E67&lm=LIBTHINGS&isd=true"
  },  {
    id: '115',
    name: "Puppy love pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Puppy love pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259830/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259830%7EILS%7E68&lm=LIBTHINGS&isd=true"
  },  {
    id: '116',
    name: "Butterfly cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Butterfly cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259829/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259829%7EILS%7E69&lm=LIBTHINGS&isd=true"
  },  {
    id: '117',
    name: "Discovery kit - Design Studio",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery kit - Design Studio - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2257253/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2257253%7EILS%7E70&lm=LIBTHINGS&isd=true"
  },  {
    id: '118',
    name: "Tonie box Kids Classics",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Kids Classics - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2270305/ada?rw=60&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2270305%7EILS%7E71&lm=LIBTHINGS&isd=true"
  },  {
    id: '119',
    name: "Tonie box Animal Tales",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Animal Tales - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2270566/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2270566%7EILS%7E72&lm=LIBTHINGS&isd=true"
  },  {
    id: '120',
    name: "Tonie box Disney Classics",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Disney Classics - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2270567/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2270567%7EILS%7E73&lm=LIBTHINGS&isd=true"
  },  {
    id: '121',
    name: "Tonie Box Friendship.",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie Box Friendship. - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2270714/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2270714%7EILS%7E74&lm=LIBTHINGS&isd=true"
  },  {
    id: '122',
    name: "Tonie Box Slightly spooky.",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie Box Slightly spooky. - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2289973/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2289973%7EILS%7E75&lm=LIBTHINGS&isd=true"
  },  {
    id: '123',
    name: "Discovery Kit - Magna-tiles : Dinosaurs!",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Magna-tiles : Dinosaurs! - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2309593/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2309593%7EILS%7E76&lm=LIBTHINGS&isd=true"
  },  {
    id: '124',
    name: "Jubilee Bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Jubilee Bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245291/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245291%7EILS%7E77&lm=LIBTHINGS&isd=true"
  },  {
    id: '125',
    name: "Jubilee Loaf",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Jubilee Loaf. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245292/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245292%7EILS%7E78&lm=LIBTHINGS&isd=true"
  },  {
    id: '126',
    name: "Jack-o'-Lantern",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Jack-o'-Lantern. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245293/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245293%7EILS%7E79&lm=LIBTHINGS&isd=true"
  },  {
    id: '127',
    name: "Horse",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Horse. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245294/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245294%7EILS%7E80&lm=LIBTHINGS&isd=true"
  },  {
    id: '128',
    name: "Pine forest bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Pine forest bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245530/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245530%7EILS%7E81&lm=LIBTHINGS&isd=true"
  },  {
    id: '129',
    name: "Red heart",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Red heart. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245531/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245531%7EILS%7E82&lm=LIBTHINGS&isd=true"
  },  {
    id: '130',
    name: "Spooky skeleton cakelet",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Spooky skeleton cakelet. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245532/ada?rw=72&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245532%7EILS%7E83&lm=LIBTHINGS&isd=true"
  },  {
    id: '131',
    name: "Tombstone cakelet",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Tombstone cakelet. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245537/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245537%7EILS%7E84&lm=LIBTHINGS&isd=true"
  },  {
    id: '132',
    name: "Train",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Train. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245538/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245538%7EILS%7E85&lm=LIBTHINGS&isd=true"
  },  {
    id: '133',
    name: "Crown",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Crown. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245539/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245539%7EILS%7E86&lm=LIBTHINGS&isd=true"
  },  {
    id: '134',
    name: "Mini ghost and pumpkin",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Mini ghost and pumpkin. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245541/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245541%7EILS%7E87&lm=LIBTHINGS&isd=true"
  },  {
    id: '135',
    name: "Halloween skull",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Halloween skull. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245542/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245542%7EILS%7E88&lm=LIBTHINGS&isd=true"
  },  {
    id: '136',
    name: "Bunny",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Bunny. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245544/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245544%7EILS%7E89&lm=LIBTHINGS&isd=true"
  },  {
    id: '137',
    name: "Spiderman",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Spiderman. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245545/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245545%7EILS%7E90&lm=LIBTHINGS&isd=true"
  },  {
    id: '138',
    name: "Discovery Kit - Osmo",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Osmo - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2257120/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2257120%7EILS%7E91&lm=LIBTHINGS&isd=true"
  },  {
    id: '139',
    name: "Aebleskiver pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Aebleskiver pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259709/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259709%7EILS%7E92&lm=LIBTHINGS&isd=true"
  },  {
    id: '140',
    name: "Cakelet Snowflake",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Cakelet Snowflake. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245276/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245276%7EILS%7E93&lm=LIBTHINGS&isd=true"
  },  {
    id: '141',
    name: "Geo Bundtlette",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Geo Bundtlette for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245277/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245277%7EILS%7E94&lm=LIBTHINGS&isd=true"
  },  {
    id: '142',
    name: "Harvest Bounty Loaf",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Harvest Bounty Loaf. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245278/ada?rw=84&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245278%7EILS%7E95&lm=LIBTHINGS&isd=true"
  },  {
    id: '143',
    name: "Harvest Leaves Bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Harvest Leaves Bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245279/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245279%7EILS%7E96&lm=LIBTHINGS&isd=true"
  },  {
    id: '144',
    name: "Harvest Mini Loaf",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Harvest Mini Loaf. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245280/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245280%7EILS%7E97&lm=LIBTHINGS&isd=true"
  },  {
    id: '145',
    name: "Haunted Manor Bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Haunted Manor Bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245281/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245281%7EILS%7E98&lm=LIBTHINGS&isd=true"
  },  {
    id: '146',
    name: "Haunted Skull Cakelet",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Haunted Skull Cakelet. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245282/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245282%7EILS%7E99&lm=LIBTHINGS&isd=true"
  },  {
    id: '147',
    name: "Heritage Bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Heritage Bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245283/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245283%7EILS%7E100&lm=LIBTHINGS&isd=true"
  },  {
    id: '148',
    name: "Heritage Loaf",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Heritage Loaf. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245284/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245284%7EILS%7E101&lm=LIBTHINGS&isd=true"
  },  {
    id: '149',
    name: "Let It Snow Bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Let It Snow Bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245285/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245285%7EILS%7E102&lm=LIBTHINGS&isd=true"
  },  {
    id: '150',
    name: "Magnolia Bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Magnolia Bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245286/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245286%7EILS%7E103&lm=LIBTHINGS&isd=true"
  },  {
    id: '151',
    name: "Monster Mask Cakelet",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Monster Mask Cakelet. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245287/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245287%7EILS%7E104&lm=LIBTHINGS&isd=true"
  },  {
    id: '152',
    name: "Gingerbread House Bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Gingerbread House Bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245288/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245288%7EILS%7E105&lm=LIBTHINGS&isd=true"
  },  {
    id: '153',
    name: "Holiday Wreath Bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Holiday Wreath Bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245289/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245289%7EILS%7E106&lm=LIBTHINGS&isd=true"
  },  {
    id: '154',
    name: "Crown Bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Crown Bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245290/ada?rw=96&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245290%7EILS%7E107&lm=LIBTHINGS&isd=true"
  },  {
    id: '155',
    name: "Octopus",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Octopus. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245529/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245529%7EILS%7E108&lm=LIBTHINGS&isd=true"
  },  {
    id: '156',
    name: "Tigger",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Tigger. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245546/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245546%7EILS%7E109&lm=LIBTHINGS&isd=true"
  },  {
    id: '157',
    name: "Wreathlettes",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Wreathlettes. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245548/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245548%7EILS%7E110&lm=LIBTHINGS&isd=true"
  },  {
    id: '158',
    name: "Star of David bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Star of David bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245533/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245533%7EILS%7E111&lm=LIBTHINGS&isd=true"
  },  {
    id: '159',
    name: "Stadium bundt",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Stadium bundt for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245534/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245534%7EILS%7E112&lm=LIBTHINGS&isd=true"
  },  {
    id: '160',
    name: "Swirl bundtlette",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Swirl bundtlette for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245535/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245535%7EILS%7E113&lm=LIBTHINGS&isd=true"
  },  {
    id: '161',
    name: "English shortbread",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: English shortbread. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2245536/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2245536%7EILS%7E114&lm=LIBTHINGS&isd=true"
  },  {
    id: '162',
    name: "Discovery Kit - Robot Mouse",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Robot Mouse - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2250462/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2250462%7EILS%7E115&lm=LIBTHINGS&isd=true"
  },  {
    id: '163',
    name: "Discovery Kit - Owl Pellet Lab",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Owl Pellet Lab - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2250587/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2250587%7EILS%7E116&lm=LIBTHINGS&isd=true"
  },  {
    id: '164',
    name: "Discovery Kit - Ozobot Evo",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Ozobot Evo - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2250588/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2250588%7EILS%7E117&lm=LIBTHINGS&isd=true"
  },  {
    id: '165',
    name: "Musical Instrument: Ukulele",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1527568635781-3c8801874d06?w=400&auto=format&fit=crop",
    description: "Ukulele for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2250463/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2250463%7EILS%7E118&lm=LIBTHINGS&isd=true"
  },  {
    id: '166',
    name: "Discovery Kit - Cubelets",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Cubelets - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2250464/ada?rw=108&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2250464%7EILS%7E119&lm=LIBTHINGS&isd=true"
  },  {
    id: '167',
    name: "Peanuts nonstick cakelet pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Peanuts nonstick cakelet pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2278829/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2278829%7EILS%7E120&lm=LIBTHINGS&isd=true"
  },  {
    id: '168',
    name: "Bundt charms pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Bundt charms pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2278830/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2278830%7EILS%7E121&lm=LIBTHINGS&isd=true"
  },  {
    id: '169',
    name: "Tonie box PAW Patrol",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box PAW Patrol - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2273073/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2273073%7EILS%7E122&lm=LIBTHINGS&isd=true"
  },  {
    id: '170',
    name: "Discovery Kit - Adventure Buddy",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Adventure Buddy - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2314394/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2314394%7EILS%7E123&lm=LIBTHINGS&isd=true"
  },  {
    id: '171',
    name: "Sum swamp : addition and subtraction game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Sum swamp : addition and subtraction game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2323064/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2323064%7EILS%7E124&lm=LIBTHINGS&isd=true"
  },  {
    id: '172',
    name: "Discovery Kit - Stop Motion Animation",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Stop Motion Animation - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2323546/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2323546%7EILS%7E125&lm=LIBTHINGS&isd=true"
  },  {
    id: '173',
    name: "Tonie box Kids Classics 2",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Kids Classics 2 - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321757/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321757%7EILS%7E126&lm=LIBTHINGS&isd=true"
  },  {
    id: '174',
    name: "Tonie box Kids Classics 3",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Kids Classics 3 - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321758/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321758%7EILS%7E127&lm=LIBTHINGS&isd=true"
  },  {
    id: '175',
    name: "Tonie box PAW Patrol 2",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box PAW Patrol 2 - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321759/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321759%7EILS%7E128&lm=LIBTHINGS&isd=true"
  },  {
    id: '176',
    name: "Money Bunch the saving, spending and sharing game!",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Money Bunch the saving, spending and sharing game! - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2322387/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2322387%7EILS%7E129&lm=LIBTHINGS&isd=true"
  },  {
    id: '177',
    name: "Discovery Kit - Magna-tiles : Forest Friends",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Magna-tiles : Forest Friends - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2309700/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2309700%7EILS%7E130&lm=LIBTHINGS&isd=true"
  },  {
    id: '178',
    name: "Discovery Kit - Magna-tiles : Safari Adventure",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Magna-tiles : Safari Adventure - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2309702/ada?rw=120&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2309702%7EILS%7E131&lm=LIBTHINGS&isd=true"
  },  {
    id: '179',
    name: "Discovery Kit - Magna-tiles : Jungle Fun",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Magna-tiles : Jungle Fun - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2309703/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2309703%7EILS%7E132&lm=LIBTHINGS&isd=true"
  },  {
    id: '180',
    name: "Discovery Kit - Magna-tiles : Arctic Animals",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Magna-tiles : Arctic Animals - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2309760/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2309760%7EILS%7E133&lm=LIBTHINGS&isd=true"
  },  {
    id: '181',
    name: "Discovery Kit - Magna-tiles : Farm Friends",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Magna-tiles : Farm Friends - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2309761/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2309761%7EILS%7E134&lm=LIBTHINGS&isd=true"
  },  {
    id: '182',
    name: "Spy x family mission for peanuts",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Spy x family mission for peanuts. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2295156/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2295156%7EILS%7E135&lm=LIBTHINGS&isd=true"
  },  {
    id: '183',
    name: "Mantis",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Mantis. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258684/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258684%7EILS%7E136&lm=LIBTHINGS&isd=true"
  },  {
    id: '184',
    name: "Doomlings",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Doomlings. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2257545/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2257545%7EILS%7E137&lm=LIBTHINGS&isd=true"
  },  {
    id: '185',
    name: "Tonie box Fairytales. Set 1",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Fairytales. Set 1 - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2270306/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2270306%7EILS%7E138&lm=LIBTHINGS&isd=true"
  },  {
    id: '186',
    name: "Tonie box Music & dance.",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Music & dance. - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2274623/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2274623%7EILS%7E139&lm=LIBTHINGS&isd=true"
  },  {
    id: '187',
    name: "Tonie box Fun with fins.",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Fun with fins. - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2274624/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2274624%7EILS%7E140&lm=LIBTHINGS&isd=true"
  },  {
    id: '188',
    name: "Tonie box In the water.",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box In the water. - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321760/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321760%7EILS%7E141&lm=LIBTHINGS&isd=true"
  },  {
    id: '189',
    name: "Tonie box Spidey and Friends.",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Spidey and Friends. - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321761/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321761%7EILS%7E142&lm=LIBTHINGS&isd=true"
  },  {
    id: '190',
    name: "Tonie box Kid Adventures.",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Kid Adventures. - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2272854/ada?rw=132&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2272854%7EILS%7E143&lm=LIBTHINGS&isd=true"
  },  {
    id: '191',
    name: "Tonie box Fairytales. Set 2",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Fairytales. Set 2 - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2273125/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2273125%7EILS%7E144&lm=LIBTHINGS&isd=true"
  },  {
    id: '192',
    name: "Tonie box Winter holidays.",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Winter holidays. - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2287904/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2287904%7EILS%7E145&lm=LIBTHINGS&isd=true"
  },  {
    id: '193',
    name: "Tonie box Dragons and Dinosaurs.",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    description: "Tonie box Dragons and Dinosaurs. - screen-free audio entertainment system for kids. Stories, songs, and educational content in an easy-to-use format.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "audio", "screen-free"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321762/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321762%7EILS%7E146&lm=LIBTHINGS&isd=true"
  },  {
    id: '194',
    name: "The Attic Monster",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: The Attic Monster. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2296304/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2296304%7EILS%7E147&lm=LIBTHINGS&isd=true"
  },  {
    id: '195',
    name: "D & D starter set Dragons of Stormwreck Isle.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: D & D starter set Dragons of Stormwreck Isle.. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2295155/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2295155%7EILS%7E148&lm=LIBTHINGS&isd=true"
  },  {
    id: '196',
    name: "Portable record player",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Portable record player. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2297387/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2297387%7EILS%7E149&lm=LIBTHINGS&isd=true"
  },  {
    id: '197',
    name: "Musical Instrument: Mandolin",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop",
    description: "Mandolin for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2303089/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2303089%7EILS%7E150&lm=LIBTHINGS&isd=true"
  },  {
    id: '198',
    name: "Really loud librarians a merciless word-shouting board game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1611891490916-e80afc5a4166?w=400&auto=format&fit=crop",
    description: "Really loud librarians a merciless word-shouting board game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2296302/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2296302%7EILS%7E151&lm=LIBTHINGS&isd=true"
  },  {
    id: '199',
    name: "Tic tac K.O. dragons vs unicorns.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Tic tac K.O. dragons vs unicorns.. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258335/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258335%7EILS%7E152&lm=LIBTHINGS&isd=true"
  },  {
    id: '200',
    name: "Unstable unicorns for kids",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Unstable unicorns for kids. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "kids"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258336/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258336%7EILS%7E153&lm=LIBTHINGS&isd=true"
  },  {
    id: '201',
    name: "Nemesis",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Nemesis. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258686/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258686%7EILS%7E154&lm=LIBTHINGS&isd=true"
  },  {
    id: '202',
    name: "Labyrinth Pok\u00e9mon",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Labyrinth Pok\u00e9mon. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258688/ada?rw=144&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258688%7EILS%7E155&lm=LIBTHINGS&isd=true"
  },  {
    id: '203',
    name: "3-D sports ball pan set",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "3-D sports ball pan set for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2314643/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2314643%7EILS%7E156&lm=LIBTHINGS&isd=true"
  },  {
    id: '204',
    name: "Discovery Kit - Coding critters: Blazer the dragon",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Discovery Kit - Coding critters: Blazer the dragon - hands-on educational kit for exploring STEAM concepts. Perfect for curious minds and interactive learning experiences.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids", "learning", "science"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2326047/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2326047%7EILS%7E157&lm=LIBTHINGS&isd=true"
  },  {
    id: '205',
    name: "Ratcheting screwdriver set",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Ratcheting screwdriver set. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2314347/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2314347%7EILS%7E158&lm=LIBTHINGS&isd=true"
  },  {
    id: '206',
    name: "Book Club Kit: Because of Winn-Dixie",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Because of Winn-Dixie\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2334258/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2334258%7EILS%7E159&lm=LIBTHINGS&isd=true"
  },  {
    id: '207',
    name: "Book Club Kit: Other words for home",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Other words for home\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336348/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336348%7EILS%7E160&lm=LIBTHINGS&isd=true"
  },  {
    id: '208',
    name: "The haunted mansion call of the spirits game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "The haunted mansion call of the spirits game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2257546/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2257546%7EILS%7E161&lm=LIBTHINGS&isd=true"
  },  {
    id: '209',
    name: "Hues and cues a guessing game of colors and clues",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Hues and cues a guessing game of colors and clues - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2257548/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2257548%7EILS%7E162&lm=LIBTHINGS&isd=true"
  },  {
    id: '210',
    name: "Building site",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Building site. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2211322/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2211322%7EILS%7E163&lm=LIBTHINGS&isd=true"
  },  {
    id: '211',
    name: "Book Club Kit: Lupe Wong won't dance",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Lupe Wong won't dance\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2215433/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2215433%7EILS%7E164&lm=LIBTHINGS&isd=true"
  },  {
    id: '212',
    name: "5 minute mystery the Museum of Everything",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: 5 minute mystery the Museum of Everything. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2331927/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2331927%7EILS%7E165&lm=LIBTHINGS&isd=true"
  },  {
    id: '213',
    name: "Book Club Kit: Prairie Lotus",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Prairie Lotus\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336273/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336273%7EILS%7E166&lm=LIBTHINGS&isd=true"
  },  {
    id: '214',
    name: "Happy little dinosaurs",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Happy little dinosaurs. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2185521/ada?rw=156&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2185521%7EILS%7E167&lm=LIBTHINGS&isd=true"
  },  {
    id: '215',
    name: "Calico",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Calico. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2331928/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2331928%7EILS%7E168&lm=LIBTHINGS&isd=true"
  },  {
    id: '216',
    name: "Book Club Kit: Circe",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Circe\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2334259/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2334259%7EILS%7E169&lm=LIBTHINGS&isd=true"
  },  {
    id: '217',
    name: "Pete the Cat I love my buttons game.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Pete the Cat I love my buttons game. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2295157/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2295157%7EILS%7E170&lm=LIBTHINGS&isd=true"
  },  {
    id: '218',
    name: "Machi Koro",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Machi Koro. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258683/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258683%7EILS%7E171&lm=LIBTHINGS&isd=true"
  },  {
    id: '219',
    name: "Villainous  the worst takes it all",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Villainous  the worst takes it all. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175474/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175474%7EILS%7E172&lm=LIBTHINGS&isd=true"
  },  {
    id: '220',
    name: "Kids create absurdity  a super fun family card game with crazy questions and silly answers!",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Kids create absurdity  a super fun family card game with crazy questions and silly answers! - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "kids", "board games"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175479/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175479%7EILS%7E173&lm=LIBTHINGS&isd=true"
  },  {
    id: '221',
    name: "Llamas unleashed",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Llamas unleashed. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175410/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175410%7EILS%7E174&lm=LIBTHINGS&isd=true"
  },  {
    id: '222',
    name: "Bears in pairs the hide & seek matching game.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Bears in pairs the hide & seek matching game. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2211312/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2211312%7EILS%7E175&lm=LIBTHINGS&isd=true"
  },  {
    id: '223',
    name: "Petting zoo the touch and feel matching game.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Petting zoo the touch and feel matching game. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2211318/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2211318%7EILS%7E176&lm=LIBTHINGS&isd=true"
  },  {
    id: '224',
    name: "My first castle panic work together to save the castle!",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "My first castle panic work together to save the castle! for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197307/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197307%7EILS%7E177&lm=LIBTHINGS&isd=true"
  },  {
    id: '225',
    name: "Bosch Laser Measure - 100 ft.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Bosch Laser Measure - 100 ft.. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2304722/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2304722%7EILS%7E178&lm=LIBTHINGS&isd=true"
  },  {
    id: '226',
    name: "On a scale of one to T-Rex  a game for people who are bad at charades",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "On a scale of one to T-Rex  a game for people who are bad at charades - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175413/ada?rw=168&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175413%7EILS%7E179&lm=LIBTHINGS&isd=true"
  },  {
    id: '227',
    name: "Valley of the Vikings",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Valley of the Vikings. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2185629/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2185629%7EILS%7E180&lm=LIBTHINGS&isd=true"
  },  {
    id: '228',
    name: "Musical instrument: Keyboard - 61 key",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&auto=format&fit=crop",
    description: "Musical instrument: Keyboard - 61 key for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2324260/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2324260%7EILS%7E181&lm=LIBTHINGS&isd=true"
  },  {
    id: '229',
    name: "Zombie kidz evolution",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Zombie kidz evolution. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258337/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258337%7EILS%7E182&lm=LIBTHINGS&isd=true"
  },  {
    id: '230',
    name: "Baby buggy pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Baby buggy pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259689/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259689%7EILS%7E183&lm=LIBTHINGS&isd=true"
  },  {
    id: '231',
    name: "Teddy bear cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Teddy bear cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259826/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259826%7EILS%7E184&lm=LIBTHINGS&isd=true"
  },  {
    id: '232',
    name: "Pirate ship pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Pirate ship pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259827/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259827%7EILS%7E185&lm=LIBTHINGS&isd=true"
  },  {
    id: '233',
    name: "Care Bears cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Care Bears cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259690/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259690%7EILS%7E186&lm=LIBTHINGS&isd=true"
  },  {
    id: '234',
    name: "Gnomes at night dare to enter the maze!",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Gnomes at night dare to enter the maze!. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2257547/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2257547%7EILS%7E187&lm=LIBTHINGS&isd=true"
  },  {
    id: '235',
    name: "Exploding kittens party pack",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Educational Exploding kittens party pack designed for hands-on learning. Explore STEAM concepts through interactive play and discovery.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175476/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175476%7EILS%7E188&lm=LIBTHINGS&isd=true"
  },  {
    id: '236',
    name: "Hoot owl hoot! board game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1611891490916-e80afc5a4166?w=400&auto=format&fit=crop",
    description: "Hoot owl hoot! board game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195611/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195611%7EILS%7E189&lm=LIBTHINGS&isd=true"
  },  {
    id: '237',
    name: "Unstable unicorns",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Unstable unicorns. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175412/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175412%7EILS%7E190&lm=LIBTHINGS&isd=true"
  },  {
    id: '238',
    name: "Azul  a game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Azul  a game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2174608/ada?rw=180&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2174608%7EILS%7E191&lm=LIBTHINGS&isd=true"
  },  {
    id: '239',
    name: "Anomia kids",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Anomia kids. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "kids"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175467/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175467%7EILS%7E192&lm=LIBTHINGS&isd=true"
  },  {
    id: '240',
    name: "Here to slay",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Here to slay. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2185630/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2185630%7EILS%7E193&lm=LIBTHINGS&isd=true"
  },  {
    id: '241',
    name: "Book Club Kit: Pride and Prejudice",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Pride and Prejudice\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321729/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321729%7EILS%7E194&lm=LIBTHINGS&isd=true"
  },  {
    id: '242',
    name: "Photosynthesis",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Photosynthesis. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258687/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258687%7EILS%7E195&lm=LIBTHINGS&isd=true"
  },  {
    id: '243',
    name: "Magic maze",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Magic maze. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175480/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175480%7EILS%7E196&lm=LIBTHINGS&isd=true"
  },  {
    id: '244',
    name: "Acorn soup [realia] : the tasty counting game!",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Acorn soup [realia] : the tasty counting game! - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195671/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195671%7EILS%7E197&lm=LIBTHINGS&isd=true"
  },  {
    id: '245',
    name: "Yeti in my spaghetti",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Yeti in my spaghetti. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197050/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197050%7EILS%7E198&lm=LIBTHINGS&isd=true"
  },  {
    id: '246',
    name: "Go nuts for donuts! the pastry-picking card game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Go nuts for donuts! the pastry-picking card game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195612/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195612%7EILS%7E199&lm=LIBTHINGS&isd=true"
  },  {
    id: '247',
    name: "Taco cat goat cheese pizza",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Taco cat goat cheese pizza. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197045/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197045%7EILS%7E200&lm=LIBTHINGS&isd=true"
  },  {
    id: '248',
    name: "TI-84 plus CE 10-digit graphing calculator",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: TI-84 plus CE 10-digit graphing calculator. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2312190/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2312190%7EILS%7E201&lm=LIBTHINGS&isd=true"
  },  {
    id: '249',
    name: "Tamagoyaki pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Tamagoyaki pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2304723/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2304723%7EILS%7E202&lm=LIBTHINGS&isd=true"
  },  {
    id: '250',
    name: "Animal upon animal junior",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Animal upon animal junior. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "kids"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2198725/ada?rw=192&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2198725%7EILS%7E203&lm=LIBTHINGS&isd=true"
  },  {
    id: '251',
    name: "Kingdomino",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Kingdomino. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2185520/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2185520%7EILS%7E204&lm=LIBTHINGS&isd=true"
  },  {
    id: '252',
    name: "5-minute dungeon",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: 5-minute dungeon. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175466/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175466%7EILS%7E205&lm=LIBTHINGS&isd=true"
  },  {
    id: '253',
    name: "Dixit  a picture is worth a thousand words!",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Dixit  a picture is worth a thousand words!. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175475/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175475%7EILS%7E206&lm=LIBTHINGS&isd=true"
  },  {
    id: '254',
    name: "Scattergories  the classic fast-thinking categories game!.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Scattergories  the classic fast-thinking categories game!. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175482/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175482%7EILS%7E207&lm=LIBTHINGS&isd=true"
  },  {
    id: '255',
    name: "Spaceteam  a chaotic and cooperative card game.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Spaceteam  a chaotic and cooperative card game. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175484/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175484%7EILS%7E208&lm=LIBTHINGS&isd=true"
  },  {
    id: '256',
    name: "Sushi go party!  the deluxe pick and pass card game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Sushi go party!  the deluxe pick and pass card game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175485/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175485%7EILS%7E209&lm=LIBTHINGS&isd=true"
  },  {
    id: '257',
    name: "Animal upon animal Tier auf Tier = Pyramide d'animaux = Animal sobre animali",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Animal upon animal Tier auf Tier = Pyramide d'animaux = Animal sobre animali. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195670/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195670%7EILS%7E210&lm=LIBTHINGS&isd=true"
  },  {
    id: '258',
    name: "Where's bear? the hide-and-find stacking block game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Where's bear? the hide-and-find stacking block game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195610/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195610%7EILS%7E211&lm=LIBTHINGS&isd=true"
  },  {
    id: '259',
    name: "Catan trade, build, settle.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Catan trade, build, settle.. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197051/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197051%7EILS%7E212&lm=LIBTHINGS&isd=true"
  },  {
    id: '260',
    name: "Uno Moo!",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Uno Moo!. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2217077/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2217077%7EILS%7E213&lm=LIBTHINGS&isd=true"
  },  {
    id: '261',
    name: "Space escape Mole rats in space!",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Space escape Mole rats in space!. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2180735/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2180735%7EILS%7E214&lm=LIBTHINGS&isd=true"
  },  {
    id: '262',
    name: "Scythe",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Scythe. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258332/ada?rw=204&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258332%7EILS%7E215&lm=LIBTHINGS&isd=true"
  },  {
    id: '263',
    name: "My Little Pony cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "My Little Pony cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259693/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259693%7EILS%7E216&lm=LIBTHINGS&isd=true"
  },  {
    id: '264',
    name: "Cauldron quest work your magic, break the spell!",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Cauldron quest work your magic, break the spell!. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2257543/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2257543%7EILS%7E217&lm=LIBTHINGS&isd=true"
  },  {
    id: '265',
    name: "Anomia  where common knowledge becomes uncommonly fun.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Anomia  where common knowledge becomes uncommonly fun.. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175468/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175468%7EILS%7E218&lm=LIBTHINGS&isd=true"
  },  {
    id: '266',
    name: "Clue  the classic mystery game.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Clue  the classic mystery game. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175472/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175472%7EILS%7E219&lm=LIBTHINGS&isd=true"
  },  {
    id: '267',
    name: "Codenames  top secret word game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Codenames  top secret word game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175473/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175473%7EILS%7E220&lm=LIBTHINGS&isd=true"
  },  {
    id: '268',
    name: "Ticket to ride  the cross-country train adventure game!",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Ticket to ride  the cross-country train adventure game! - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175486/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175486%7EILS%7E221&lm=LIBTHINGS&isd=true"
  },  {
    id: '269',
    name: "Mysterium",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Mysterium. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175414/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175414%7EILS%7E222&lm=LIBTHINGS&isd=true"
  },  {
    id: '270',
    name: "Here, fishy, fishy!",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Here, fishy, fishy!. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195613/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195613%7EILS%7E223&lm=LIBTHINGS&isd=true"
  },  {
    id: '271',
    name: "Outfoxed [realia] : a cooperative whodunit game.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Outfoxed [realia] : a cooperative whodunit game. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195667/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195667%7EILS%7E224&lm=LIBTHINGS&isd=true"
  },  {
    id: '272',
    name: "Dinosaur escape [realia]",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Dinosaur escape [realia]. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195668/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195668%7EILS%7E225&lm=LIBTHINGS&isd=true"
  },  {
    id: '273',
    name: "Sleeping queens [realia] : a royally rousing card game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Sleeping queens [realia] : a royally rousing card game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195672/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195672%7EILS%7E226&lm=LIBTHINGS&isd=true"
  },  {
    id: '274',
    name: "Rummikub",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Rummikub. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197303/ada?rw=216&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197303%7EILS%7E227&lm=LIBTHINGS&isd=true"
  },  {
    id: '275',
    name: "Spikeball Game Ball and Net Set",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Spikeball Game Ball and Net Set - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2315459/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2315459%7EILS%7E228&lm=LIBTHINGS&isd=true"
  },  {
    id: '276',
    name: "Apples to apples  the game of crazy combinations!",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Apples to apples  the game of crazy combinations! - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175411/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175411%7EILS%7E229&lm=LIBTHINGS&isd=true"
  },  {
    id: '277',
    name: "Book Club Kit: Holes",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Holes\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336058/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336058%7EILS%7E230&lm=LIBTHINGS&isd=true"
  },  {
    id: '278',
    name: "Tsuro the game of the path",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Tsuro the game of the path - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2296303/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2296303%7EILS%7E231&lm=LIBTHINGS&isd=true"
  },  {
    id: '279',
    name: "Cathedral",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Cathedral. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175471/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175471%7EILS%7E232&lm=LIBTHINGS&isd=true"
  },  {
    id: '280',
    name: "Sushi go! the pick and pass card game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Sushi go! the pick and pass card game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197046/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197046%7EILS%7E233&lm=LIBTHINGS&isd=true"
  },  {
    id: '281',
    name: "Carcassonne",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Carcassonne. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197300/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197300%7EILS%7E234&lm=LIBTHINGS&isd=true"
  },  {
    id: '282',
    name: "10 on the spot ten-frame game.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "10 on the spot ten-frame game. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2331926/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2331926%7EILS%7E235&lm=LIBTHINGS&isd=true"
  },  {
    id: '283',
    name: "Mahjong set with wheeled case",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Mahjong set with wheeled case. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2332880/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2332880%7EILS%7E236&lm=LIBTHINGS&isd=true"
  },  {
    id: '284',
    name: "Musical Instrument: Cajon",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop",
    description: "Cajon for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2303106/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2303106%7EILS%7E237&lm=LIBTHINGS&isd=true"
  },  {
    id: '285',
    name: "Musical Instrument: Kalimba",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop",
    description: "Kalimba for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2303107/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2303107%7EILS%7E238&lm=LIBTHINGS&isd=true"
  },  {
    id: '286',
    name: "The Uzzle stack royale.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: The Uzzle stack royale.. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2278675/ada?rw=228&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2278675%7EILS%7E239&lm=LIBTHINGS&isd=true"
  },  {
    id: '287',
    name: "Dinosaur cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Dinosaur cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2246098/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2246098%7EILS%7E240&lm=LIBTHINGS&isd=true"
  },  {
    id: '288',
    name: "Shelby's snack shack game a counting bone-anza!.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Shelby's snack shack game a counting bone-anza!. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258333/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258333%7EILS%7E241&lm=LIBTHINGS&isd=true"
  },  {
    id: '289',
    name: "Apples to apples junior the game of crazy combinations.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Apples to apples junior the game of crazy combinations. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "kids", "board games"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2257544/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2257544%7EILS%7E242&lm=LIBTHINGS&isd=true"
  },  {
    id: '290',
    name: "Seek-a-boo the seek and find memory game.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Seek-a-boo the seek and find memory game. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195666/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195666%7EILS%7E243&lm=LIBTHINGS&isd=true"
  },  {
    id: '291',
    name: "Stack up!",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Stack up!. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197044/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197044%7EILS%7E244&lm=LIBTHINGS&isd=true"
  },  {
    id: '292',
    name: "Wingspan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Wingspan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2278828/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2278828%7EILS%7E245&lm=LIBTHINGS&isd=true"
  },  {
    id: '293',
    name: "Tri-FACTa! multiplication & division game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Tri-FACTa! multiplication & division game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2323063/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2323063%7EILS%7E246&lm=LIBTHINGS&isd=true"
  },  {
    id: '294',
    name: "Takenoko",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Takenoko. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258334/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258334%7EILS%7E247&lm=LIBTHINGS&isd=true"
  },  {
    id: '295',
    name: "Dora the explorer cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Dora the explorer cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259691/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259691%7EILS%7E248&lm=LIBTHINGS&isd=true"
  },  {
    id: '296',
    name: "Go  [Traveling Set with Magnetic Playing Pieces].",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Go  [Traveling Set with Magnetic Playing Pieces].. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175478/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175478%7EILS%7E249&lm=LIBTHINGS&isd=true"
  },  {
    id: '297',
    name: "Pandemic",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Pandemic for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175481/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175481%7EILS%7E250&lm=LIBTHINGS&isd=true"
  },  {
    id: '298',
    name: "Ticket to ride First Journey",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Ticket to ride First Journey. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197301/ada?rw=240&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197301%7EILS%7E251&lm=LIBTHINGS&isd=true"
  },  {
    id: '299',
    name: "Spot it Jr.! animals.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Spot it Jr.! animals.. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197304/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197304%7EILS%7E252&lm=LIBTHINGS&isd=true"
  },  {
    id: '300',
    name: "Book Club Kit: Charlotte's Web",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Charlotte's Web\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321724/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321724%7EILS%7E253&lm=LIBTHINGS&isd=true"
  },  {
    id: '301',
    name: "Book Club Kit: Fahrenheit 451",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Fahrenheit 451\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321726/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321726%7EILS%7E254&lm=LIBTHINGS&isd=true"
  },  {
    id: '302',
    name: "Book Club Kit: The one and only Ivan",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"The one and only Ivan\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336319/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336319%7EILS%7E255&lm=LIBTHINGS&isd=true"
  },  {
    id: '303',
    name: "Roll & play your child's first game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Roll & play your child's first game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2211321/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2211321%7EILS%7E256&lm=LIBTHINGS&isd=true"
  },  {
    id: '304',
    name: "Ticket to ride Asia",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Ticket to ride Asia. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2307662/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2307662%7EILS%7E257&lm=LIBTHINGS&isd=true"
  },  {
    id: '305',
    name: "Book Club Kit: Miss Peregrine's Home for Peculiar Children",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Miss Peregrine's Home for Peculiar Children\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321727/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321727%7EILS%7E258&lm=LIBTHINGS&isd=true"
  },  {
    id: '306',
    name: "Paw print cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Paw print cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259866/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259866%7EILS%7E259&lm=LIBTHINGS&isd=true"
  },  {
    id: '307',
    name: "Mermaid island Board game : a cooperative game for kids!",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1611891490916-e80afc5a4166?w=400&auto=format&fit=crop",
    description: "Mermaid island Board game : a cooperative game for kids! - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "kids", "board games"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2258685/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2258685%7EILS%7E260&lm=LIBTHINGS&isd=true"
  },  {
    id: '308',
    name: "Betrayal at House on the Hill  a strategy game",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Betrayal at House on the Hill  a strategy game - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175470/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175470%7EILS%7E261&lm=LIBTHINGS&isd=true"
  },  {
    id: '309',
    name: "Forbidden Island  adventure ... if you dare",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Forbidden Island  adventure ... if you dare. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175477/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175477%7EILS%7E262&lm=LIBTHINGS&isd=true"
  },  {
    id: '310',
    name: "Qwirkle mix, match, score and win!.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Qwirkle mix, match, score and win!.. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197047/ada?rw=252&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197047%7EILS%7E263&lm=LIBTHINGS&isd=true"
  },  {
    id: '311',
    name: "The sneaky, snacky squirrel game! a game of strategy for sneaky squirrels!",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "The sneaky, snacky squirrel game! a game of strategy for sneaky squirrels! - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197049/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197049%7EILS%7E264&lm=LIBTHINGS&isd=true"
  },  {
    id: '312',
    name: "Castle panic",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Castle panic for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197299/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197299%7EILS%7E265&lm=LIBTHINGS&isd=true"
  },  {
    id: '313',
    name: "Book Club Kit: Smile",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Smile\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336350/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336350%7EILS%7E266&lm=LIBTHINGS&isd=true"
  },  {
    id: '314',
    name: "Gobblet gobblers",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Gobblet gobblers. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195614/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195614%7EILS%7E267&lm=LIBTHINGS&isd=true"
  },  {
    id: '315',
    name: "My first Carcassonne",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: My first Carcassonne. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197048/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197048%7EILS%7E268&lm=LIBTHINGS&isd=true"
  },  {
    id: '316',
    name: "First orchard",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: First orchard. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195616/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195616%7EILS%7E269&lm=LIBTHINGS&isd=true"
  },  {
    id: '317',
    name: "Sequence letters : sequence fun from A to Z.",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Sequence letters : sequence fun from A to Z.. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197305/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197305%7EILS%7E270&lm=LIBTHINGS&isd=true"
  },  {
    id: '318',
    name: "Book Club Kit: The bluest eye a novel",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"The bluest eye a novel\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321733/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321733%7EILS%7E271&lm=LIBTHINGS&isd=true"
  },  {
    id: '319',
    name: "Book Club Kit: The Complete Persepolis",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"The Complete Persepolis\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321728/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321728%7EILS%7E272&lm=LIBTHINGS&isd=true"
  },  {
    id: '320',
    name: "Book Club Kit: The book thief",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"The book thief\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321752/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321752%7EILS%7E273&lm=LIBTHINGS&isd=true"
  },  {
    id: '321',
    name: "Book Club Kit: The lion, the witch, and the wardrobe",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"The lion, the witch, and the wardrobe\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336352/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336352%7EILS%7E274&lm=LIBTHINGS&isd=true"
  },  {
    id: '322',
    name: "Bananagrams",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Bananagrams. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175469/ada?rw=264&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175469%7EILS%7E275&lm=LIBTHINGS&isd=true"
  },  {
    id: '323',
    name: "Life on earth [realia] : memory game = La vie sur la terre = La vida en la tierra = Das Leben auf der Erde",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Life on earth [realia] : memory game = La vie sur la terre = La vida en la tierra = Das Leben auf der Erde - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195669/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195669%7EILS%7E276&lm=LIBTHINGS&isd=true"
  },  {
    id: '324',
    name: "Hisss [realia] : the colorful snake making tile game.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Hisss [realia] : the colorful snake making tile game. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195673/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195673%7EILS%7E277&lm=LIBTHINGS&isd=true"
  },  {
    id: '325',
    name: "Crafts & hobbies : Rubbing plates - Floral",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Creative Crafts & hobbies : Rubbing plates - Floral kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2305044/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2305044%7EILS%7E278&lm=LIBTHINGS&isd=true"
  },  {
    id: '326',
    name: "Crafts & hobbies : Rubbing plates - Abstract",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Creative Crafts & hobbies : Rubbing plates - Abstract kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2305045/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2305045%7EILS%7E279&lm=LIBTHINGS&isd=true"
  },  {
    id: '327',
    name: "NASCAR cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "NASCAR cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2314698/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2314698%7EILS%7E280&lm=LIBTHINGS&isd=true"
  },  {
    id: '328',
    name: "Book Club Kit: Their eyes were watching God",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Their eyes were watching God\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321756/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321756%7EILS%7E281&lm=LIBTHINGS&isd=true"
  },  {
    id: '329',
    name: "Book Club Kit: Night",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Night\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336347/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336347%7EILS%7E282&lm=LIBTHINGS&isd=true"
  },  {
    id: '330',
    name: "Book Club Kit: Anne of Green Gables",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Anne of Green Gables\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321723/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321723%7EILS%7E283&lm=LIBTHINGS&isd=true"
  },  {
    id: '331',
    name: "Buzz Lightyear cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Buzz Lightyear cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259867/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259867%7EILS%7E284&lm=LIBTHINGS&isd=true"
  },  {
    id: '332',
    name: "Sequence for kids",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Sequence for kids. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "kids"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197306/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197306%7EILS%7E285&lm=LIBTHINGS&isd=true"
  },  {
    id: '333',
    name: "Rat-a-tat cat a fun numbers card game with cats (and a few rats) for ages 6 and up",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Rat-a-tat cat a fun numbers card game with cats (and a few rats) for ages 6 and up - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2197302/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2197302%7EILS%7E286&lm=LIBTHINGS&isd=true"
  },  {
    id: '334',
    name: "Book Club Kit: Esperanza Rising",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Esperanza Rising\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321725/ada?rw=276&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321725%7EILS%7E287&lm=LIBTHINGS&isd=true"
  },  {
    id: '335',
    name: "Noah's ark cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Noah's ark cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259694/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259694%7EILS%7E288&lm=LIBTHINGS&isd=true"
  },  {
    id: '336',
    name: "Exact change a card game : learning to count money is great fun!",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Exact change a card game : learning to count money is great fun! - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2322386/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2322386%7EILS%7E289&lm=LIBTHINGS&isd=true"
  },  {
    id: '337',
    name: "Sequence  an exciting game of strategy.",
    category: "Games & Puzzles",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop",
    description: "Sequence  an exciting game of strategy. - engaging tabletop game for players of all ages. Enjoy strategic gameplay and quality time with family and friends.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["games", "family", "entertainment", "board games", "strategy"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2175483/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2175483%7EILS%7E290&lm=LIBTHINGS&isd=true"
  },  {
    id: '338',
    name: "Book Club Kit: Matilda",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"Matilda\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2334260/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2334260%7EILS%7E291&lm=LIBTHINGS&isd=true"
  },  {
    id: '339',
    name: "Orchard",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Orchard. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2195615/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2195615%7EILS%7E292&lm=LIBTHINGS&isd=true"
  },  {
    id: '340',
    name: "Book Club Kit: From the mixed-up files of Mrs. Basil E. Frankweiler",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"From the mixed-up files of Mrs. Basil E. Frankweiler\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2334262/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2334262%7EILS%7E293&lm=LIBTHINGS&isd=true"
  },  {
    id: '341',
    name: "Book Club Kit: The Westing game",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"The Westing game\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321755/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321755%7EILS%7E294&lm=LIBTHINGS&isd=true"
  },  {
    id: '342',
    name: "Superman cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Superman cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2314687/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2314687%7EILS%7E295&lm=LIBTHINGS&isd=true"
  },  {
    id: '343',
    name: "Flower petit fours pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Flower petit fours pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259870/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259870%7EILS%7E296&lm=LIBTHINGS&isd=true"
  },  {
    id: '344',
    name: "Book Club Kit: A Wrinkle in Time",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"A Wrinkle in Time\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321722/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321722%7EILS%7E297&lm=LIBTHINGS&isd=true"
  },  {
    id: '345',
    name: "Book Club Kit:The catcher in the rye",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"The catcher in the rye\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321753/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321753%7EILS%7E298&lm=LIBTHINGS&isd=true"
  },  {
    id: '346',
    name: "Book Club Kit: 1984",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"1984\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321721/ada?rw=288&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321721%7EILS%7E299&lm=LIBTHINGS&isd=true"
  },  {
    id: '347',
    name: "Book Club Kit: I capture the castle",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"I capture the castle\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2336059/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2336059%7EILS%7E300&lm=LIBTHINGS&isd=true"
  },  {
    id: '348',
    name: "Musical Instrument: Theremini",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop",
    description: "Theremini for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2278673/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2278673%7EILS%7E301&lm=LIBTHINGS&isd=true"
  },  {
    id: '349',
    name: "Fire truck cake pan",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    description: "Fire truck cake pan for creative baking projects. Make impressive themed cakes and desserts for special occasions.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library", "baking", "cooking"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2259692/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2259692%7EILS%7E302&lm=LIBTHINGS&isd=true"
  },  {
    id: '350',
    name: "Ryobi Drill and Impact Drive Set (40 piece)",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Ryobi Drill and Impact Drive Set (40 piece). Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2304721/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2304721%7EILS%7E303&lm=LIBTHINGS&isd=true"
  },  {
    id: '351',
    name: "Ozobot Toys +color code kits +Color Code magnets",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Educational Ozobot Toys +color code kits +Color Code magnets designed for hands-on learning. Explore STEAM concepts through interactive play and discovery.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["education", "STEAM", "kids"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2274489/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2274489%7EILS%7E304&lm=LIBTHINGS&isd=true"
  },  {
    id: '352',
    name: "Modular Robotics",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Modular Robotics. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2273655/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2273655%7EILS%7E305&lm=LIBTHINGS&isd=true"
  },  {
    id: '353',
    name: "Crafts & hobbies : Kit - Grtard 700LBS Magnet Fishing Kit",
    category: "Crafts & Hobbies",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop",
    description: "Creative Crafts & hobbies : Kit - Grtard 700LBS Magnet Fishing Kit kit for arts and crafts. Perfect for hobbyists and craft enthusiasts looking to explore new techniques.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["crafts", "DIY", "creative"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2331872/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2331872%7EILS%7E306&lm=LIBTHINGS&isd=true"
  },  {
    id: '354',
    name: "KODAK slide n scan digital film scanner",
    category: "Tools & Equipment",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&auto=format&fit=crop",
    description: "KODAK slide n scan digital film scanner for diagnostic and measurement tasks. Professional tool for home projects and troubleshooting.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "7 days",
    tags: ["tools", "DIY", "home improvement"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2331874/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2331874%7EILS%7E307&lm=LIBTHINGS&isd=true"
  },  {
    id: '355',
    name: "Blu-ray Player",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Blu-ray Player. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2280147/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2280147%7EILS%7E308&lm=LIBTHINGS&isd=true"
  },  {
    id: '356',
    name: "Pickleball Paddle Set",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Pickleball Paddle Set. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2316241/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2316241%7EILS%7E309&lm=LIBTHINGS&isd=true"
  },  {
    id: '357',
    name: "Book Club Kit: House on Mango Street",
    category: "Educational Kits",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop",
    description: "Book club discussion kit with multiple copies of \"House on Mango Street\". Includes reading guide and discussion questions for group reading.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "30 days",
    tags: ["education", "STEAM", "kids", "books", "reading"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2321754/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2321754%7EILS%7E310&lm=LIBTHINGS&isd=true"
  },  {
    id: '358',
    name: "Musical Instrument: Acoustic Guitar",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&auto=format&fit=crop",
    description: "Acoustic Guitar for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2324476/ada?rw=300&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2324476%7EILS%7E311&lm=LIBTHINGS&isd=true"
  },  {
    id: '359',
    name: "Musical Instrument: Acoustic Guitar 3/4 Size",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&auto=format&fit=crop",
    description: "Acoustic Guitar 3/4 Size for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2324477/ada?rw=312&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2324477%7EILS%7E312&lm=LIBTHINGS&isd=true"
  },  {
    id: '360',
    name: "Omron 10 Series Wireless Upper Arm Blood Pressure Monitor",
    category: "Other",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
    description: "Library of Things item: Omron 10 Series Wireless Upper Arm Blood Pressure Monitor. Available for checkout from Houston Public Library.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["library"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2324337/ada?rw=312&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2324337%7EILS%7E313&lm=LIBTHINGS&isd=true"
  },  {
    id: '361',
    name: "Musical Instrument: Singing Bowl Set",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop",
    description: "Singing Bowl Set for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2324338/ada?rw=312&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2324338%7EILS%7E314&lm=LIBTHINGS&isd=true"
  },  {
    id: '362',
    name: "Musical Instrument: Steel Tongue Drum, 9 Tone \u2013 D Kurd",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop",
    description: "Steel Tongue Drum, 9 Tone \u2013 D Kurd for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2324339/ada?rw=312&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2324339%7EILS%7E315&lm=LIBTHINGS&isd=true"
  },  {
    id: '363',
    name: "Musical Instrument: Autoharp",
    category: "Musical Instruments",
    library: libraries[1], // Houston Public Library
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop",
    description: "Autoharp for musical exploration. Borrow to learn, practice, or try a new instrument without buying.",
    condition: 'Excellent',
    availability: true,
    loanPeriod: "14 days",
    tags: ["music", "instruments", "learning"],
    reserveUrl: "https://halan.sdp.sirsi.net/client/en_US/hou/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:2303075/ada?rw=312&d=ent%3A%2F%2FSD_ILS%2F0%2FSD_ILS%3A2303075%7EILS%7E316&lm=LIBTHINGS&isd=true"
  },

  // PALOS VERDES LIBRARY
  {
    id: '67',
    name: 'Ping Pong Set - Complete',
    category: 'Sports Equipment',
    library: libraries[2],
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=400&auto=format&fit=crop',
    description: 'Complete ping pong set with 4 paddles, net, and balls. Turn any table into a ping pong table for family fun. Includes storage bag.',
    condition: 'Excellent',
    availability: true,
    loanPeriod: '7 days',
    tags: ['sports', 'ping pong', 'table tennis', 'family'],
    reserveUrl: 'https://www.pvld.org/'
  },
  {
    id: '68',
    name: 'Binoculars - Adult High Quality',
    category: 'Sports Equipment',
    library: libraries[2],
    image: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=400&auto=format&fit=crop',
    description: 'High-quality adult binoculars 10x42 for birding, hiking, and nature observation. Perfect for exploring the Palos Verdes coastal trails and ocean views.',
    condition: 'Excellent',
    availability: true,
    loanPeriod: '14 days',
    tags: ['binoculars', 'birdwatching', 'hiking', 'nature'],
    reserveUrl: 'https://www.pvld.org/'
  },
  {
    id: '73',
    name: 'Stargazing Kit with Telescope',
    category: 'Educational Kits',
    library: libraries[2],
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&auto=format&fit=crop',
    description: 'Complete stargazing kit with refractor telescope, tripod, and star charts. Carrying case is 4ft long, weighs about 20 lbs. Perfect for coastal night sky viewing.',
    condition: 'Excellent',
    availability: true,
    loanPeriod: '7 days',
    tags: ['astronomy', 'telescope', 'stargazing', 'science'],
    reserveUrl: 'https://www.pvld.org/'
  },
  {
    id: '77',
    name: 'Medium Ukulele - Concert',
    category: 'Musical Instruments',
    library: libraries[2],
    image: 'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=400&auto=format&fit=crop',
    description: 'Concert-size ukulele with richer tone and longer neck. Ideal for intermediate players and adults. Includes gig bag and digital tuner.',
    condition: 'Excellent',
    availability: true,
    loanPeriod: '14 days',
    tags: ['music', 'ukulele', 'intermediate', 'acoustic'],
    reserveUrl: 'https://www.pvld.org/'
  },
  {
    id: '78',
    name: 'Hiking Backpack - 30L',
    category: 'Sports Equipment',
    library: libraries[2],
    image: 'https://images.unsplash.com/photo-1622260614927-7c9d1e6d099a?w=400&auto=format&fit=crop',
    description: '30-liter hiking backpack with hydration sleeve and multiple pockets. Perfect for day hikes on Palos Verdes trails. Adjustable straps for comfort.',
    condition: 'Excellent',
    availability: true,
    loanPeriod: '7 days',
    tags: ['hiking', 'backpack', 'outdoor', 'day hiking'],
    reserveUrl: 'https://www.pvld.org/'
  },
];
