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
  gameState.setResource(resource, value); // Directly handle provisions
  res.json(gameState);
});

app.post('/set-market-currency', (req, res) => {
  const { value } = req.body;
  gameState.setMarketCurrency(value);
  res.json(gameState);
});

// Route to apply card effects
app.post('/apply-card-effects', async (req, res) => {
  const { cardID, choice } = req.body;
  try {
    const card = await Card.findOne({ id: cardID });
    if (card) {
      const result = Math.random() < parseFloat(card.choices[choice].good_result_chance)
        ? card.choices[choice].good_result
        : card.choices[choice].bad_result;
      gameState.applyStatBoost({
        gold: result.gold_effect,
        provisions: result.provisions_effect,
        morale: result.morale_effect,
        crewSize: result.crew_effect,
      });
      res.json({ message: 'Card effects applied', resources: gameState.resources });
    } else {
      res.status(404).json({ message: 'Card not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error applying card effects' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
