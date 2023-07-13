const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');

//Inicializacion
const app = express();
require('./lib/funciones'); 

//Configuracion
app.set('port', 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({ //con esto se configura el app.engine
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs'); //Para utilizar el app.engine


//Variables globales
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require('./routes'));

app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(app.get('port'), () => {
    console.log("Starting server on port " + app.get('port'));
});