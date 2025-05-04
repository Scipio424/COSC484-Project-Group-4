// Written by Jordan A. McCloud
const GameState = require('./GameState');

// Item JSON objects.
let itemJSON = [
    {itemID: "001", price: "5", name: "Test Item #1", description: "An item for testing.", resourceAffected: "gold", resourceShift: 1},
    {itemID: "002", price: "10", name: "Test Item #2", description: "An item for testing.", resourceAffected: "provisions", resourceShift: 2} // Renamed from food
];

// Captain JSON objects.
let captainJSON = [
    {captainID: "001", price: "25", name: "Test Captain #1", description: "A captain for testing.", modifier: "Earn 1.5x gold."},
    {captainID: "002", price: "50", name: "Test Captain #2", description: "Improve morale by 50%"}
];

// Example user ID (this should be dynamically set based on the logged-in user)
const userID = 'testUser'; // Example user ID

// Initialize GameState with user data
const gameState = new GameState(userID);

// Function to apply item effects
function applyItemEffects(itemID) {
    const item = itemJSON.find(i => i.itemID === itemID);
    if (item) {
        gameState.setResource(item.resourceAffected, gameState.getResource(item.resourceAffected) + item.resourceShift);
    }
}

// Example usage
applyItemEffects("001");
console.log('Updated Resources:', gameState.resources);

