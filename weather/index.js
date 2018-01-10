const request = require('request');

const DarkSkyURI = 'https://api.darksky.net/forecast';
const DarkSkyApiKey = '23d3622535ea22ff8fbd243875e7aeba';

const weather = ({ lat, lng }) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `${DarkSkyURI}/${DarkSkyApiKey}/${lat},${lng}`,
        json: true
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const { temperature, apparentTemperature } = body.currently;

          resolve({ temperature, apparentTemperature });
        } else {
          reject('Unable to fetch weather.');
        }
      }
    );
  });
};

module.exports = weather;
