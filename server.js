const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

//Require api routes
const items = require('./routes/api/items');

const app = express(); //Initialize express

app.use(express.json()); //json parser middleware

// DB Config
const db = config.get('mongoURI');

//connect to MongoDB
mongoose
  .connect( db, {
    useNewUrlParser: true, //Url string parser
    useUnifiedTopology: true //Server discovery engine         
  } )
  .then(console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));      


//Use routes
app.use('/api/items', items); //Anything that hits /api/items should respond to items routes


//check for the environment port
const port = process.env.PORT || 5000;

app.listen(port , () => console.log(`Server using port ${port}`));