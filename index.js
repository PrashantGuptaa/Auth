const express = require("express");
const cors = require("cors");
const router = require("./configs/routes");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./mongoDb/connection");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use('/api/v1', router);


const APP_PORT = process.env.APP_PORT || 8322;

app.listen(APP_PORT, () =>
  console.log(`Server is running on port ${APP_PORT}  `)
);
