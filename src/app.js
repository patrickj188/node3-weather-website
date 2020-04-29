const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast")

const app = express();

///define paths for express config
const publiceDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

///Setup handlebars engine/views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

///setup static dirctory to serve 
app.use(express.static(publiceDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Patrick Johnson'
    })
})

app.get('/about', (reg, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Patrick Johnson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Patrick Johnson',
        helpText: "Here is some help"
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please enter a vaild address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })

        })

    })
})

app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
res.send({
    products: []
})
})



app.get('/help/*', (req, res) => {
    res.render( "help", {
        helpArticle: "Help article not found"
    })

})

app.get('*', (req, res) => {
    res.render("404",{
        notFound: "Page not found",
    })
})


app.listen(3000, () => {
    console.log("listening on 3000")
})



