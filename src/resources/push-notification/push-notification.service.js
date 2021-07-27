import Joi from "@hapi/joi";
import logger from "../../logger.js";
import { userData } from "../datasource";
import type { FcmModel } from "./push-notification.model";
import { BAD_REQUEST, OK } from "../../modules/util.js";

export const sendNotiticationUponClientRestfulRequest = async ({ params }) => {
  if (!params) {
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "request body is required.",
    });
  }

  const validateSchema = validateNotificationSchema(params);
  if (validateSchema.error) {
    logger.error(
      `Invalid params for sending notification ${validateSchema.error.details[0].message}`
    );
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: validateSchema.error.details[0].message,
    });
  }

  try {
    await sendNotificationToUsers(params);

    return Promise.resolve({
      statusCode: OK,
      data: "Message successfully sent.",
    });
  } catch (err) {
    logger.error("An error occurred when sending notification to users.");
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: err.message,
    });
  }
};

const sendNotificationToUsers = async (fcmModel: FcmModel) => {
  logger.info(
    `::: notification model received as [${JSON.stringify(fcmModel)}]:::`
  );

  fcmModel.sender = "swvl";

  // load a single image into the image urls list
  if (fcmModel.data.payload.imageUrl) {
    fcmModel.data.payload.imageUrls = [fcmModel.data.payload.imageUrl];
  }

  const imageUrls = fcmModel.data.payload.imageUrls
      ? fcmModel.data.payload.imageUrls.split(",")
      : [];
  fcmModel.data.payload.imageUrls = imageUrls;

  let message = {
    notification: {
      title: fcmModel.data.payload.title,
      body: fcmModel.data.payload.message,
      image: imageUrls.length > 0 ? imageUrls[0] : null,
    },
    data: fcmModel.data,
  };

  if (fcmModel.userIds && fcmModel.userIds.length > 0) {
    let ids = fcmModel.userIds;
    fcmModel.fcmTokens = await mapTokensToUserId({userData, ids});
  }

  if (fcmModel.fcmTokens && fcmModel.fcmTokens.length > 0) {
    message = Object.assign(message, {
      registrationIds: fcmModel.fcmTokens,
    });
  } else {
    message = Object.assign(message, { to: fcmModel.fcmToken });
  }

  transcribeToPreferredLanguage(message);

  logger.info(
      `fcm notification : total fcm token to be sent [${
          fcmModel.fcmTokens ? fcmModel.fcmTokens.length : 0
      }]`
  );

  // fcm are meant to be sent in batches esp if
  // tokens are greater than 1000, we chose 500 though based on bias
  if (fcmModel.fcmTokens && fcmModel.fcmTokens.length > 0) {
    for (let i = 0; i < fcmModel.fcmTokens.length; i = i + 100) {
      message.registrationIds = fcmModel.fcmTokens.slice(i, i + 2);
      await sendNotification(message);
    }
    return;
  }
  sendNotification(message).then(() => {});
};

// // Call this function if message is to be sent as a PUSH_NOTIFICATION
const sendNotification = (message) => {
  logger.info(`push notification messages sent to ${JSON.stringify(message)}`);
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

const mapTokensToUserId = ({userData, ids}) => {
  let fcmTokens = [];
  userData.forEach((user) => {
    if (ids.includes(user.userId)) {
      fcmTokens.push(user.fcmToken);
    }
  });
  return fcmTokens;
}

const validateNotificationSchema = (params) => {
  const schema = Joi.object().keys({
    fcmToken: Joi.string(),
    userIds: Joi.array().items(Joi.string()),
    allUsers: Joi.boolean(),
    sender: Joi.string().required(),
    data: Joi.object().keys({
      type: Joi.string().required(),
      payload: Joi.object()
        .keys({
          title: Joi.string().required(),
          message: Joi.string().required(),
          imageUrl: Joi.string(),
          imageUrls: Joi.string(),
        })
        .required(),
    }).required(),
    userType: Joi.string(),
    fcmTokens: Joi.array().items(Joi.string()),
  });

  return Joi.validate(params, schema);
};
