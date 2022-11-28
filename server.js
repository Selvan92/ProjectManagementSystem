
// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
// Import express-session
const session = require('express-session');
const helpers = require('./utils/helpers');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const hbs = exphbs.create({helpers});


// Sets up the Express App
const app = express();
let PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
};

app.use(session(sess));

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, "/public/images")));



app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
});