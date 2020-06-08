const request = require('request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZWFnZXItY29kZXIiLCJhIjoiY2thcXl3aG1yMDI4NzJxcWRjNjBkd2xncyJ9.F5uJRRYa3tNaedhUO2_j2Q`
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (response.body.features.lentgh === 0) {
            callback('No such location. Try another search', undefined)
        } else {
            const lat = response.body.features[0].center[1]
            const lon = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            callback(undefined, { lat, lon, location, response })
        }
    })
}
module.exports = geocode