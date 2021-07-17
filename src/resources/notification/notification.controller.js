import { sendMessageUponClientRestfulRequest } from "./notification.service";

export const sendMessage = (req, res) => {
  const params = req.body;

  sendMessageUponClientRestfulRequest({ params })
    .then(({ statusCode, data }) => {
      res.send(statusCode, { status: true, data });
    })
    .catch(({ statusCode, message }) => {
      res.send(statusCode, { status: false, message });
    });
};
