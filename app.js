const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes')
const profileRoute = require('./routes/profile-route')
const passportSetup = require('./config/passport-config');
const keys = require('./config/keys')
const cookieSession = require('cookie-session');
const passport = require('passport');


const app = express();


//set up view engine
app.set('view engine', 'ejs');

//set cookiessession
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

//init passport
app.use(passport.initialize());
app.use(passport.session());

//connect to database
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('MongoDB Connected');
});
//set user for all routes
// app.use((req, res, next) => {

// });

// setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoute);



app.get('/', (req, res) => {
  res.render('home', { user: req.user })
})

//port 
const port = process.env.PORT || 5000;


// server starting port 
app.listen(port, () => console.log(`server started on port ${port}`));

