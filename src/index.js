import logger from "./logger.js";
import dotenv from "dotenv";
import server from "./server.js";

// handle all uncaught errors
process.on("uncaughtException", function (err) {
    logger.error(`uncaught error has been fired with Error: ${err}`);
});

const port = process.env.PORT || 80;
server.listen(port, function () {
    logger.info(`App running @ port ${port}`);
});
