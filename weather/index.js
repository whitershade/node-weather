const axios = require('axios');

const DarkSkyURI = 'https://api.darksky.net/forecast';
const DarkSkyApiKey = '23d3622535ea22ff8fbd243875e7aeba';

const weather = ({ lat, lng }) => {
  return axios
    .get(`${DarkSkyURI}/${DarkSkyApiKey}/${lat},${lng}`)
    .then(({ data: { currently: { temperature, apparentTemperature } } }) => ({
      temperature,
      apparentTemperature
    }))
    .catch(error => {
      throw new Error('Unable to fetch weather.');
    });
};

module.exports = weather;
