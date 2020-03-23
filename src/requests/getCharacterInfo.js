const axios = require('axios');

const RICK_URL = 'https://rickandmortyapi.com/api/character/';

const getCharacterInfo = async characterName => {
    const character = await axios.get(RICK_URL, { params: { name: characterName } });
    if (character.data.results.length > 0) {
        return `The character ${character.data.results[0].name} is ${character.data.results[0].status} and is a ${character.data.results[0].species} ${character.data.results[0].gender}`;
    }
    return 'Sorry, no character with that name was found'
};

module.exports = getCharacterInfo;
