const axios = require('axios');

const RICK_URL = 'https://rickandmortyapi.com/api/character/1';

const getRickInfo = async () => {
    const rick = await axios.get(RICK_URL);
    return `The character ${rick.data.name} is ${rick.data.status} and is a ${rick.data.species} ${rick.data.gender}`;
};

module.exports = getRickInfo;
