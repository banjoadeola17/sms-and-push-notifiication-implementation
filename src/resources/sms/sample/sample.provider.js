import logger from "../../../logger.js";
import type { SmsProvider } from "../sms.model"

// Call this function if the first rovider is selected for sending sms
export const sendSms = (messageTo) => {
  logger.info(`Sms messages sent to ${JSON.stringify(messageTo)}`);
};

export const sampleProvider: SmsProvider = {
  name: "sample",
  send: sendSms,
};
