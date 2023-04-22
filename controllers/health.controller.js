const Logger = require("bunyan");
const log = new Logger({ name: __filename?.replace(process.cwd(), "") });

const healthCheckController = (req, res) => {
  log.info("Health check");
  res.status(200).send("Welcome! App is running");
};

module.exports = healthCheckController;


