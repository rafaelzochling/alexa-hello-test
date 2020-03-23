const axios = require('axios');

const RICK_URL = 'https://rickandmortyapi.com/api/character/';
const MAX_CHARACTER_NUMBER = 493;

const getRandomInfo = async () => {
    const characterId = Math.floor((Math.random() * MAX_CHARACTER_NUMBER) + 1);
    const randomCharacter = await axios.get(`${RICK_URL}${characterId}`);
    if(!randomCharacter.data) 'Sorry, no luck. Try again';
    return `The character ${randomCharacter.data.name} is ${randomCharacter.data.status} and is a ${randomCharacter.data.species} ${randomCharacter.data.gender}`;
};

module.exports = getRandomInfo;
