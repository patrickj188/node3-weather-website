const request = require('request');

const forecast = ( lat, lon, callback) =>{
    const url = `https://api.darksky.net/forecast/65817c4694c77a7b9d419f879889dc8d/${lat},${lon}?`;
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to location', undefined);
        }else if (body.error){
            callback('Unable to find location', undefined);

        }else{
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees. There is a ${body.currently.precipProbability}% of rain today`)
        }

    })
}


module.exports = forecast;