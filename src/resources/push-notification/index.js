import { sendNotification } from "./push-notification.controller";

const notification = ({ server, subBase }) => {
  server.post(`${subBase}/send-notification`, sendNotification);
};

export default notification;
