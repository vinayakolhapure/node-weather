const request = require('request');
const fs = require('fs');

const uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const key = fs.readFileSync('./geocode/key.txt');

var geocodeAddress = (address,callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `${uri}${encodedAddress}&key=${key}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to server.')
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        } else if (body.status === 'OK') {//undefined is the return for "errorMessage" in app.js. 1st parameter here is null
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};


module.exports = {
    geocodeAddress
};