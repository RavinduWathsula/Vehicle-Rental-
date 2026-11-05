const { pool } = require('./src/config/database');

const FLEET_DATA = [
  {
    slug: 'porsche-gt3',
    brand: 'Porsche',
    model: '911 GT3 RS',
    year: 2024,
    categoryName: 'Sports',
    daily_price: 350.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 2,
    doors: 2,
    luggage_capacity: 2,
    status: 'available',
    registration_number: 'SP-GT3-911',
    primary_image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    description: 'Track-bred naturally aspirated 4.0L flat-six producing 518 hp.'
  },
  {
    slug: 'mercedes-g63',
    brand: 'Mercedes-Benz',
    model: 'G63 AMG V8 BiTurbo',
    year: 2024,
    categoryName: 'SUV',
    daily_price: 280.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    doors: 5,
    luggage_capacity: 5,
    status: 'available',
    registration_number: 'SUV-G63-AMG',
    primary_image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80',
    description: 'Iconic luxury off-roader with handcrafted twin-turbo V8.'
  },
  {
    slug: 'bmw-m8',
    brand: 'BMW',
    model: 'M8 Competition Gran Coupe',
    year: 2024,
    categoryName: 'Luxury',
    daily_price: 220.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    doors: 4,
    luggage_capacity: 4,
    status: 'available',
    registration_number: 'LUX-M8-001',
    primary_image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    description: '617-hp twin-turbo V8 executive supercar with carbon interior.'
  },
  {
    slug: 'defender-110',
    brand: 'Land Rover',
    model: 'Defender 110 V8',
    year: 2024,
    categoryName: 'SUV',
    daily_price: 210.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 7,
    doors: 5,
    luggage_capacity: 6,
    status: 'available',
    registration_number: 'SUV-DEF-110',
    primary_image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    description: 'Supercharged V8 capable of dominating both Colombo streets and Yala terrain.'
  },
  {
    slug: 'audi-rs7',
    brand: 'Audi',
    model: 'RS7 Sportback Performance',
    year: 2024,
    categoryName: 'Luxury',
    daily_price: 195.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    doors: 4,
    luggage_capacity: 4,
    status: 'available',
    registration_number: 'LUX-RS7-001',
    primary_image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
    description: 'Quattro all-wheel drive, ceramic brakes, and sweeping sportback silhouette.'
  },
  {
    slug: 'tesla-plaid',
    brand: 'Tesla',
    model: 'Model S Plaid (1020 HP)',
    year: 2024,
    categoryName: 'Luxury',
    daily_price: 175.00,
    transmission: 'automatic',
    fuel_type: 'electric',
    seats: 5,
    doors: 4,
    luggage_capacity: 4,
    status: 'available',
    registration_number: 'EV-PLAID-01',
    primary_image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    description: 'Tri-motor all-electric hypercar with 0-100 km/h in 1.99s.'
  },
  {
    slug: 'mustang-darkhorse',
    brand: 'Ford',
    model: 'Mustang Dark Horse V8',
    year: 2024,
    categoryName: 'Sports',
    daily_price: 145.00,
    transmission: 'manual',
    fuel_type: 'petrol',
    seats: 4,
    doors: 2,
    luggage_capacity: 2,
    status: 'available',
    registration_number: 'SP-MST-500',
    primary_image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    description: '5.0L Coyote V8 with 6-speed Tremec manual transmission.'
  },
  {
    slug: 'prado-txl',
    brand: 'Toyota',
    model: 'Land Cruiser Prado TX-L',
    year: 2024,
    categoryName: 'SUV',
    daily_price: 130.00,
    transmission: 'automatic',
    fuel_type: 'diesel',
    seats: 7,
    doors: 5,
    luggage_capacity: 6,
    status: 'available',
    registration_number: 'SUV-PRD-77',
    primary_image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Legendary 7-seater durability with refrigerator and terrain select.'
  },
  {
    slug: 'transit-vip',
    brand: 'Ford',
    model: 'Transit VIP Shuttle (12-Seater)',
    year: 2023,
    categoryName: 'Van',
    daily_price: 120.00,
    transmission: 'manual',
    fuel_type: 'diesel',
    seats: 12,
    doors: 4,
    luggage_capacity: 8,
    status: 'available',
    registration_number: 'VAN-TRS-12',
    primary_image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    description: 'High-roof 12-passenger coach with individual recliners and dual AC.'
  },
  {
    slug: 'rav4-hybrid',
    brand: 'Toyota',
    model: 'RAV4 Prime Hybrid',
    year: 2024,
    categoryName: 'SUV',
    daily_price: 95.00,
    transmission: 'automatic',
    fuel_type: 'hybrid',
    seats: 5,
    doors: 5,
    luggage_capacity: 4,
    status: 'available',
    registration_number: 'SUV-RAV4-99',
    primary_image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    description: 'All-wheel drive plug-in hybrid SUV offering 302 hp with 42 miles EV range.'
  },
  {
    slug: 'camry-executive',
    brand: 'Toyota',
    model: 'Camry Executive Hybrid',
    year: 2024,
    categoryName: 'Mid-size',
    daily_price: 75.00,
    transmission: 'automatic',
    fuel_type: 'hybrid',
    seats: 5,
    doors: 4,
    luggage_capacity: 4,
    status: 'available',
    registration_number: 'MID-CAM-24',
    primary_image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Plush executive sedan with rear passenger climate controls and whisper quiet cabin.'
  },
  {
    slug: 'golf-rline',
    brand: 'Volkswagen',
    model: 'Golf R-Line (Manual)',
    year: 2023,
    categoryName: 'Compact',
    daily_price: 55.00,
    transmission: 'manual',
    fuel_type: 'petrol',
    seats: 5,
    doors: 4,
    luggage_capacity: 3,
    status: 'available',
    registration_number: 'CMP-GLF-08',
    primary_image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
    description: 'German driving dynamics with 6-speed manual and sport suspension.'
  },
  {
    slug: 'fit-ehev',
    brand: 'Honda',
    model: 'Fit e:HEV Hybrid',
    year: 2023,
    categoryName: 'Economy',
    daily_price: 48.00,
    transmission: 'automatic',
    fuel_type: 'hybrid',
    seats: 5,
    doors: 4,
    luggage_capacity: 3,
    status: 'available',
    registration_number: 'ECO-FIT-32',
    primary_image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    description: 'City runabout with 24 km/L fuel efficiency and magic seating system.'
  },
  {
    slug: 'yaris-grsport',
    brand: 'Toyota',
    model: 'Yaris GR Sport City',
    year: 2023,
    categoryName: 'Economy',
    daily_price: 45.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    doors: 4,
    luggage_capacity: 2,
    status: 'available',
    registration_number: 'ECO-YAR-11',
    primary_image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
    description: 'Nimble, fuel-efficient city runner with touchscreen and safety sense.'
  }
];

