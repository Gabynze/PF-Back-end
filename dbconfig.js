const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://gaby:1234@cluster0.6fy18rb.mongodb.net/Agenda?retryWrites=true&w=majority';

const connection = mongoose.connect(dbConfig,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;