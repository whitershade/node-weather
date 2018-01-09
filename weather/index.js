const request = require('request');

const DarkSkyURI = 'https://api.darksky.net/forecast';
const DarkSkyApiKey = '23d3622535ea22ff8fbd243875e7aeba';

const weather = ({ lat, lng }, callback) => {
  request(
    {
      url: `${DarkSkyURI}/${DarkSkyApiKey}/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { temperature, apparentTemperature } = body.currently;

        callback(null, { temperature, apparentTemperature });
      } else {
        callback('Unable to fetch weather.');
      }
    }
  );
};

module.exports = weather;
