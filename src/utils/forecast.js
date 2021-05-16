const request = require('request')

//forecast from weatherstack api

const forecast = (lat, long, callback) =>{
 const url = 'http://api.weatherstack.com/current?access_key=989e1da2b4c5f06c9563159d948e1366&query=' + lat +','+ long

 request({url, json: true}, (error, {body}={})=>{
  if(error){
      callback('Unable to connect to weather service :(', undefined)
   }
   else if(body.error){
      callback('Unable to find location', undefined)
   }
   else{
      callback(undefined, body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature + ' degrees outside. It feels like ' + body.current.feelslike + ' degrees out.')
   }
 })
}

module.exports = forecast