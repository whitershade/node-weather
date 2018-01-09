const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode');
const weather = require('./weather');

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

geocode(argv.address, (errorMessage, address) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather(address, (errorMessage, weather) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(
          `It's currently ${weather.temperature}. It feels like ${
            weather.apparentTemperature
          }.`
        );
      }
    });
  }
});
