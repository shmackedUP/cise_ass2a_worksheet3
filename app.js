const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://ishyaboi:Rxeyc7rxeyc7@cluster0.h5ub6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use('/api/books', books);

//app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;


//if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/bailey-booksearcher/build'));
//}


app.listen(port, () => console.log(`Server running on port ${port}`));