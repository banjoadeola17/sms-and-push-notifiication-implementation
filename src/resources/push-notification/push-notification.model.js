/**
 * defines spec for notification object
 */
export type FcmModel = {
  fcmToken: string,
  data: NotificationData,
  fcmTokens: string[],
  userIds: string[],
  userType: string,
  sender: string,
  allUsers: Boolean
};

type NotificationData = {
  type: string,
  payLoad: PayLoad,
};

type PayLoad = {
  title: string,
  imageUrl: string,
  imageUrls: string,
  message: string,
};

