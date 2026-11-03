export interface QuickAction {
  label: string;
  prompt: string;
}

export interface BotAnswer {
  text: string;
  vehicles?: any[];
  quickActions?: QuickAction[];
}

export interface KnowledgeNode {
  id: string;
  keywords: string[];
  phrases?: string[];
  handler: (query: string, fleet: any[]) => BotAnswer;
}

// Format currency
const formatLKR = (amount: number) => {
  return `LKR ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const CONCIERGE_KNOWLEDGE: KnowledgeNode[] = [
  // 1. Greetings
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'wassup', 'yo', 'halo'],
    phrases: ['good morning', 'good afternoon', 'good evening', 'who are you', 'what can you do', 'how are you'],
    handler: (_q, fleet) => ({
      text: `Greetings! Welcome to **DriveX VIP Concierge**. I am your dedicated AI fleet advisor, available 24/7.\n\nI can help you with:\n• **Fleet Recommendations & Availability** (Sports, Luxury Sedans, SUVs, Vans)\n• **Security Deposits & Pricing Policies**\n• **Driver License & Rental Requirements**\n• **Executive Chauffeur Service**\n• **Pickup & Airport VIP Handover**\n• **24/7 Roadside Breakdown Assistance**\n\nHow may I elevate your journey today?`,
      vehicles: fleet.slice(0, 2),
      quickActions: [
        { label: '🏎️ Recommend a Supercar', prompt: 'Recommend a high-performance sports car' },
        { label: '🚙 Executive SUV for Road Trip', prompt: 'What luxury SUVs do you have for a family trip?' },
        { label: '💰 Pricing & Deposit Policy', prompt: 'What are your security deposit and payment terms?' },
        { label: '👨‍✈️ Chauffeur Driver Service', prompt: 'How does the private chauffeur service work?' }
      ]
    })
  },

  // 2. Appreciation & Thanks
  {
    id: 'thanks',
    keywords: ['thanks', 'thank', 'thx', 'appreciate', 'helpful', 'awesome', 'great', 'perfect', 'cool'],
    phrases: ['thank you', 'thanks a lot', 'thank you so much', 'great job'],
    handler: () => ({
      text: `You are very welcome! It is our utmost priority to provide you with a world-class luxury rental experience.\n\nIf you have any further questions about your reservation, vehicle specs, or road support, I am right here. Have a phenomenal drive!`,
      quickActions: [
        { label: '🏎️ Browse Fleet', prompt: 'Show me all available vehicles' },
        { label: '📍 Pickup Locations', prompt: 'Where are your pickup locations?' }
      ]
    })
  },

  // 3. Farewell
  {
    id: 'farewell',
    keywords: ['bye', 'goodbye', 'cya', 'farewell'],
    phrases: ['see you', 'take care', 'have a good day'],
    handler: () => ({
      text: `Thank you for choosing DriveX! Safe travels and enjoy every mile on the open road. Our 24/7 concierge desk remains available whenever you need us.`,
      quickActions: [
        { label: '📞 Emergency Hotline', prompt: 'What is your emergency contact number?' }
      ]
    })
  },

  // 4. How to Book / Reservation Process
  {
    id: 'booking_process',
    keywords: ['book', 'reserve', 'rent', 'process', 'steps', 'online', 'reservation'],
    phrases: ['how to book', 'how do i book', 'how does it work', 'how to rent a car', 'booking steps'],
    handler: () => ({
      text: `### 🚀 Reserving a Vehicle with DriveX\n\nBooking your dream car takes under 2 minutes:\n\n1. **Browse Fleet**: Head to **Book Vehicle** from your dashboard to view all available cars, categories, and real-time daily rates.\n2. **Select Dates & Station**: Choose your pickup and return dates, times, and preferred station (Downtown, Airport, or Doorstep Delivery).\n3. **Customize Extras**: Choose optional Chauffeur Service, Child Safety Seats, GPS, or Zero-Deductible Insurance.\n4. **Instant Confirmation**: Review the price breakdown and confirm. You will receive an instant **BK-XXXX** reference code and digital receipt.\n\nReady to get started?`,
      quickActions: [
        { label: '🏎️ Explore Fleet Now', prompt: 'Show me all available vehicles' },
        { label: '💳 Deposit & Payment Info', prompt: 'What are your payment and deposit terms?' }
      ]
    })
  },

  // 5. Fleet / Show All Cars
  {
    id: 'fleet_overview',
    keywords: ['fleet', 'cars', 'vehicles', 'models', 'inventory', 'all'],
    phrases: ['show me cars', 'what cars do you have', 'all vehicles', 'fleet list', 'car catalog', 'what vehicles are available'],
    handler: (_q, fleet) => ({
      text: `### 🚗 DriveX Curated Fleet Overview\n\nOur fleet ranges from agile city compacts to commanding luxury SUVs and executive saloons:\n\n• **Economy & Compact**: Toyota Yaris, Honda Fit, Volkswagen Golf (from $45/day)\n• **Mid-Size & Executive**: Toyota Camry, Honda Accord (from $70/day)\n• **Luxury & Prestige**: Mercedes-Benz E-Class, BMW 5 Series (from $140/day)\n• **SUVs & Crossovers**: Toyota RAV4, Ford Explorer (from $90/day)\n• **Passenger Vans**: Ford Transit 12-Seater (from $120/day)\n\nHere are some of our top available models:`,
      vehicles: fleet.slice(0, 3),
      quickActions: [
        { label: '👑 Luxury Tier', prompt: 'Show me luxury cars' },
        { label: '🚙 SUV Tier', prompt: 'Show me SUV models' },
        { label: '💰 Most Affordable', prompt: 'What is the cheapest car to rent?' }
      ]
    })
  },

  // 6. Specific Brand: Mercedes-Benz
  {
    id: 'brand_mercedes',
    keywords: ['mercedes', 'benz', 'mercedes-benz', 'e-class', 'amg'],
    phrases: ['mercedes benz', 'e class'],
    handler: (_q, fleet) => {
      const cars = fleet.filter(v => (v.brand || '').toLowerCase().includes('mercedes'));
      return {
        text: `### ⭐ Mercedes-Benz Executive Collection\n\nThe **Mercedes-Benz E-Class** offers a masterclass in executive luxury, featuring whisper-quiet acoustic insulation, ambient mood illumination, and ultra-smooth automatic transmission.\n\n• **Daily Rate**: Approx $150 / day\n• **Engine**: Turbocharged Petrol\n• **Capacity**: 5 Passengers, 4 Large Luggage Cases\n• **Recommended For**: Corporate VIP transfers, wedding celebrations, and executive weekend touring.`,
        vehicles: cars.length > 0 ? cars : fleet.slice(0, 1),
        quickActions: [
          { label: '👨‍✈️ Book With Chauffeur', prompt: 'How does the private chauffeur service work?' },
          { label: 'BMW 5 Series Alternative', prompt: 'Do you have BMW?' }
        ]
      };
    }
  },

  // 7. Specific Brand: BMW
  {
    id: 'brand_bmw',
    keywords: ['bmw', '5 series', 'bimmer', 'm5', 'm8'],
    phrases: ['bmw 5 series'],
    handler: (_q, fleet) => {
      const cars = fleet.filter(v => (v.brand || '').toLowerCase().includes('bmw'));
      return {
        text: `### 🏁 BMW Pure Driving Dynamics\n\nThe **BMW 5 Series** combines executive elegance with sporty, responsive handling:\n\n• **Daily Rate**: Approx $140 / day\n• **Fuel**: Efficient Diesel Turbo (outstanding highway mileage)\n• **Interior**: Fine leather cockpit with intuitive iDrive navigation\n• **Seats**: 5 Passengers, 4 Suitcases`,
        vehicles: cars.length > 0 ? cars : fleet.slice(0, 1),
        quickActions: [
          { label: '🏎️ Compare with Mercedes', prompt: 'Do you have Mercedes?' },
          { label: '💰 Check Deposit Details', prompt: 'What is the deposit for luxury cars?' }
        ]
      };
    }
  },

  // 8. Specific Brand: Toyota
  {
    id: 'brand_toyota',
    keywords: ['toyota', 'yaris', 'camry', 'rav4', 'corolla', 'prado'],
    phrases: ['toyota yaris', 'toyota camry', 'toyota rav4'],
    handler: (_q, fleet) => {
      const cars = fleet.filter(v => (v.brand || '').toLowerCase().includes('toyota'));
      return {
        text: `### 🌟 Toyota Fleet Selection\n\nRenowned for peerless reliability, air-conditioned comfort, and hybrid fuel efficiency:\n\n• **Toyota Yaris** (Economy): $45/day — Agile, fuel-efficient city runabout.\n• **Toyota Camry** (Mid-Size Hybrid): $75/day — Plush executive sedan with generous rear legroom.\n• **Toyota RAV4** (Hybrid SUV): $90/day — Versatile, high clearance, ready for hill country and national parks.`,
        vehicles: cars.length > 0 ? cars : fleet.slice(0, 2),
        quickActions: [
          { label: '💰 Cheapest Option', prompt: 'Tell me about the Toyota Yaris' },
          { label: '🚙 Explore RAV4 SUV', prompt: 'Tell me about the Toyota RAV4' }
        ]
      };
    }
  },

  // 9. Specific Brand: Honda
  {
    id: 'brand_honda',
    keywords: ['honda', 'fit', 'accord', 'civic', 'vezel', 'crv'],
    phrases: ['honda fit', 'honda accord'],
    handler: (_q, fleet) => {
      const cars = fleet.filter(v => (v.brand || '').toLowerCase().includes('honda'));
      return {
        text: `### 🌿 Honda Precision Engineering\n\n• **Honda Fit** (Hybrid Compact): $48/day — Magic seating, surprisingly spacious, superb 22+ km/L efficiency.\n• **Honda Accord** (Executive Sedan): $70/day — Dynamic sports sedan with premium multimedia and safety sensing.`,
        vehicles: cars.length > 0 ? cars : fleet.slice(0, 2),
        quickActions: [
          { label: '💰 View Deposit Policy', prompt: 'What are your payment and deposit terms?' },
          { label: '🏎️ Browse Other Sedans', prompt: 'Show me luxury cars' }
        ]
      };
    }
  },

  // 10. Specific Brand: Volkswagen / Manual transmission
  {
    id: 'brand_vw',
    keywords: ['volkswagen', 'vw', 'golf', 'manual'],
    phrases: ['volkswagen golf', 'manual transmission', 'manual cars', 'do you have manual'],
    handler: (_q, fleet) => {
      const cars = fleet.filter(v => (v.brand || '').toLowerCase().includes('volkswagen') || (v.transmission || '').toLowerCase() === 'manual');
      return {
        text: `### 🕹️ Volkswagen Golf & Manual Fleet\n\nFor driving purists who love active gear engagement:\n\n• **Volkswagen Golf** (Compact): $55/day — 6-Speed Manual transmission, turbocharged petrol, precision German dynamics.\n• **Ford Transit** (Van): $120/day — Manual transmission, heavy-duty commercial torque.\n\nAll other vehicles in our fleet feature smooth, multi-stage Automatic transmissions.`,
        vehicles: cars.length > 0 ? cars : fleet.slice(0, 1),
        quickActions: [
          { label: '🚙 View Automatic SUVs', prompt: 'Show me SUV models' },
          { label: '📋 Driving License Rules', prompt: 'What documents are required to rent?' }
        ]
      };
    }
  },

  // 11. Large Groups / Vans / 7+ Seaters
  {
    id: 'vans_large_group',
    keywords: ['van', 'transit', 'group', 'passengers', '7 seater', '12 seater', 'minivan', 'seats', 'family'],
    phrases: ['large group', '12 seater van', 'van rental', '7 passenger', 'many people'],
    handler: (_q, fleet) => {
      const cars = fleet.filter(v => (v.seats || 0) >= 7 || (v.category_name || '').toLowerCase().includes('van'));
      return {
        text: `### 🚐 Group Travel & Multi-Passenger Fleet\n\nTraveling with extended family, a corporate delegation, or wedding guests?\n\n• **Ford Transit (12-Seater)**: $120/day — High-roof passenger van with individual reclining seats, rear AC vents, and massive luggage capacity.\n• **Ford Explorer (7-Seater SUV)**: $110/day — 3-row luxury family SUV with fold-flat rear seats and leather interior.\n\n*Pro Tip: For group excursions, hiring a professional DriveX Chauffeur ($35/day) allows everyone to relax and take in the scenery!*`,
        vehicles: cars.length > 0 ? cars : fleet.slice(0, 2),
        quickActions: [
          { label: '👨‍✈️ Add Private Chauffeur', prompt: 'How does the private chauffeur service work?' },
          { label: '📍 Airport VIP Transfer', prompt: 'Do you offer VIP pickup at Bandaranaike Airport?' }
        ]
      };
    }
  },

  // 12. SUVs & 4x4
  {
    id: 'suv_category',
    keywords: ['suv', 'crossover', '4x4', '4wd', 'jeep', 'explorer', 'rav4', 'ground clearance'],
    phrases: ['suv models', 'best suv', 'family suv', 'rent an suv'],
    handler: (_q, fleet) => {
      const suvs = fleet.filter(v => (v.category_name || v.category || '').toLowerCase().includes('suv'));
      return {
        text: `### 🚙 DriveX SUV Fleet\n\nIdeal for exploring Sri Lanka's cultural triangle, tea country hill stations, or southern beaches:\n\n• **Toyota RAV4 Hybrid**: $90/day — 5 seats, elevated driving position, all-wheel drive, dual-zone AC.\n• **Ford Explorer**: $110/day — 7 seats, twin-turbo power, vast cargo hold, intelligent terrain management.\n\nBoth feature high ground clearance to handle coastal highways and highland roads effortlessly.`,
        vehicles: suvs.length > 0 ? suvs : fleet.slice(0, 2),
        quickActions: [
          { label: '🛡️ Roadside Assistance', prompt: 'What should I do if the vehicle has a technical breakdown?' },
          { label: '💰 Check Deposit Amount', prompt: 'What is the deposit for SUV models?' }
        ]
      };
    }
  },

  // 13. Sports Cars / Supercars
  {
    id: 'sports_supercars',
    keywords: ['supercar', 'sport', 'sports', 'fast', 'exotic', 'porsche', 'ferrari', 'mustang', 'convertible', 'speed'],
    phrases: ['sports car', 'recommend a supercar', 'fastest car', 'high performance'],
    handler: (_q, fleet) => {
      const sports = fleet.filter(v => 
        (v.category_name || '').toLowerCase().includes('sport') ||
        (v.model || '').toLowerCase().includes('gt') ||
        (v.brand || '').toLowerCase().includes('porsche') ||
        (v.brand || '').toLowerCase().includes('ford')
      );
      return {
        text: `### 🏎️ High-Performance Exotic Fleet\n\nUnleash pure adrenaline with DriveX's performance stable:\n\n• Track-tuned suspension and launch control\n• Sports exhaust with selectable drive modes\n• Pristinely detailed and safety-checked before every handover\n\n*Requirements*: Minimum driver age 25 years with clean driving record and valid credit card security deposit.`,
        vehicles: sports.length > 0 ? sports : fleet.slice(0, 2),
        quickActions: [
          { label: '📋 Age & License Rules', prompt: 'What are the age requirements for supercars?' },
          { label: '📍 Request Doorstep Delivery', prompt: 'Can you deliver the car to my hotel?' }
        ]
      };
    }
  },

  // 14. Cheapest / Budget Cars
  {
    id: 'cheapest_car',
    keywords: ['cheap', 'cheapest', 'affordable', 'budget', 'lowest', 'economical'],
    phrases: ['cheapest car', 'low price', 'budget car', 'most affordable car', 'what is the cheapest'],
    handler: (_q, fleet) => {
      const sorted = [...fleet].sort((a, b) => parseFloat(a.daily_price || 999) - parseFloat(b.daily_price || 999));
      return {
        text: `### 🏷️ Best Value & Economical Rentals\n\nLooking for outstanding value without compromising on safety and cleanliness?\n\n1. **Toyota Yaris** — **$45.00 / day** (~LKR 13,500/day)\n   Automatic, 5 seats, 2 luggage, ice-cold AC, 18+ km/L.\n2. **Honda Fit Hybrid** — **$48.00 / day** (~LKR 14,400/day)\n   Automatic Hybrid, 5 seats, compact footprint, ultra-low fuel consumption.\n3. **Volkswagen Golf** — **$55.00 / day** (~LKR 16,500/day)\n   German build quality, manual transmission, solid highway cruiser.`,
        vehicles: sorted.slice(0, 2),
        quickActions: [
          { label: '📅 How to Reserve', prompt: 'How do I book a car?' },
          { label: '💳 Deposit Requirements', prompt: 'What are your payment and deposit terms?' }
        ]
      };
    }
  },

  // 15. Security Deposit & Refund Policy
  {
    id: 'deposit_policy',
    keywords: ['deposit', 'security', 'caution', 'bond', 'hold', 'preauthorization'],
    phrases: ['security deposit', 'how much deposit', 'deposit refund', 'when do i get deposit back', 'is deposit cash'],
    handler: () => ({
      text: `### 💳 Security Deposit & Refund Terms\n\n• **What is it?**: A temporary authorization hold placed on your credit card at the time of vehicle collection to cover incidentals, unpaid expressway tolls, or traffic violations.\n\n• **Deposit Amounts by Tier**:\n  - **Economy & Compact** (Yaris, Fit, Golf): **$150** (~LKR 45,000)\n  - **Mid-Size & Executive** (Camry, Accord): **$250** (~LKR 75,000)\n  - **SUVs & Vans** (RAV4, Explorer, Transit): **$350** (~LKR 105,000)\n  - **Luxury Sedans & Exotics** (Mercedes, BMW): **$500 – $750** (~LKR 150,000 – 225,000)\n\n• **Refund Timeline**: The hold is released within **24 hours** after our technicians inspect the vehicle upon return. Banks typically reflect it within 2–5 business days.`,
      quickActions: [
        { label: '💳 Accepted Payment Methods', prompt: 'Can I pay with debit card or cash?' },
        { label: '🛡️ Zero Deductible Insurance', prompt: 'Tell me about Insurance Plus' }
      ]
    })
  },

  // 16. Payment Options & Currency
  {
    id: 'payment_methods',
    keywords: ['payment', 'pay', 'cash', 'debit', 'credit', 'card', 'crypto', 'currency', 'usd', 'lkr'],
    phrases: ['can i pay in cash', 'debit card accepted', 'payment methods', 'currency accepted', 'do you take foreign currency'],
    handler: () => ({
      text: `### 💵 Payment Methods & Currencies\n\n• **Accepted Payment Methods**:\n  - Major Credit Cards: **Visa, MasterCard, American Express**\n  - Debit Cards (for rental fee only; deposit requires credit card)\n  - Direct Bank Wire / Online Fund Transfer (SLIPS / CEFT)\n  - Cash (USD, EUR, GBP, or LKR accepted at station counter for rental charge)\n\n• **Billing Currency**: Rates are billed in **Sri Lankan Rupees (LKR)** or **USD** according to your preference at current official central bank exchange rates. Zero hidden card surcharges!`,
      quickActions: [
        { label: '💰 Check Deposit Rules', prompt: 'What is the security deposit?' },
        { label: '📋 Driver Requirements', prompt: 'What documents are required to rent?' }
      ]
    })
  },

  // 17. Driving License & Age Requirements
  {
    id: 'license_and_age',
    keywords: ['license', 'licence', 'age', 'idp', 'foreign', 'tourist', 'documents', 'identification', 'passport', 'nic'],
    phrases: ['driving license', 'international driving permit', 'minimum age', 'age limit', 'can a 21 year old rent', 'tourist driving in sri lanka'],
    handler: () => ({
      text: `### 📋 Driver Credentials & Age Policy\n\n1. **Age Requirements**:\n   - **Standard & Mid-Size**: 21+ years with minimum 1 year of driving experience.\n   - **Luxury & Exotic Supercars**: 25+ years with clean driving record.\n\n2. **Required Documentation**:\n   - **Sri Lankan Citizens**: Valid National Driving License + National Identity Card (NIC).\n   - **International Visitors**: Valid Home Country License + **International Driving Permit (IDP)** or an endorsement letter from the Automobile Association of Ceylon (AAC). Our concierge can assist with instant endorsement paperwork.\n   - Valid Passport for overseas visitors.`,
      quickActions: [
        { label: '👨‍✈️ Prefer a Chauffeur?', prompt: 'How does the private chauffeur service work?' },
        { label: '👥 Additional Driver Option', prompt: 'Can someone else drive the car?' }
      ]
    })
  },

  // 18. Additional Driver
  {
    id: 'additional_driver',
    keywords: ['additional', 'second', 'friend', 'spouse', 'wife', 'husband', 'partner'],
    phrases: ['additional driver', 'second driver', 'can someone else drive', 'can my friend drive'],
    handler: () => ({
      text: `### 👥 Additional Driver Policy\n\n• **Can someone else drive?**: Yes! You can designate up to 2 additional drivers on your rental contract.\n• **Fee**: **$15.00 / day** per additional driver.\n• **Requirement**: The additional driver must present their valid driving license and passport/NIC during vehicle pickup or via digital upload prior to departure.\n\n*Warning: For insurance validity, no unregistered driver is permitted to pilot the vehicle.*`,
      quickActions: [
        { label: '🛡️ Insurance Coverage', prompt: 'What insurance is included?' },
        { label: '👨‍✈️ Hire a Chauffeur Instead', prompt: 'How does the private chauffeur service work?' }
      ]
    })
  },

  // 19. Mileage & Kilometer Limits
  {
    id: 'mileage_limit',
    keywords: ['mileage', 'km', 'kilometer', 'limit', 'unlimited', 'distance', 'travel'],
    phrases: ['is mileage unlimited', 'kilometer limit', 'how many km per day', 'excess mileage fee'],
    handler: () => ({
      text: `### 🛣️ Mileage & Kilometer Policy\n\n• **Daily Allowance**: Every rental includes **150 km per day** (calculated cumulatively across your total rental duration). For instance, a 5-day rental includes **750 km** total.\n• **Excess Mileage**: Extra kilometers are billed at a nominal rate of **$0.25 (approx LKR 75) per km**.\n• **Unlimited Mileage**: Available as an upgrade package on reservations of 7 days or longer! Ask our concierge to activate this on your booking.`,
      quickActions: [
        { label: '⛽ Fuel Policy Details', prompt: 'Is fuel included in the price?' },
        { label: '🗺️ Driving Outside Colombo', prompt: 'Can I drive to Kandy or Galle?' }
      ]
    })
  },

  // 20. Fuel Policy & Gas
  {
    id: 'fuel_policy',
    keywords: ['fuel', 'petrol', 'gas', 'diesel', 'tank', 'refuel', 'pump'],
    phrases: ['is fuel included', 'fuel policy', 'full to full', 'prepaid fuel', 'what fuel does it use'],
    handler: () => ({
      text: `### ⛽ Fuel Policy\n\n• **Standard Policy — Full to Full**: Your vehicle is delivered with a 100% full tank of fuel. Please return it full to avoid refuel service charges.\n• **Prepaid Fuel Add-On ($60.00 / booking)**: Opt for Prepaid Fuel during checkout to return the car at any fuel level with zero penalty.\n• **Fuel Grades**:\n  - Petrol vehicles: 95 Octane Euro 4 recommended for optimal performance.\n  - Hybrid & Diesel models: Standard Super Diesel / 92/95 Octane as marked on the fuel cap.`,
      quickActions: [
        { label: '🛣️ Mileage Allowance', prompt: 'Is mileage unlimited?' },
        { label: '🚗 Explore Hybrid Fleet', prompt: 'Tell me about the Toyota RAV4' }
      ]
    })
  },

  // 21. Insurance & Damage Deductibles
  {
    id: 'insurance_policy',
    keywords: ['insurance', 'damage', 'scratch', 'dent', 'accident', 'cdw', 'deductible', 'excess'],
    phrases: ['what insurance is included', 'collision damage waiver', 'zero deductible', 'what happens if i scratch the car', 'accident procedure'],
    handler: () => ({
      text: `### 🛡️ Comprehensive Fleet Insurance & Protection\n\n• **Standard Inclusions**: Every rental includes third-party liability and Comprehensive Collision Damage Waiver (CDW).\n• **Deductible**: Standard excess liability of $500 – $1,000 depending on vehicle class in the event of an at-fault accident.\n• **Insurance Plus Upgrade ($25.00 / day)**:\n  - **Zero Deductible ($0)**\n  - Covers tire punctures, alloy wheel scuffs, windshield chips, and minor paint blemishes.\n  - Total peace of mind while cruising Sri Lankan expressways.\n\n*Emergency protocol*: If an incident occurs, call our 24/7 hotline (**+94 11 234 5678**) immediately.`,
      quickActions: [
        { label: '📞 Emergency Hotline', prompt: 'Connect me with emergency desk' },
        { label: '💰 Check Deposit Details', prompt: 'What are your payment and deposit terms?' }
      ]
    })
  },

  // 22. Chauffeur / Private Driver Service
  {
    id: 'chauffeur_service',
    keywords: ['chauffeur', 'driver', 'chauffeurs', 'hiring a driver', 'with driver'],
    phrases: ['how much is a chauffeur', 'chauffeur cost', 'private driver', 'chauffeur service', 'driver rates'],
    handler: () => ({
      text: `### 👨‍✈️ DriveX Professional Chauffeur Service\n\nPrefer to sit back, work, or admire the scenery? Add a dedicated chauffeur to any vehicle in our fleet:\n\n• **Daily Fee**: **$35.00 / day** (~LKR 10,500/day)\n• **Our Chauffeurs**:\n  - Uniformed, background-checked, and English-fluent professionals (e.g. Michael Chang, Sarah Connor, David Miller).\n  - Extensive knowledge of Colombo routes, expressway networks, and scenic island destinations.\n• **Meals & Lodging**: For overnight journeys outside Colombo, client provides driver quarters or a standard driver boarding allowance of $15/night.\n• **Booking**: Simply tick **"Request Chauffeur"** on Step 2 of vehicle reservation!`,
      quickActions: [
        { label: '✈️ Airport VIP Pickup', prompt: 'Do you offer VIP pickup at Bandaranaike Airport?' },
        { label: '👑 Luxury Chauffeur Fleet', prompt: 'Show me luxury cars' }
      ]
    })
  },

  // 23. Locations, Delivery & Airport
  {
    id: 'locations_and_airport',
    keywords: ['location', 'station', 'branch', 'office', 'airport', 'cmb', 'katunayake', 'colombo', 'delivery', 'hotel'],
    phrases: ['where is your office', 'pickup location', 'airport pickup', 'do you deliver to my hotel', 'colombo branch', 'drop off location'],
    handler: () => ({
      text: `### 📍 DriveX Stations & Curbside Delivery\n\n1. **Downtown Flagship Office**: 123 Main St, City Center, Colombo (+1234567800)\n2. **Airport VIP Station**: Terminal 1, Bandaranaike International Airport (CMB) — Curbside greeting right at the arrival terminal gate.\n3. **Northside Station**: 456 North Ave, Colombo (+1234567802)\n\n• **VIP Doorstep Delivery**: We deliver vehicles directly to your hotel, villa, or residence across the Western Province. Delivery is complimentary on rentals of 3+ days!\n• **One-Way Rentals**: Collect at the Airport and drop off Downtown at zero additional relocation fee.`,
      quickActions: [
        { label: '🏎️ Book an Airport Vehicle', prompt: 'Show me all available vehicles' },
        { label: '👨‍✈️ Add Airport Chauffeur', prompt: 'How does the private chauffeur service work?' }
      ]
    })
  },

  // 24. Cancellation & Modifications
  {
    id: 'cancellation_policy',
    keywords: ['cancel', 'cancellation', 'modify', 'change', 'reschedule', 'refund', 'postpone'],
    phrases: ['can i cancel my booking', 'cancellation policy', 'how to change dates', 'refund policy'],
    handler: () => ({
      text: `### 🔄 Free Cancellation & Flexible Rescheduling\n\n• **100% Full Refund**: Free cancellation on all reservations up to **24 hours prior** to your scheduled pickup time.\n• **How to Cancel**: Go to **My Bookings** in your dashboard, locate your reservation under 'Upcoming', and click the cancel icon. Your refund will be processed to the original payment method.\n• **Date Modifications**: Need to change pickup times or extend your trip? Message our concierge here or contact support to adjust dates with zero penalty fees.`,
      quickActions: [
        { label: '📅 View My Bookings', prompt: 'How do I see my current bookings?' },
        { label: '📞 Contact Support Desk', prompt: 'Connect me with emergency desk' }
      ]
    })
  },

  // 25. Late Return Policy & Grace Period
  {
    id: 'late_return',
    keywords: ['late', 'delayed', 'grace', 'overtime', 'extend'],
    phrases: ['what if i return late', 'late return fee', 'grace period', 'running late'],
    handler: () => ({
      text: `### ⏰ Late Return Policy & Grace Period\n\n• **Complimentary Grace Period**: We provide a **60-minute grace period** free of charge if you encounter unexpected highway traffic.\n• **Beyond 1 Hour**: Late returns exceeding 1 hour are billed at a prorated hourly rate ($15/hr). Returns over 3 hours are billed as an additional rental day.\n• **Running Late?**: Simply send a quick message to this Concierge Chat or call our dispatch desk (+94 11 234 5678) to extend your reservation seamlessly.`,
      quickActions: [
        { label: '📞 Call Dispatch Desk', prompt: 'Connect me with emergency desk' },
        { label: '📍 Return Locations', prompt: 'Where are your pickup locations?' }
      ]
    })
  },

  // 26. Roadside Breakdown & Emergency Assistance
  {
    id: 'roadside_emergency',
    keywords: ['breakdown', 'emergency', 'puncture', 'flat', 'towing', 'mechanic', 'battery', 'stuck', 'accident'],
    phrases: ['car broke down', 'emergency helpline', 'flat tire', 'roadside assistance', 'need help right now'],
    handler: () => ({
      text: `### 🚨 24/7 VIP Nationwide Roadside Assistance\n\nRest assured, DriveX has full island-wide rescue coverage:\n\n1. **Direct Emergency Hotline**: **+94 11 234 5678** (Instant dispatch response 24/7/365).\n2. **Rapid Response Team**: Mobile technicians equipped with battery jumpers, tire changers, and diagnostic gear reach you within **30–45 minutes**.\n3. **60-Minute Vehicle Replacement Guarantee**: If an issue cannot be resolved on-site, a replacement vehicle of equal or higher tier will be rushed to your location.\n4. **Expressway Towing**: Full coverage on all Southern and Central expressways.`,
      quickActions: [
        { label: '📞 Call Emergency (+94 11 234 5678)', prompt: 'Connect me with emergency desk' },
        { label: '💬 WhatsApp Concierge', prompt: 'Open WhatsApp concierge chat' }
      ]
    })
  },

  // 27. Cross-country Driving / Outside Colombo
  {
    id: 'travel_destinations',
    keywords: ['kandy', 'galle', 'yala', 'nuwara eliya', 'ella', 'sigiriya', 'expressway', 'destination', 'island'],
    phrases: ['can i drive outside colombo', 'can i go to galle', 'can i go to kandy', 'driving to yala', 'expressway driving'],
    handler: () => ({
      text: `### 🏝️ Island-Wide Touring Permissions\n\n• **Where can you drive?**: Everywhere! All DriveX vehicles are permitted across all 9 provinces of Sri Lanka with zero territorial surcharges.\n• **Expressway Cruising**: All Southern (E01), Outer Circular (E02), and Central (E04) expressways are fully permitted.\n• **Recommended Cars for Hill Country (Kandy, Nuwara Eliya, Ella)**:\n  - **Toyota RAV4 Hybrid** or **Ford Explorer** (superior climbing torque and high ground clearance).\n• **Recommended Cars for Coastal Cruising (Galle, Mirissa, Tangalle)**:\n  - **Mercedes-Benz E-Class** or **BMW 5 Series** for supreme highway serenity.`,
      quickActions: [
        { label: '🚙 Explore SUVs', prompt: 'Show me SUV models' },
        { label: '🛣️ Check Mileage Allowance', prompt: 'Is mileage unlimited?' }
      ]
    })
  },

  // 28. Extras: Child Seat, GPS, Prepaid Fuel
  {
    id: 'extras_addons',
    keywords: ['extras', 'child seat', 'baby seat', 'gps', 'navigation', 'booster', 'wifi'],
    phrases: ['child seat rental', 'baby seat', 'gps navigation', 'available extras', 'add ons'],
    handler: () => ({
      text: `### 🧰 Available Optional Extras\n\nCustomize your journey during checkout with our premium add-ons:\n\n1. **Child Safety Seat ($10.00 / day)**: European safety standard certified for infants (0–4 yrs) and toddlers.\n2. **GPS Navigation Device ($5.00 / day)**: Standalone Garmin unit with pre-loaded Sri Lanka offline maps.\n3. **Additional Driver ($15.00 / day)**: Insures a second driver on your contract.\n4. **Prepaid Fuel ($60.00 / booking)**: Return the vehicle empty with zero refuel hassle.\n5. **Insurance Plus ($25.00 / day)**: Zero damage deductible ($0 liability).`,
      quickActions: [
        { label: '🚗 Explore Fleet', prompt: 'Show me all available vehicles' },
        { label: '👨‍✈️ Chauffeur Driver Service', prompt: 'How much is an executive chauffeur?' }
      ]
    })
  },

  // 29. Smoking & Pet Policy
  {
    id: 'smoking_pets',
    keywords: ['smoke', 'smoking', 'cigarette', 'vape', 'pet', 'dog', 'cat', 'animal'],
    phrases: ['can i smoke in the car', 'are pets allowed', 'smoking policy', 'pet policy'],
    handler: () => ({
      text: `### 🚭 Cabin Purity & Pet Guidelines\n\n• **Strict No-Smoking Policy**: To ensure pristine cabin atmosphere for all guests, smoking, vaping, or burning tobacco inside any DriveX vehicle is strictly prohibited. Violations incur a $150 detailing and ozone sanitation fee.\n• **Pet Policy**: Certified service animals are welcome without charge. Other domestic pets must be transported in appropriate pet carriers to protect leather seating and upholstery.`,
      quickActions: [
        { label: '🚗 View Fleet', prompt: 'Show me all available vehicles' },
        { label: '📋 View Rental Rules', prompt: 'What documents are required to rent?' }
      ]
    })
  },

  // 30. Contact Human Agent
  {
    id: 'human_escalation',
    keywords: ['human', 'agent', 'person', 'representative', 'operator', 'talk to someone', 'support', 'contact', 'call'],
    phrases: ['talk to a human', 'speak to an agent', 'customer service number', 'connect me with support', 'whatsapp support'],
    handler: () => ({
      text: `### 📞 Direct Access to DriveX VIP Specialists\n\nOur executive support team is on standby 24/7/365:\n\n• **Direct Hotline**: [+94 11 234 5678](tel:+94112345678)\n• **WhatsApp VIP Concierge**: [Message on WhatsApp (+94 11 234 5678)](https://wa.me/94112345678)\n• **Concierge Email**: concierge@drivex.com\n• **Headquarters**: 123 Main St, City Center, Colombo 03\n\nFeel free to tap the phone number or WhatsApp link above for instant white-glove communication!`,
      quickActions: [
        { label: '🏎️ Continue Exploring Fleet', prompt: 'Show me all available vehicles' },
        { label: '💰 Check Deposit Details', prompt: 'What are your payment and deposit terms?' }
      ]
    })
  }
];

