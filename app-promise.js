const axios = require('axios');
const yargs = require('yargs');

const fs = require('fs');

const uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const key = fs.readFileSync('./geocode/key.txt');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for...',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `${uri}${encodedAddress}&key=${key}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status == 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/4a84f1fe53a6baab4ee8800e2de35b01/${lat},${lng}`;

    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemp = response.data.currently.apparentTemperature;
    console.log(`It is currently ${temperature}. It feels like ${apparentTemp}`);
}).catch((e) => {
    if(e.code==='ENOTFOUND') {
        console.log('Unable to connect to API Servers.');
    } else {
        console.log(`Error, ${e.message}`);
    }
});