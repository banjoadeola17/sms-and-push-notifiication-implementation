import restify from "restify";
import dotenv from "dotenv";

import message  from "./resources/notification";

const server = restify.createServer({
  name: "swvl-notification",
  version: "1.0.0",
});

dotenv.config();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

message({ server, subBase: "/message" });

export default server;
