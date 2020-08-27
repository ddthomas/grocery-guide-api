const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://dbUser:${process.env.DB_PASSWORD}@cluster0.2tet7.mongodb.net/GroceryGuide?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


module.exports = db;