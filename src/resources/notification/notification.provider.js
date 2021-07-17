import logger from "../../logger.js";

// Call this function if message is sent as SMS
export const smsProvider = (messageTo) => {
  logger.info(`Sms messages sent to ${JSON.stringify(messageTo)}`);
};

// Call this function if message is to be sent as a PUSH_NOTIFICATION
export const pushNotificationProvider = (messageTo) => {
  logger.info(`push notification messages sent to ${JSON.stringify(messageTo)}`);
};
