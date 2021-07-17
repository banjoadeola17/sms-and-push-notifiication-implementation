import { sendMessage } from "./notification.controller";

const message = ({ server, subBase }) => {
  server.post(`${subBase}/send`, sendMessage);
};

export default message;
