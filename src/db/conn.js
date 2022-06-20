const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/dynamic')
    .then(() => {
        console.log('DB connected at 27017')
    })
    .catch((e) => {
        console.log('DB not Connected')
    })