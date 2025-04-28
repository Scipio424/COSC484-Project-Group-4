// Load environment variables
require('dotenv').config();

//handled path earlier to allow inputs to utilize it
const path = require('path');

// Imports
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Card = require('./models/Card');
const GameState = require(path.join(__dirname, '..', 'frontend', 'GameState'));

// App setup
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, '../frontend')));

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Game state instance (in-memory, not tied to DB)
const userID = 'testUser'; // Example user ID
let gameState = new GameState(userID);

// --- Routes ---

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Route to get all cards from MongoDB
app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards' });
  }
});

// Game state routes
app.get('/game-state', (req, res) => {
  res.json(gameState);
});

app.post('/update-resource', (req, res) => {
  const { resource, value } = req.body;
  gameState.setResource(resource, value);
  res.json(gameState);
});

app.post('/set-market-currency', (req, res) => {
  const { value } = req.body;
  gameState.setMarketCurrency(value);
  res.json(gameState);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