const DRIVERS_DATA = [
  {
    name: 'Michael Chang',
    phone: '+94 77 123 4567',
    license_number: 'DL-MC-87654',
    license_expiry: '2028-05-15',
    status: 'available',
    profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Sarah Connor',
    phone: '+94 71 987 6543',
    license_number: 'DL-SC-98765',
    license_expiry: '2027-11-20',
    status: 'available',
    profile_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'David Miller',
    phone: '+94 76 555 1234',
    license_number: 'DL-DM-11223',
    license_expiry: '2026-08-10',
    status: 'available',
    profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  }
];

async function seedFleet() {
  const connection = await pool.getConnection();
  try {
    console.log('--- Starting Fleet & Database Migration ---');

    // 1. Add slug column to vehicles if it does not exist
    const [cols] = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'vehicles' AND COLUMN_NAME = 'slug'`
    );
    if (cols.length === 0) {
      await connection.query('ALTER TABLE vehicles ADD COLUMN slug VARCHAR(100) NULL AFTER model');
      await connection.query('ALTER TABLE vehicles ADD INDEX idx_slug (slug)');
      console.log('✅ Added slug column and index to vehicles table');
    }

    // 2. Ensure Categories exist (including Sports)
    const [existingCategories] = await connection.query('SELECT id, name FROM vehicle_categories');
    const categoryMap = {};
    for (const cat of existingCategories) {
      categoryMap[cat.name.toLowerCase()] = cat.id;
    }

    const requiredCategories = [
      { name: 'Luxury', description: 'Luxury and executive vehicles.' },
      { name: 'Economy', description: 'Small, fuel-efficient cars.' },
      { name: 'Compact', description: 'Compact and agile cars.' },
      { name: 'Mid-size', description: 'Comfortable family and business sedans.' },
      { name: 'SUV', description: 'SUVs and premium 4x4 vehicles.' },
      { name: 'Van', description: 'Passenger vans and shuttles.' },
      { name: 'Sports', description: 'High-performance sports cars and exotic supercars.' }
    ];

    for (const reqCat of requiredCategories) {
      const lower = reqCat.name.toLowerCase();
      if (!categoryMap[lower]) {
        const [res] = await connection.query(
          'INSERT INTO vehicle_categories (name, description) VALUES (?, ?)',
          [reqCat.name, reqCat.description]
        );
        categoryMap[lower] = res.insertId;
        console.log(`✅ Inserted category: ${reqCat.name} (id: ${res.insertId})`);
      }
    }

    // 3. Seed Vehicles
    for (const v of FLEET_DATA) {
      const catId = categoryMap[v.categoryName.toLowerCase()] || 1;
      const weeklyPrice = v.daily_price * 6;
      const monthlyPrice = v.daily_price * 22;

      // Check if vehicle exists by registration or slug
      const [existingVehicles] = await connection.query(
        'SELECT id FROM vehicles WHERE registration_number = ? OR slug = ?',
        [v.registration_number, v.slug]
      );

      let vehicleId;
      if (existingVehicles.length === 0) {
        const [insertRes] = await connection.query(
          `INSERT INTO vehicles 
           (category_id, brand, model, slug, year, registration_number, fuel_type, transmission, seats, doors, luggage_capacity, daily_price, weekly_price, monthly_price, description, status) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            catId,
            v.brand,
            v.model,
            v.slug,
            v.year,
            v.registration_number,
            v.fuel_type,
            v.transmission,
            v.seats,
            v.doors,
            v.luggage_capacity,
            v.daily_price,
            weeklyPrice,
            monthlyPrice,
            v.description,
            v.status
          ]
        );
        vehicleId = insertRes.insertId;
        console.log(`✅ Inserted vehicle: ${v.brand} ${v.model} (id: ${vehicleId}, slug: ${v.slug})`);
      } else {
        vehicleId = existingVehicles[0].id;
        // Update slug if empty
        await connection.query('UPDATE vehicles SET slug = ? WHERE id = ?', [v.slug, vehicleId]);
      }

      // Ensure primary image exists
      const [imgs] = await connection.query('SELECT id FROM vehicle_images WHERE vehicle_id = ?', [vehicleId]);
      if (imgs.length === 0 && v.primary_image) {
        await connection.query(
          'INSERT INTO vehicle_images (vehicle_id, image_url, is_primary) VALUES (?, ?, 1)',
          [vehicleId, v.primary_image]
        );
      }
    }

    // 4. Seed Drivers
    for (const drv of DRIVERS_DATA) {
      const [existingDrivers] = await connection.query(
        'SELECT id FROM drivers WHERE license_number = ?',
        [drv.license_number]
      );
      if (existingDrivers.length === 0) {
        await connection.query(
          `INSERT INTO drivers (name, phone, license_number, license_expiry, status, profile_image)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [drv.name, drv.phone, drv.license_number, drv.license_expiry, drv.status, drv.profile_image]
        );
        console.log(`✅ Inserted driver: ${drv.name}`);
      }
    }

    console.log('🎉 Seeding successfully completed!');
  } catch (err) {
    console.error('❌ Error seeding fleet:', err);
  } finally {
    connection.release();
    pool.end();
  }
}

seedFleet();

