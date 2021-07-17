/**
 * defines spec for notification object
 */
export type NotificationModel = {
  message: string,
  userIds: string[],
  allUsers: Boolean,
  userType: string,
  sender: string,
  type: string,
};

export const NotificationType = {
  SMS: "SMS",
  PUSH_NOTIFICATION: "PUSH_NOTIFICATION",
};

//  This holds the users data. A database would ideally be implemented.
export const userData = [
  {
    userId: "abc1d",
    phoneNumber: "01067368631",
    name: "adeola banjo",
    preferredLanguage: "arabic",
    userType: "admin"
  },

  {
    userId: "cbrc3d",
    phoneNumber: "01067368632",
    name: "adeola victor",
    preferredLanguage: "swahili",
    userType: "user"
  },

  {
    userId: "cdfc3d",
    phoneNumber: "01067368634",
    name: "banjo victor",
    preferredLanguage: "bantu",
    userType: "admin"
  },

  {
    userId: "cefc3e",
    phoneNumber: "01067368656",
    name: "victor",
    preferredLanguage: "yoruba",
    userType: "admin"
  },
];
