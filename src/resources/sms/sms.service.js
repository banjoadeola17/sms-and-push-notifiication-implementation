import Joi from "@hapi/joi";
import logger from "../../logger.js";
import { userData } from "../datasource";
import type { SmsModel } from "./sms.model";
import { BAD_REQUEST, OK } from "../../modules/util.js";
import { sampleProvider } from "./sample/sample.provider";
import type { SmsProvider } from "./sms.model"
import {smsProvider} from "./sms.provider"


const sendSms = (sms: SmsModel) => {
  const provider: SmsProvider = smsProvider();
  return provider.send(sms);
};

export const sendMessageUponClientRestfulRequest = async ({ params }) => {
  if (!params) {
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "request body is required.",
    });
  }

  const validateSchema = validateNotificationSchema(params);
  if (validateSchema.error) {
    logger.error(
      `Invalid params for sending message ${validateSchema.error.details[0].message}`
    );
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: validateSchema.error.details[0].message,
    });
  }

  try {
    await sendMessageToUsers(params);

    return Promise.resolve({
      statusCode: OK,
      data: "Message successfully sent.",
    });
  } catch (err) {
    logger.error("An error occurred when sending message to users.");
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: err.message,
    });
  }
};

const sendMessageToUsers = async (smsModel: SmsModel) => {
  logger.info(
    `::: sms model received as [${JSON.stringify(smsModel)}]:::`
  );

  smsModel.sender = "swvl";

  let { userIds, allUsers } = smsModel;

  let phoneNumbers;
  if (allUsers) {
    phoneNumbers = mapUsersPhoneNumbers({ userData, userIds });
  }

  let messageTo = "";
  if (phoneNumbers.length > 0) {
    messageTo =
      phoneNumbers.length === 1 ? phoneNumbers[0] : "List of phone numbers";
  }

  transcribeToPreferredLanguage(smsModel.message);

  // messages are meant to be sent in batches
  // 2 was chosen as limit for sms provider for test
  for (let i = 0; i < smsModel.userIds.length; i = i + 2) {
    messageTo = phoneNumbers.slice(i, i + 2);
    logger.info(
      `The phone numbers to be sent to provider for SMS message: ${JSON.stringify(
        messageTo
      )}`
    );
    await sendSms(messageTo);
  }
  return;
};

const mapUsersPhoneNumbers = ({ userData, userIds }) => {
  let phoneNumbers = [];
  userData.forEach((user) => {
    if (userIds.includes(user.userId)) {
      phoneNumbers.push(user.phoneNumber);
    }
  });
  return phoneNumbers;
};

const transcribeToPreferredLanguage = ({ message }) => {
  //  A tanspiler would be implemented to trnsform the recieved input message to users preferred language
  logger.info("Transpiling to preferred language specified by the users.");
};

const validateNotificationSchema = (params) => {
  const schema = Joi.object().keys({
    message: Joi.string().required(),
    userIds: Joi.array().items(Joi.string()),
    allUsers: Joi.boolean().required(),
    userType: Joi.string().required(),
    type: Joi.string().required(),
  });

  return Joi.validate(params, schema);
};
