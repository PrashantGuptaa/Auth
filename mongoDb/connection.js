const mongoose = require('mongoose');

 mongoose.connect(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }).then((conn) => console.info("Connect to Mongo"))
    .catch(err => console.error("error while connecting to mongo", err))


