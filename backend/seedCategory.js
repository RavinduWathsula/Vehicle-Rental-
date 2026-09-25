const pool = require('./src/config/db');

async function seedCategory() {
  try {
    const [rows] = await pool.query('SELECT * FROM vehicle_categories WHERE id = 1');
    if (rows.length === 0) {
      await pool.query('INSERT INTO vehicle_categories (id, name, description) VALUES (1, "Luxury", "Luxury Cars")');
      console.log('Category inserted');
    } else {
      console.log('Category already exists');
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}
seedCategory();