// Intelligent Scoring Matcher
export const matchConciergeQuery = (query: string, fleet: any[]): BotAnswer => {
  const cleanQ = query.toLowerCase().trim();
  if (!cleanQ) {
    return {
      text: `How may I assist you with your luxury vehicle reservation today? Feel free to ask about our fleet, pricing, chauffeur services, or roadside protection.`,
      quickActions: [
        { label: '🏎️ Recommend a Supercar', prompt: 'Recommend a high-performance sports car' },
        { label: '🚙 Executive SUV for Road Trip', prompt: 'What luxury SUVs do you have for a family trip?' }
      ]
    };
  }

  // 1. Direct Vehicle Search (check if user specifically asked about a car in the fleet)
  const matchingVehicles = fleet.filter(v => {
    const brand = (v.brand || '').toLowerCase();
    const model = (v.model || '').toLowerCase();
    const category = (v.category_name || v.category || '').toLowerCase();
    return cleanQ.includes(brand) || cleanQ.includes(model) || cleanQ.includes(category);
  });

  // Calculate scores for all knowledge nodes
  let bestNode: KnowledgeNode | null = null;
  let highestScore = 0;

  for (const node of CONCIERGE_KNOWLEDGE) {
    let score = 0;

    // Check exact phrase matches (weight: 10)
    if (node.phrases) {
      for (const phrase of node.phrases) {
        if (cleanQ.includes(phrase)) {
          score += 10;
        }
      }
    }

    // Check keyword matches (weight: 3 per keyword)
    for (const kw of node.keywords) {
      // Word boundary match or inclusion
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(cleanQ)) {
        score += 3;
      } else if (cleanQ.includes(kw) && kw.length >= 4) {
        score += 1.5;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestNode = node;
    }
  }

  // If score is high enough (threshold 2), return the matched node's answer
  if (bestNode && highestScore >= 2) {
    const answer = bestNode.handler(cleanQ, fleet);
    // If user mentioned specific vehicles and the answer doesn't have them, attach them
    if ((!answer.vehicles || answer.vehicles.length === 0) && matchingVehicles.length > 0) {
      answer.vehicles = matchingVehicles.slice(0, 2);
    }
    return answer;
  }

  // If query matched specific fleet vehicles even without a general node
  if (matchingVehicles.length > 0) {
    return {
      text: `Here are the matching vehicles from our fleet based on your query:\n\nEvery vehicle includes complimentary 24/7 roadside assistance, comprehensive insurance, and pristine detailing before handover.`,
      vehicles: matchingVehicles.slice(0, 3),
      quickActions: [
        { label: '💰 Check Deposit Details', prompt: 'What are your payment and deposit terms?' },
        { label: '👨‍✈️ Book With Chauffeur', prompt: 'How does the private chauffeur service work?' }
      ]
    };
  }

  // Fallback: Thoughtful, comprehensive response offering guidance
  return {
    text: `I understand you are asking about: "${query}".\n\nAs your DriveX VIP Concierge, I can assist you directly with:\n• **Fleet Inquiries**: Explore luxury sedans, sports cars, SUVs, or 12-seater vans\n• **Transparent Pricing**: Check daily rates, fuel policy, and security deposits\n• **Chauffeur Reservations**: Book an executive chauffeur for your itinerary\n• **Emergency Assistance**: 24/7 roadside dispatch (+94 11 234 5678)\n\nPlease select one of the topics below or rephrase your question, and I will be delighted to assist!`,
    vehicles: fleet.slice(0, 2),
    quickActions: [
      { label: '🏎️ Explore All Cars', prompt: 'Show me all available vehicles' },
      { label: '💰 Pricing & Deposit Policy', prompt: 'What are your security deposit and payment terms?' },
      { label: '📋 Driver Requirements', prompt: 'What documents are required to rent?' },
      { label: '📞 Speak With An Agent', prompt: 'Connect me with emergency desk' }
    ]
  };
};

