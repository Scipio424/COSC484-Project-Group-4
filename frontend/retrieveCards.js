let input = '[' +
'{"CardID": 1,"Name": "test card","Description": "test description","Type": "sea","Difficulty": 1,"Choices":[{"Description": "Choice A","GoodResultChance": 100,"ResourcesAffectedGoodResult":[{"ResourceName": "gold","ResourceShift": 1}],"ResourcesAffectedBadResult":[{"ResourceName": "gold","ResourceShift": 1}]},{"Description": "Choice B","GoodResultChance": 100,"ResourcesAffectedGoodResult":[{"ResourceName": "gold","ResourceShift": 1}],"ResourcesAffectedBadResult":[{"ResourceName": "gold","ResourceShift": 1}]}]},' +
'{"CardID": 2,"Name": "test card","Description": "test description","Type": "sea","Difficulty": 1,"Choices":[{"Description": "Choice A","GoodResultChance": 90,"ResourcesAffectedGoodResult":[{"ResourceName": "gold","ResourceShift": 1},{"ResourceName": "moral","ResourceShift": 2}],"ResourcesAffectedBadResult":[{"ResourceName": "gold","ResourceShift": 1}]},{"Description": "Choice B","GoodResultChance": 100,"ResourcesAffectedGoodResult":[{"ResourceName": "gold","ResourceShift": 1}],"ResourcesAffectedBadResult":[{"ResourceName": "gold","ResourceShift": 1}]}]},' +
'{"CardID": 3,"Name": "test card","Description": "test description","Type": "sea","Difficulty": 1,"Choices":[{"Description": "Choice A","GoodResultChance": 100,"ResourcesAffectedGoodResult":[{"ResourceName": "gold","ResourceShift": 1},{"ResourceName": "provisions","ResourceShift": 1}],"ResourcesAffectedBadResult":[{"ResourceName": "gold","ResourceShift": 1}]},{"Description": "Choice B","GoodResultChance": 100,"ResourcesAffectedGoodResult":[{"ResourceName": "gold","ResourceShift": 1}],"ResourcesAffectedBadResult":[{"ResourceName": "gold","ResourceShift": 1}]}]}]';

const cards = JSON.parse(input);


function getRandomCard(){
        return cards[Math.floor(Math.random() * cards.length)];
    }

function getCardById(cardId){
        cards.forEach((card) => {
                if(card.CardID === cardId){
                    return card;
                }
            }
        );
        return cards[0];
    }

