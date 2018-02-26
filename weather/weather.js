const request = require('request');

var getWeather = (lat,lng,callback) => {
    request({
        url: `https://api.darksky.net/forecast/4a84f1fe53a6baab4ee8800e2de35b01/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode===200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else  {
            callback('Unable to connect to server.')
        }
    });
};

module.exports = {
    getWeather
};