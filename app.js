const yargs = require('yargs');
const geocode = require('./geocode');
const weather = require('./weather');
const getCelsiusFromFahrenheit = require('./utils/getCelsiusFromFahrenheit');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

geocode(argv.address)
  .then(address => {
    console.log(address.formattedAddress);
    return weather(address);
  })
  .then(({ temperature, apparentTemperature }) => {
    console.log(
      `It's currently ${getCelsiusFromFahrenheit(
        temperature
      )}. It feels like ${getCelsiusFromFahrenheit(apparentTemperature)}.`
    );
  })
  .catch(error => console.log(error));
