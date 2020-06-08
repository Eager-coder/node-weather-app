const request = require('request')
const forecast = (lat, lon, callback) => {
    const key = '7b917939960ee80b1c4416c5e0426a58'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect :(', undefined)
        } else {
            const data = response.body
            const temp = Math.floor(data.main.temp -273) + '°C'
            const name = data.name
            callback(undefined, { location: name, temp, weather: data.weather[0].description })
        }
    })
}
module.exports = forecast

