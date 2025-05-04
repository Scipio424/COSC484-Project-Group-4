const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, 'users.json');

class GameState {
    constructor(userID) {
        this.userID = userID;
        this.resources = {
            gold: 100,
            provisions: 100, // Renamed from food
            morale: 100,
            crewSize: 100
        };
        this.marketCurrency = 0; // Currency for marketplace use
        this.captain = null;
        this.lost = false; // Track if the game is lost
        this.loadUserData(); // Load user data from JSON file
    }

    // Method to load user data from users.json
    loadUserData() {
        const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
        const user = users.find(u => u.userName === this.userID);
        if (user) {
            this.resources.gold = user.currentRun.gold;
            this.resources.provisions = user.currentRun.provisions; // Renamed from food
            this.resources.morale = user.currentRun.moral;
            this.resources.crewSize = user.currentRun.crew;
            this.marketCurrency = user.marketCurrency || 0;
        }
    }

    // Method to save user data to users.json
    saveUserData() {
        const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
        const userIndex = users.findIndex(u => u.userName === this.userID);
        if (userIndex !== -1) {
            users[userIndex].currentRun.gold = this.resources.gold;
            users[userIndex].currentRun.provisions = this.resources.provisions; // Renamed from food
            users[userIndex].currentRun.moral = this.resources.morale;
            users[userIndex].currentRun.crew = this.resources.crewSize;
            users[userIndex].marketCurrency = this.marketCurrency;
            fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
        }
    }

    // Method to set the captain and update resources
    setCaptain(captain) {
        this.captain = captain;
        this.resources.gold = captain.startingGold;
        this.resources.provisions = captain.startingProvisions; // Renamed from food
        this.resources.morale = captain.startingMorale;
        this.resources.crewSize = captain.startingCrewSize;
        this.saveUserData(); // Save updated data
    }

    // Method to get a resource value
    getResource(resource) {
        return this.resources[resource];
    }

    // Method to set a resource value and save data
    setResource(resource, value) {
        this.resources[resource] = Math.max(0, Math.min(100, value)); // Ensure value is between 0 and 100
        this.checkIfLost();
        this.saveUserData(); // Save updated data
    }

    // Method to get market currency
    getMarketCurrency() {
        return this.marketCurrency;
    }

    // Method to set market currency and save data
    setMarketCurrency(value) {
        this.marketCurrency = value;
        this.saveUserData(); // Save updated data
    }

    // Method to apply stat boosts and save data
    applyStatBoost(boost) {
        for (let resource in boost) {
            this.resources[resource] = Math.max(0, Math.min(100, this.resources[resource] + boost[resource])); // Ensure value is between 0 and 100
        }
        this.checkIfLost();
        this.saveUserData(); // Save updated data
    }

    // Method to apply card effects
    applyCardEffects(cardID, choice) {
        const card = cards.find(c => c.CardID === cardID); // Assuming cards are loaded in memory
        if (card) {
            const result = Math.random() < card.Choices[choice].GoodResultChance / 100
                ? card.Choices[choice].ResourcesAffectedGoodResult
                : card.Choices[choice].ResourcesAffectedBadResult;
            result.forEach(effect => {
                this.setResource(effect.ResourceName.toLowerCase(), this.getResource(effect.ResourceName.toLowerCase()) + effect.ResourceShift);
            });
        }
    }

    // Method to check if the game is lost
    checkIfLost() {
        for (let resource in this.resources) {
            if (this.resources[resource] === 0) {
                this.lost = true;
                return;
            }
        }
        this.lost = false;
    }
}

module.exports = GameState;
