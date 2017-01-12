const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
      err ? console.log(err) : '';
    });

    next();
});

// app.use((req, res, next) => res.render('maintanance.hbs'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
      pageTitle: 'Welcome Page',
      welcomeMessage: 'Welcome to my home page.'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'This is a errorMessage'
    })
})

app.listen(port, () => console.log('Server is up in port 3000'));
