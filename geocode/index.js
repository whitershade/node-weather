const request = require('request');
const googleMapsUrl =
  'https://maps.googleapis.com/maps/api/geocode/json?address=';

const geocode = (address, callback) => {
  request(
    {
      url: `${googleMapsUrl}${encodeURIComponent(address)}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address.');
      } else if (body.status === 'OK') {
        const {
          formatted_address: address,
          geometry: { location: { lat, lng } }
        } = body.results[0];

        callback(null, { address, lat, lng });
      }
    }
  );
};

module.exports = geocode;
