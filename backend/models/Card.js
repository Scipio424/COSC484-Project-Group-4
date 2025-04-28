const mongoose = require('mongoose');
const GameState = require('./GameState');

// Define the schema for the inner "result" objects (for good and bad results)
const resultSchema = new mongoose.Schema({
  gold_effect: { type: Number, default: 0 },
  provisions_effect: { type: Number, default: 0 },
  morale_effect: { type: Number, default: 0 },
  crew_effect: { type: Number, default: 0 }
});

// Define the schema for each choice (A, B)
const choiceSchema = new mongoose.Schema({
  action_taken: String,
  good_result_chance: String,
  good_result: resultSchema,
  bad_result: resultSchema
});

// Define the main card schema
const cardSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  difficulty: { type: Number, required: true },
  choices: {
    A: choiceSchema,
    B: choiceSchema
  }
});

// Create the model based on the schema
const Card = mongoose.model('Card', cardSchema);

// Example user ID (this should be dynamically set based on the logged-in user)
const userID = 'testUser'; // Example user ID

// Initialize GameState with user data
const gameState = new GameState(userID);

// Function to apply card effects
function applyCardEffects(cardID, choice) {
    const card = Card.findOne({ id: cardID });
    if (card) {
        const result = Math.random() < parseFloat(card.choices[choice].good_result_chance) ? card.choices[choice].good_result : card.choices[choice].bad_result;
        gameState.applyStatBoost({
            gold: result.gold_effect,
            food: result.provisions_effect,
            morale: result.morale_effect,
            crewSize: result.crew_effect
        });
    }
}

// Example usage
applyCardEffects(1, 'A');
console.log('Updated Resources:', gameState.resources);

module.exports = Card;
