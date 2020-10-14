const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const path = require('path');

//Require api routes
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express(); //Initialize express

app.use(express.json({extended: false})); //json parser middleware

// DB Config
const db = config.get('mongoURI');

//connect to MongoDB
mongoose
  .connect( db, {
    useNewUrlParser: true, //Url string parser
    useUnifiedTopology: true, //Server discovery engine,
    useCreateIndex: true
  } )
  .then(console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));      


//Use routes
app.use('/api/items', items); //Anything that hits /api/items should respond to items routes
app.use('/api/users', users);
app.use('/api/auth', auth);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    });
}

//check for the environment port
const port = process.env.PORT || 5000;

app.listen(port , () => console.log(`Server using port ${port}`));