const GameState = require('./GameState');

// Example user ID (this should be dynamically set based on the logged-in user)
const userID = 'testUser'; // Example user ID

// Initialize GameState with user data
const gameState = new GameState(userID);

// Example usage: Initialize with a captain
const defaultCaptain = {
    startingGold: 50,
    startingFood: 50,
    startingMorale: 50,
    startingCrewSize: 50
};
gameState.setCaptain(defaultCaptain);

// Example of applying a stat boost from a purchased item
const purchasedItemBoost = {
    gold: 10,
    food: 5
};
gameState.applyStatBoost(purchasedItemBoost);

// Example of setting and getting market currency
gameState.setMarketCurrency(200);
console.log('Market Currency:', gameState.getMarketCurrency());

// Example of getting and setting resources
console.log('Gold:', gameState.getResource('gold'));
gameState.setResource('gold', 80);
console.log('Updated Gold:', gameState.getResource('gold'));

console.log('Current Resources:', gameState.resources);
