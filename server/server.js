const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to PostgreSQL');
    done();
  }
});

// Create tables if they don't exist
const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        position VARCHAR(100),
        department VARCHAR(100)
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS employee_locations (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER REFERENCES employees(id),
        latitude DECIMAL(10, 6) NOT NULL,
        longitude DECIMAL(10, 6) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Tables created successfully');
    
    // Check if we need to seed initial data
    const employeeCount = await pool.query('SELECT COUNT(*) FROM employees');
    
    if (parseInt(employeeCount.rows[0].count) === 0) {
      await seedInitialData();
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

// Seed initial data
const seedInitialData = async () => {
  try {
    // Insert 10 employees
    const employeeNames = [
      'John Smith', 'Jane Doe', 'Michael Johnson', 'Emily Williams', 'Robert Brown',
      'Sarah Davis', 'David Miller', 'Lisa Wilson', 'James Taylor', 'Jennifer Anderson'
    ];
    
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
    const positions = ['Manager', 'Senior Developer', 'Junior Developer', 'Analyst', 'Specialist'];
    
    for (let i = 0; i < employeeNames.length; i++) {
      const department = departments[Math.floor(Math.random() * departments.length)];
      const position = positions[Math.floor(Math.random() * positions.length)];
      
      const result = await pool.query(
        'INSERT INTO employees (name, position, department) VALUES ($1, $2, $3) RETURNING id',
        [employeeNames[i], position, department]
      );
      
      const employeeId = result.rows[0].id;
      
      // Generate random coordinates (roughly within world map boundaries)
      const latitude = (Math.random() * 140 - 70).toFixed(6);  // -70 to 70
      const longitude = (Math.random() * 340 - 170).toFixed(6); // -170 to 170
      
      await pool.query(
        'INSERT INTO employee_locations (employee_id, latitude, longitude) VALUES ($1, $2, $3)',
        [employeeId, latitude, longitude]
      );
    }
    
    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
};

// Initialize database
createTables();

// API Routes
// Get all employees with their latest location
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.id, e.name, e.position, e.department, 
             el.latitude, el.longitude, el.timestamp
      FROM employees e
      JOIN (
        SELECT DISTINCT ON (employee_id) employee_id, latitude, longitude, timestamp
        FROM employee_locations
        ORDER BY employee_id, timestamp DESC
      ) el ON e.id = el.employee_id
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update employee location
app.post('/api/employees/:id/location', async (req, res) => {
  const { id } = req.params;
  const { latitude, longitude } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO employee_locations (employee_id, latitude, longitude) VALUES ($1, $2, $3) RETURNING *',
      [id, latitude, longitude]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Generate random locations for all employees (for demo purposes)
app.post('/api/employees/random-locations', async (req, res) => {
  try {
    const employees = await pool.query('SELECT id FROM employees');
    
    for (const employee of employees.rows) {
      const latitude = (Math.random() * 140 - 70).toFixed(6);  // -70 to 70
      const longitude = (Math.random() * 340 - 170).toFixed(6); // -170 to 170
      
      await pool.query(
        'INSERT INTO employee_locations (employee_id, latitude, longitude) VALUES ($1, $2, $3)',
        [employee.id, latitude, longitude]
      );
    }
    
    res.json({ message: 'Random locations generated successfully' });
  } catch (error) {
    console.error('Error generating random locations:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express API for Vercel
module.exports = app;