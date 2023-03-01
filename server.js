const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers =  require('./utils/helpers');
const routes = require('./controllers');
const cloudinary = require('cloudinary').v2;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const handlebars = exphbs.create({ helpers })

const sess = {
    secret: 'Super secret secret',
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7200000,
    },
    resave: false,
    saveUninitialized: true,
  };

app.use(session(sess));

// Configuration for Cloudinary
cloudinary.config({
  cloud_name: "dkhyibthn",
  api_key: "444961672538498",
  api_secret: "8AI7a9_YgHky_LdsdEGxKrTS1IU"
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening to http://localhost:${PORT}`));
  });