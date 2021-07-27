import { sendMessage } from "./sms.controller";

const message = ({ server, subBase }) => {
  server.post(`${subBase}/send-sms`, sendMessage);
};

export default message;
