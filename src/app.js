const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 80
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join('__dirname', '../templates/views')
const partialsPath = path.join('__dirname', '../templates/partials')
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address || '' || null) {
        return res.send({
            error: 'Please provide an address'
        })    
    } else {
        geocode(req.query.address, (error, {lat, lon}) => {
            if (error) {
                return res.send({error: error})
            } else {
                forecast (lat, lon, (error, forecastData) => {
                    if (error) {
                        return res.send({error: error})
                    } else {
                        res.send({
                            forecast: forecastData
                        })
                    }
                })
            }
        })
    }
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Turan Sultan'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is listening')
})
