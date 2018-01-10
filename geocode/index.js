const axios = require('axios');
const googleMapsUrl =
  'https://maps.googleapis.com/maps/api/geocode/json?address=';

const geocode = address =>
  axios
    .get(`${googleMapsUrl}${encodeURIComponent(address)}`)
    .then(({ data }) => {
      if (data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
      }

      const {
        formatted_address: formattedAddress,
        geometry: { location: { lat, lng } }
      } = data.results[0];

      return { formattedAddress, lat, lng };
    });

module.exports = geocode;
