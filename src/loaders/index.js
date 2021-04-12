const ExpressServer = require("./server/expressServer");
const mongooseLoader = require("../loaders/mongoose");
const config = require("../config");
const logger = require("./logger/index");

const startServer = async () => {
  await mongooseLoader();
  logger.info("DB Loaded and connected");

  const server = new ExpressServer();
  logger.info("Express Loaded");

  server.start();
  logger.info(`Server listening on port: ${config.port}`);
};
startServer();

module.exports = startServer;
