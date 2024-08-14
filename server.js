const dotenv = require(dotenv).config();
const express = require('express');
const app = express()
const router = express.Router();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const authController = require('./controllers/auth.js');
//const usersController = require('./controller/.users.js');
const comicsController = require('./controllers/comics.js')
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const port = process.env.PORT ? process.env.PORT : 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', () => {
    console.log(`Locked and loading @ ${mongoose.connection.name}.`);
});

mongoose.connection.on('error', () => {
    console.log(`Watch yourself, Mongo it trippin' again`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })
);



app.get('/', (req, res) => {
  if(req.session.user) {
    res.redirect(`/users/${req.session.user._id}/comicss`);
  } else {
    res.render('index.ejs')
  }
});

app.use(passUserToView);
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/comics', comicsController);

app.listen(port, () => {
  console.log(`Express is here for it @ ${port}!`);
});
