const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express application
const app = express();
const port = 5000;

// Use CORS middleware to allow cross-origin requests
app.use(cors()); 

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cdac',  // Set your password here
  database: 'yuva_keeda_vikasa', // The database you created
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// POST request to register an athlete
app.post('/register-athlete', (req, res) => {
  const { first_name, last_name, email, age, birthdate, gender, mobile, address, emergency_contact } = req.body;

  // Log the incoming data to verify
  console.log('Received athlete registration data:', req.body);

  // SQL query to insert data into the players table
  const query = `
    INSERT INTO players (first_name, last_name, email, age, birthdate, gender, mobile, address, emergency_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [first_name, last_name, email, age, birthdate, gender, mobile, address, emergency_contact], (err, result) => {
    if (err) {
      // Log error message and send detailed response
      console.error('Error registering athlete:', err);
      return res.status(500).json({ message: 'Error registering athlete', error: err.message });
    }
    return res.status(200).json({ message: 'Athlete registered successfully', playerId: result.insertId });
  });
});

// POST request to book facility
app.post('/book-facility', (req, res) => {
  const { user_id, sport, location, facility, booking_date, start_time, end_time, reason } = req.body;

  // Log booking data to verify
  console.log('Received booking data:', req.body);

  // Check if the slot is available
  const checkAvailabilityQuery = `
    SELECT * FROM bookings WHERE booking_date = ? AND start_time = ? AND facility = ?;
  `;
  
  db.query(checkAvailabilityQuery, [booking_date, start_time, facility], (err, result) => {
    if (err) {
      console.error('Error checking availability:', err);
      return res.status(500).json({ message: 'Error checking availability', error: err.message });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: 'Slot is already booked' });
    }

    // Proceed with booking if available
    const query = `
      INSERT INTO bookings (user_id, sport, location, facility, booking_date, start_time, end_time, reason)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    
    db.query(query, [user_id, sport, location, facility, booking_date, start_time, end_time, reason], (err, result) => {
      if (err) {
        console.error('Error booking facility:', err);
        return res.status(500).json({ message: 'Error booking facility', error: err.message });
      }
      return res.status(200).json({ message: 'Booking confirmed', bookingId: result.insertId });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
