const request = require('request')

//geocoding
//add -> lat and long pair -> weather
// using mapbox.com

const geoCode = (address, callback) =>{
   const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?limit=2&access_token=pk.eyJ1IjoiYWJoaWxhc2hhMTMwNyIsImEiOiJja29sajZuZnkwa2xuMm5vNjg4Mzk1YWdvIn0.H_dxOJvBWuK5uMsZ1MxsPA&fuzzyMatch=false'

   request({url: url, json: true}, (error, {body}={}) =>{ 
      if(error){
         //pass to the callback
         callback('Unable to connect to location services!', undefined)
      }
      else if(body.features.length === 0){
         callback('Unable to find location! Try again with different search term', undefined)
      }
      else{
         
         callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
         })
      }
   })

}

module.exports = geoCode
