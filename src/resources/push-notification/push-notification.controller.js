import { sendNotiticationUponClientRestfulRequest } from "./push-notification.service";

export const sendNotification = (req, res) => {
  const params = req.body;

  sendNotiticationUponClientRestfulRequest({ params })
    .then(({ statusCode, data }) => {
      res.send(statusCode, { status: true, data });
    })
    .catch(({ statusCode, message }) => {
      res.send(statusCode, { status: false, message });
    });
};
