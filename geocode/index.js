const request = require('request');
const googleMapsUrl =
  'https://maps.googleapis.com/maps/api/geocode/json?address=';

const geocode = address => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `${googleMapsUrl}${encodeURIComponent(address)}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
          reject('Unable to find that address.');
        } else if (body.status === 'OK') {
          const {
            formatted_address: address,
            geometry: { location: { lat, lng } }
          } = body.results[0];

          resolve({ address, lat, lng });
        }
      }
    );
  });
};

module.exports = geocode;
