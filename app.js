const request = require('request');

request({
    url:'https://maps.googleapis.com/maps/api/geocode/json?address=270%20Marin%20Blvd%20Jersey%20City&key=AIzaSyDPW5tS_rfZUN3nCa1q9S92H1BZ0iO0WGM',
    json: true
}, (error,response,body)=>{
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});