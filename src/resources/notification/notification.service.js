import Joi from "@hapi/joi";
import logger from "../../logger.js";
import { NotificationType, userData } from "./notification.model";
import type { NotificationModel } from "./notification.model";
import { BAD_REQUEST, OK } from "../../modules/util.js";
import { smsProvider, pushNotificationProvider } from "./notification.provider";

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

const sendMessageToUsers = async (notificationModel: NotificationModel) => {
  logger.info(
    `::: notification model received as [${JSON.stringify(
      notificationModel
    )}]:::`
  );

  notificationModel.sender = "swvl";

  let { userIds, allUsers } = notificationModel;

  let phoneNumbers;
  if (allUsers) {
    phoneNumbers = mapUsersPhoneNumbers({ userData, userIds });
  }

  let messageTo = "";
  if (phoneNumbers.length > 0) {
    messageTo =
      phoneNumbers.length === 1 ? phoneNumbers[0] : "List of phone numbers";
  }

  transcribeToPreferredLanguage(notificationModel.message);

  if (
    notificationModel.type === NotificationType.SMS &&
    notificationModel.userIds.length > 0
  ) {
    // messages are meant to be sent in batches
    // 2 was chosen as limit for sms provider for test
    for (let i = 0; i < notificationModel.userIds.length; i = i + 2) {
      messageTo = phoneNumbers.slice(i, i + 2);
      logger.info(
        `The phone numbers to be sent to provider for SMS message: ${JSON.stringify(
          messageTo
        )}`
      );
      await smsProvider(messageTo);
    }
    return;
  } else if (notificationModel.type === NotificationType.PUSH_NOTIFICATION) {
    // messages are meant to be sent in batches
    // 100 was chosen as limit for push notificaton provider
    for (let i = 0; i < notificationModel.userIds.length; i = i + 100) {
      messageTo = phoneNumbers.slice(i, i + 100);
      logger.info(
        `The phone numbers to be sent to provider for push notification message: ${JSON.stringify(
          messageTo
        )}`
      );
      await pushNotificationProvider(messageTo);
    }
    return;
  }
};

const mapUsersPhoneNumbers = ({ userData, userIds }) => {
  let phoneNumbers = [];
  userData.forEach((user) => {
    if (userIds.includes(user.userId)) {
      phoneNumbers.push(user.phoneNumber);
      // console.log("phoneNumbers", phoneNumbers)
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
