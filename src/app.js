//to load express. Configure it to serve something.
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() 
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
 res.render('index', {
  title: 'Weather',
  name: 'Abhilasha'
 })
})

app.get('/about', (req, res) =>{
 res.render('about', {
  title: 'About',
  name: 'Abhilasha'
 })
})

app.get('/help', (req, res) =>{
 res.render('help', {
  title: 'Help',
  name: 'Abhilasha'
 })
})

//weather endpoint
app.get('/weather', (req, res)=>{   
 if(!req.query.address){
  return res.send({
   error: 'You must provide an address'
  })
 }
 const {address} = req.query

 geocode(address, (error, {latitude, longitude, location} = {})=>{
  if(error){
   return res.send({
    error: error
   })
  }
  forecast(latitude, longitude, (error, forecast_data) => {
      if(error){
         return res.send({error})
      }
      res.send({
       location: location,
       forecast_data: forecast_data,
       address: address
      })
   })
 })
})

app.get('/help/*', (req, res) =>{
 res.render('404_page',{
  title: '404',
  name: 'Name',
  errorMessage: 'Help article not found'
 })
})

app.get('*', (req, res) =>{
 res.render('404_page',{
  title: '404',
  name: 'Name',
  errorMessage: 'Page not Found'
 })
})

app.listen(port, () => {
 console.log('server is up on port ' + port)
})